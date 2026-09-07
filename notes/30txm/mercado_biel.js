// Mercado inmobiliario · Biel / Fuencalderas / Cinco Villas. Recopilado 2026-09-07 a partir de portales (fotocasa, idealista vía fragmentos de buscador,
// green-acres, milanuncios, Fincas Ejea), RealAdvisor y MAPA (precios de la tierra 2024). Precios de oferta, no de cierre. lat/lon ≈ centro del núcleo salvo indicación.
window.MERCADO_DATA = {
  fecha: '2026-09-07',
  anuncios: [
    {id:1, portal:'fotocasa + idealista', url:'https://www.fotocasa.es/es/comprar/vivienda/biel/aire-acondicionado-calefaccion-jardin-terraza-trastero-amueblado-television/158230332/d', nucleo:'Biel', dir:'C/ Barrio Verde 15A', tipo:'Casa de pueblo, 3 plantas', precio:195000, m2:109, solar:75, hab:3, estado:'Reformada integral (2025), amueblada, A/C, terraza 18 m², vistas al castillo. Particular, > 3 meses en venta.', lat:42.3862, lon:-0.9418, visto:'fetched'},
    {id:2, portal:'idealista', url:'https://www.idealista.com/venta-viviendas/biel-fuencalderas-zaragoza/con-casas-de-pueblo/', nucleo:'Biel', dir:'C/ Santa Quiteria 3', tipo:'Casa de pueblo, 3 plantas + patio', precio:104900, m2:175, hab:3, estado:'Reformada, tejado nuevo, amueblada, chimenea, terraza.', lat:42.3850, lon:-0.9432, visto:'snippet'},
    {id:3, portal:'idealista', url:'https://www.idealista.com/venta-viviendas/biel-fuencalderas-zaragoza/con-chalets/', nucleo:'Biel', dir:'C/ Santo Domingo 20', tipo:'Casa / chalet', precio:27000, m2:238, estado:'A reformar (estructura).', lat:42.3858, lon:-0.9438, visto:'snippet'},
    {id:4, portal:'idealista', url:'https://www.idealista.com/en/venta-viviendas/biel-fuencalderas-zaragoza/', nucleo:'Biel', dir:'C/ del Burgo 27', tipo:'Casa de pueblo (medieval)', precio:210000, m2:200, hab:9, estado:'Totalmente rehabilitada.', lat:42.3848, lon:-0.9415, visto:'snippet'},
    {id:5, portal:'Fincas Ejea / milanuncios', url:'https://fincasejea.es/propiedades/casa-o-chalet-en-venta-en-a-1202-biel/', nucleo:'Biel', dir:'Ctra. A-1202', tipo:'Casa + finca', precio:null, m2:460, solar:1851, estado:'Habitable: apartamento independiente, placas solares, fibra, aljibe; más 1.470 m² de rústica con riego por goteo. Página retirada (¿vendida?).', lat:42.3830, lon:-0.9460, visto:'snippet'},
    {id:6, portal:'Fincas Ejea / milanuncios', url:'https://www.milanuncios.com/venta-de-casas-en-biel-zaragoza/', nucleo:'Biel', dir:'', tipo:'Casa', precio:null, m2:80, hab:3, estado:'Habitable, con vistas. Anuncio retirado.', lat:42.3866, lon:-0.9440, visto:'snippet'},
    {id:7, portal:'idealista', url:'https://www.idealista.com/venta-viviendas/biel-fuencalderas-zaragoza/con-chalets-independientes/', nucleo:'Fuencalderas', dir:'', tipo:'Casa independiente + parcela 1.300 m²', precio:null, m2:null, solar:1300, estado:'«Casa de 400 años» sobre 1.300 m². Único anuncio localizado en Fuencalderas.', lat:42.3597, lon:-0.8932, visto:'snippet'}
  ],
  comparables: [
    {nucleo:'Uncastillo', portal:'fotocasa', url:'https://www.fotocasa.es/es/comprar/vivienda/uncastillo/no-amueblado/190250421/d', tipo:'Casa medieval de piedra, 3 plantas', precio:50000, m2:290, hab:9, estado:'A rehabilitar; tejado restaurado', lat:42.3583, lon:-1.1283},
    {nucleo:'Sos del Rey Católico', portal:'fotocasa', url:'https://www.fotocasa.es/en/buy/home/sos-del-rey-catolico/air-conditioning-heating-garden-terrace-box-room-patio-furnished-television-internet/188643032/d', tipo:'Edificio 1900 con restaurante', precio:375000, m2:763, hab:12, estado:'Parcialmente reformado 2008-13', lat:42.495, lon:-1.215},
    {nucleo:'Luna', portal:'fotocasa', url:'https://www.fotocasa.es/es/comprar/vivienda/luna/calefaccion-parking-terraza-trastero-amueblado/161221750/d', tipo:'Piso 3º + local 76 m²', precio:76999, m2:84, hab:3, estado:'Buen estado, amueblado', lat:42.1683, lon:-0.9333},
    {nucleo:'Ayerbe (Fontellas)', portal:'fotocasa', url:'https://www.fotocasa.es/es/comprar/vivienda/ayerbe/calefaccion-terraza-amueblado-television/190359543/d', tipo:'Casa obra nueva 2020, fachada piedra', precio:259000, m2:193, hab:3, estado:'Nueva', lat:42.2783, lon:-0.6883},
    {nucleo:'Murillo de Gállego', portal:'fotocasa', url:'https://www.fotocasa.es/es/comprar/vivienda/murillo-de-gallego/parking-terraza/164493528/d', tipo:'Casa-monumento + finca 3 ha', precio:590900, m2:1000, solar:30000, hab:4, estado:'A restaurar', lat:42.345, lon:-0.7517},
    {nucleo:'Sádaba', portal:'fotocasa', url:'https://www.fotocasa.es/es/comprar/vivienda/sadaba/terraza-amueblado/189326987/d', tipo:'Dos casas unidas por patio, fachada piedra', precio:89900, m2:195, hab:6, estado:'Habitable, semi-amueblada', lat:42.2817, lon:-1.2683},
    {nucleo:'Castiliscar', portal:'green-acres', url:'https://www.green-acres.es/property-for-sale/zaragoza', tipo:'Casa s. XVI', precio:125000, m2:188, solar:72, hab:7, estado:'Reformada integral', lat:42.3667, lon:-1.2717},
    {nucleo:'Luna', portal:'idealista (snippet)', url:'https://www.idealista.com/venta-viviendas/luna-zaragoza/', tipo:'Casa 2 plantas', precio:8700, m2:64, hab:3, estado:'Rehabilitación completa necesaria (136 €/m²)', lat:42.1683, lon:-0.9333},
    {nucleo:'Castiliscar', portal:'agregado', url:'https://casasenventaypisosalquiler.es/casas-en-venta/castiliscar', tipo:'Media de anuncios', precio:60000, m2:141, estado:'Mixto', lat:42.3667, lon:-1.2717},
    {nucleo:'Orés', portal:'idealista (snippet)', url:'https://www.idealista.com/venta-viviendas/ores-zaragoza/', tipo:'Casa', precio:54000, m2:null, estado:'', lat:42.2717, lon:-1.0033},
    {nucleo:'El Frago', portal:'idealista (snippet)', url:'https://www.idealista.com/venta-viviendas/el-frago-zaragoza/con-casas-de-pueblo/', tipo:'Casa rústica (2 anuncios desde 85.000 €)', precio:157500, m2:null, estado:'', lat:42.28, lon:-0.91},
    {nucleo:'Murillo de Gállego', portal:'idealista (snippet)', url:'https://www.idealista.com/en/venta-viviendas/murillo-de-gallego-zaragoza/', tipo:'Villa, vistas a los Mallos', precio:250000, m2:null, estado:'Buen estado', lat:42.345, lon:-0.7517},
    {nucleo:'Uncastillo / Layana', portal:'idealista (snippet)', url:'https://www.idealista.com/venta-terrenos/uncastillo-zaragoza/con-terrenos-no-urbanizables/', tipo:'8 parcelas rústicas', precio:1500, m2:null, estado:'1.500–10.000 € por parcela; terrenos en Uncastillo desde 1.250 €', lat:42.3583, lon:-1.1283},
    {nucleo:'Luna', portal:'idealista (snippet)', url:'https://www.idealista.com/en/venta-terrenos/luna-zaragoza/', tipo:'7 terrenos desde 14.500 € (uno de 14.750 m²)', precio:14500, m2:null, estado:'', lat:42.1683, lon:-0.9333}
  ],
  indices: [
    {mun:'Ejea de los Caballeros', casas:642, pisos:1082, mediana:126474, var12:'+9,2 %', url:'https://realadvisor.es/es/precios-viviendas/municipio-ejea-de-los-caballeros'},
    {mun:'Tauste', casas:736, pisos:1286, mediana:145789, var12:'+8,7 %', url:'https://realadvisor.es/es/precios-viviendas/municipio-tauste'},
    {mun:'Sádaba', casas:574, pisos:961, mediana:null, var12:'+10,7 %', url:'https://realadvisor.es/es/precios-viviendas/municipio-sadaba'},
    {mun:'Luesia', casas:520, pisos:981, mediana:103973, var12:'+8,8 %', url:'https://realadvisor.es/es/precios-viviendas/municipio-luesia'},
    {mun:'Uncastillo', casas:373, pisos:471, mediana:166853, var12:'+11,4 %', url:'https://realadvisor.es/es/precios-viviendas/municipio-uncastillo'},
    {mun:'Ayerbe', casas:379, pisos:791, mediana:141478, var12:'+7,6 %', url:'https://realadvisor.es/es/precios-viviendas/municipio-ayerbe'},
    {mun:'Sos del Rey Católico (8/2025)', casas:934, pisos:null, mediana:null, var12:'−1,7 %', url:'https://realadvisor.es/es/precios-viviendas/municipio-sos-del-rey-catolico'},
    {mun:'Biel-Fuencalderas (idealista, n≈5)', casas:1650, pisos:null, mediana:217448, var12:'', url:'https://www.idealista.com/venta-viviendas/biel-fuencalderas-zaragoza/'}
  ],
  tierra: {fuente:'MAPA · Precios medios anuales de las tierras de uso agrario, resultados 2024 (publ. feb. 2026); Cocampo/Arquitasa para Cinco Villas', url:'https://www.mapa.gob.es/es/estadistica/temas/estadisticas-agrarias/economia/precios-medios-anuales-tierras-uso-agrario/', filas:[
    ['Aragón · todos los usos', '5.175 €/ha (+3,4 %)'], ['Aragón · secano', '4.922 €/ha'], ['Aragón · regadío', '11.104 €/ha'], ['Zaragoza · pasto secano', '2.250 €/ha'], ['Zaragoza · olivar / almendro / viñedo', '3.000 / 3.500 / 4.500 €/ha'], ['Huesca · pasto secano', '5.300 €/ha'], ['Cinco Villas llano · cereal secano (Ejea, Tauste, Sádaba)', '4.000–7.000 €/ha']
  ]},
  bandas: {
    // €/m² construido (oferta) por estado; factor por núcleo
    estado: {ruina:[80,180], reforma:[200,350], habitable:[380,550], reformada:[600,1100], premium:[1300,1800]},
    estadoNombre: {ruina:'Ruina / sólo estructura', reforma:'Reforma integral (tejado y estructura sanos)', habitable:'Habitable, anticuada', reformada:'Reformada, lista para entrar', premium:'Reforma premium con terraza/jardín/vistas u obra nueva'},
    nucleo: {Biel:[1,1], Fuencalderas:[0.7,0.85], 'Cinco Villas (otro pueblo)':[0.85,1.0]},
    solar: {Biel:[30,60], Fuencalderas:[15,40], 'Cinco Villas (otro pueblo)':[20,50]},   // €/m²
    rustico: {labor:[2500,4500], pasto:[1500,2500], monte:[800,2000], huerto:[10000,30000]}, // €/ha (Prepirineo)
    rusticoNombre: {labor:'Labor secano (cereal, bancales)', pasto:'Pasto / erial', monte:'Monte (pinar, carrascal)', huerto:'Huerto con agua junto al pueblo'},
    cierre:[0.8,0.9]
  }
};
