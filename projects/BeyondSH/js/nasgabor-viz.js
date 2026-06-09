/**
 * NASGabor preview — direct slider → uniform mapping (final_validation.py, Z-up).
 */
(function () {
  'use strict';

  const SPHERE_SEGMENTS = 128;
  const MIN_RADIUS = 1.6;
  const MAX_RADIUS = 6.0;
  const DEFAULT_RADIUS = 2.9;

  const vertexShader = `
    varying vec3 vKernelDir;
    void main() {
      vec3 n = normalize(normal);
      vKernelDir = vec3(n.z, -n.x, n.y);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    precision highp float;

    uniform float uMuTheta;
    uniform float uMuPhi;
    uniform float uTau;
    uniform float uA;
    uniform float uLambda;
    uniform float uK;

    varying vec3 vKernelDir;

    const float EPS = 1e-8;
    const float PRODUCT_CLIP = 0.5;

    vec3 polar2cart(float theta, float phi) {
      return vec3(sin(theta) * cos(phi), sin(theta) * sin(phi), cos(theta));
    }

    vec3 cross3(vec3 a, vec3 b) {
      return vec3(
        a.y * b.z - a.z * b.y,
        a.z * b.x - a.x * b.z,
        a.x * b.y - a.y * b.x
      );
    }

    vec3 safeNormalize(vec3 v) {
      float len = length(v);
      return len > 0.0 ? v / len : v;
    }

    void computeBasis(out vec3 mu, out vec3 basisX) {
      mu = polar2cart(uMuTheta, uMuPhi);
      vec3 temp;
      if (abs(mu.z) < 0.999) {
        temp = cross3(vec3(0.0, 0.0, 1.0), mu);
      } else {
        temp = cross3(vec3(1.0, 0.0, 0.0), mu);
      }
      temp = safeNormalize(temp);
      basisX = safeNormalize(cos(uTau) * temp + sin(uTau) * cross3(mu, temp));
    }

    float nasgEnvelope(vec3 v, vec3 mu, vec3 basisX, float a, float lambda) {
      float dotZ = dot(mu, v);
      if (dotZ >= 1.0 - EPS) return 1.0;
      if (dotZ <= -1.0 + EPS) return 0.0;
      float dotX = dot(basisX, v);
      float kBase = (dotZ + 1.0) * 0.5;
      float kExp = EPS + (a * dotX * dotX) / (1.0 - dotZ * dotZ);
      float k0 = pow(kBase, kExp);
      float k1 = pow(kBase, 1.0 + kExp);
      return exp(2.0 * lambda * (k1 - 1.0)) * k0;
    }

    float cosineMod(vec3 v, vec3 basisX, float k) {
      return 0.5 * (1.0 + cos(k * dot(basisX, v)));
    }

    vec3 bluePink(float t) {
      float x = clamp(t, 0.0, 1.0);
      vec3 c0 = vec3(0.039216, 0.113725, 0.435294); // #0a1d6f
      vec3 c1 = vec3(0.121569, 0.352941, 0.647059); // #1f5aa5
      vec3 c2 = vec3(0.298039, 0.556863, 0.858824); // #4c8edb
      vec3 c3 = vec3(0.560784, 0.717647, 0.952941); // #8fb7f3
      vec3 c4 = vec3(0.831373, 0.498039, 0.811765); // #d47fcf
      vec3 c5 = vec3(1.000000, 0.560784, 0.721569); // #ff8fb8
      if (x < 0.2) return mix(c0, c1, x / 0.2);
      if (x < 0.4) return mix(c1, c2, (x - 0.2) / 0.2);
      if (x < 0.6) return mix(c2, c3, (x - 0.4) / 0.2);
      if (x < 0.8) return mix(c3, c4, (x - 0.6) / 0.2);
      return mix(c4, c5, (x - 0.8) / 0.2);
    }

    void main() {
      vec3 v = normalize(vKernelDir);
      vec3 mu;
      vec3 basisX;
      computeBasis(mu, basisX);

      float env = nasgEnvelope(v, mu, basisX, uA, uLambda);
      float cosM = cosineMod(v, basisX, uK);
      float product = env * cosM;

      float strength = clamp(product / PRODUCT_CLIP, 0.0, 1.0);
      gl_FragColor = vec4(bluePink(strength), 1.0);
    }
  `;

  function init() {
    const wrap = document.getElementById('nasgabor-viz');
    const canvas = document.getElementById('nasgabor-canvas');
    const canvasWrap = canvas && canvas.parentElement;
    if (!wrap || !canvas || !canvasWrap || typeof THREE === 'undefined' || typeof THREE.OrbitControls === 'undefined') {
      return;
    }

    const sliders = {
      muTheta: wrap.querySelector('[data-param="mu_theta"]'),
      muPhi: wrap.querySelector('[data-param="mu_phi"]'),
      tau: wrap.querySelector('[data-param="tau"]'),
      k: wrap.querySelector('[data-param="k"]'),
      a: wrap.querySelector('[data-param="a"]'),
      lambda: wrap.querySelector('[data-param="lambda"]')
    };

    const labels = {};
    wrap.querySelectorAll('[data-label]').forEach((el) => {
      labels[el.dataset.label] = el;
    });

    const uniforms = {
      uMuTheta: { value: 0 },
      uMuPhi: { value: 0 },
      uTau: { value: 0 },
      uA: { value: 0 },
      uLambda: { value: 0 },
      uK: { value: 0 }
    };

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeef1f5);

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, DEFAULT_RADIUS);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.rotateSpeed = 0.65;
    controls.minDistance = MIN_RADIUS;
    controls.maxDistance = MAX_RADIUS;
    controls.target.set(0, 0, 0);
    controls.update();

    canvasWrap.setAttribute('tabindex', '0');
    canvasWrap.setAttribute('role', 'application');
    canvasWrap.setAttribute('aria-label', 'Drag to orbit, scroll to zoom');

    const geometry = new THREE.SphereGeometry(1, SPHERE_SEGMENTS, SPHERE_SEGMENTS);
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader
    });
    scene.add(new THREE.Mesh(geometry, material));

    function syncUniforms() {
      uniforms.uMuTheta.value = parseFloat(sliders.muTheta.value);
      uniforms.uMuPhi.value = parseFloat(sliders.muPhi.value);
      uniforms.uTau.value = parseFloat(sliders.tau.value);
      uniforms.uK.value = parseFloat(sliders.k.value);
      uniforms.uA.value = parseFloat(sliders.a.value);
      uniforms.uLambda.value = parseFloat(sliders.lambda.value);
    }

    function updateLabels() {
      labels.mu_theta.textContent = Number(sliders.muTheta.value).toFixed(2);
      labels.mu_phi.textContent = Number(sliders.muPhi.value).toFixed(2);
      labels.tau.textContent = Number(sliders.tau.value).toFixed(2);
      labels.k.textContent = Number(sliders.k.value).toFixed(2);
      labels.a.textContent = Number(sliders.a.value).toFixed(2);
      labels.lambda.textContent = Number(sliders.lambda.value).toFixed(2);
    }

    function resize() {
      const size = Math.max(200, Math.min(canvasWrap.clientWidth, 520));
      renderer.setSize(size, size, false);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    }

    function refresh() {
      updateLabels();
      syncUniforms();
    }

    Object.values(sliders).forEach((el) => {
      el.addEventListener('input', refresh);
    });

    window.addEventListener('resize', resize);
    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(() => resize()).observe(canvasWrap);
    }

    refresh();
    resize();
    requestAnimationFrame(resize);

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  }

  function boot() {
    if (typeof THREE === 'undefined' || typeof THREE.OrbitControls === 'undefined') {
      window.addEventListener('load', boot, { once: true });
      return;
    }
    init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
