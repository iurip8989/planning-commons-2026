(function setupCourseMap() {
  const target = document.getElementById("courseMap");
  if (!target || !window.L) return;

  const areas = [
    {
      name: "中山地区中心部",
      color: "#e95550",
      fillOpacity: 0.28,
      coordinates: [
        [25.0579309, 121.5227244], [25.0572894, 121.5181539],
        [25.0546458, 121.5182182], [25.0532073, 121.5177462],
        [25.0522354, 121.5225312], [25.0550346, 121.5226814],
        [25.0579309, 121.5227244]
      ]
    },
    {
      name: "中山地区北部",
      color: "#f3a428",
      fillOpacity: 0.3,
      coordinates: [
        [25.0628079, 121.518328], [25.057311, 121.5181778],
        [25.0579525, 121.5227483], [25.0608447, 121.522877],
        [25.0626718, 121.5224478], [25.0628079, 121.518328]
      ]
    },
    {
      name: "繁華街（参考範囲）",
      color: "#a96bc4",
      fillOpacity: 0.2,
      coordinates: [
        [25.0545857, 121.5254734], [25.0536915, 121.5239928],
        [25.0504646, 121.5232203], [25.0490261, 121.5245936],
        [25.0497453, 121.5266106], [25.0521364, 121.5272115],
        [25.0545857, 121.5254734]
      ]
    }
  ];

  const places = [
    { code: "中", name: "中山駅", kind: "駅・線形公園南端", lat: 25.0526855, lng: 121.5203842 },
    { code: "雙", name: "雙連駅", kind: "駅・線形公園北端", lat: 25.0577788, lng: 121.5206671 },
    { code: "公", name: "線形公園", kind: "Xinzhongshan Linear Park", lat: 25.0558902, lng: 121.520613 },
    { code: "宮", name: "文昌宮", kind: "地域の信仰・生活拠点", lat: 25.0591875, lng: 121.5210132 },
    { code: "市", name: "雙連朝市", kind: "朝市・生活商業", lat: 25.0584514, lng: 121.5209069 }
  ];

  const map = L.map(target, { scrollWheelZoom: false, zoomControl: true });
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  const areaLayers = {};
  const areaBounds = [];
  areas.forEach((area) => {
    const layer = L.polygon(area.coordinates, {
      color: area.color,
      weight: 2,
      fillColor: area.color,
      fillOpacity: area.fillOpacity
    }).bindPopup(`<strong>${area.name}</strong>授業用KMLから読み込んだ範囲`);
    layer.addTo(map);
    areaLayers[area.name] = layer;
    if (area.name !== "繁華街（参考範囲）") areaBounds.push(...area.coordinates);
  });

  const keyPlaces = L.layerGroup().addTo(map);
  places.forEach((place) => {
    const icon = L.divIcon({
      className: "",
      html: `<span class="course-map-marker">${place.code}</span>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });
    L.marker([place.lat, place.lng], { icon })
      .bindPopup(`<strong>${place.name}</strong>${place.kind}`)
      .addTo(keyPlaces);
  });

  L.polyline([
    [25.0526855, 121.5203842],
    [25.0558902, 121.520613],
    [25.0577788, 121.5206671]
  ], { color: "#167c70", weight: 4, opacity: 0.9, dashArray: "8 6" })
    .bindPopup("中山駅－雙連駅 線形公園軸")
    .addTo(map);

  L.control.layers(null, { ...areaLayers, "重点地点": keyPlaces }, { collapsed: false }).addTo(map);
  map.fitBounds(areaBounds, { padding: [24, 24] });
})();
