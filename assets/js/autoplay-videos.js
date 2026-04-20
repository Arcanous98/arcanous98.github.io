(function () {
  function init() {
    var videos = document.querySelectorAll('video.autoplay-on-scroll');
    if (!videos.length) return;

    if (!('IntersectionObserver' in window)) {
      videos.forEach(function (v) {
        v.muted = true;
        var p = v.play();
        if (p && typeof p.catch === 'function') p.catch(function () {});
      });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var v = entry.target;
        if (entry.isIntersecting) {
          v.muted = true;
          var p = v.play();
          if (p && typeof p.catch === 'function') p.catch(function () {});
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.25 });

    videos.forEach(function (v) {
      v.setAttribute('muted', '');
      v.muted = true;
      io.observe(v);
      v.addEventListener('click', function () {
        if (v.paused) {
          v.play();
        } else {
          v.pause();
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
