(function setupFieldworkMaps() {
  if (!window.L) return;

  const center = [25.0562, 121.5207];
  const areas = [
    {
      name: "中山地区中心部",
      color: "#e95550",
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
      coordinates: [
        [25.0628079, 121.518328], [25.057311, 121.5181778],
        [25.0579525, 121.5227483], [25.0608447, 121.522877],
        [25.0626718, 121.5224478], [25.0628079, 121.518328]
      ]
    },
    {
      name: "繁華街（参考範囲）",
      color: "#a96bc4",
      coordinates: [
        [25.0545857, 121.5254734], [25.0536915, 121.5239928],
        [25.0504646, 121.5232203], [25.0490261, 121.5245936],
        [25.0497453, 121.5266106], [25.0521364, 121.5272115],
        [25.0545857, 121.5254734]
      ]
    }
  ];

  const categoryColors = {
    walking: "#167c70",
    public_space: "#3578b8",
    commerce: "#d45f4c",
    transport: "#6959a8",
    community: "#b47b18",
    environment: "#4d8751",
    other: "#60727a"
  };

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function baseMap(target, interactive = true) {
    const map = L.map(target, {
      scrollWheelZoom: false,
      zoomControl: true,
      dragging: interactive,
      tap: interactive
    }).setView(center, 16);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    areas.forEach((area) => {
      L.polygon(area.coordinates, {
        color: area.color,
        weight: 2,
        fillColor: area.color,
        fillOpacity: 0.16,
        interactive: false
      }).addTo(map);
    });
    L.polyline([
      [25.0526855, 121.5203842],
      [25.0558902, 121.520613],
      [25.0577788, 121.5206671]
    ], { color: "#167c70", weight: 3, opacity: 0.85, dashArray: "8 6", interactive: false }).addTo(map);
    return map;
  }

  const pickerTarget = document.getElementById("uploadLocationMap");
  const observationTarget = document.getElementById("fieldworkObservationMap");
  if (!pickerTarget || !observationTarget) return;

  const pickerMap = baseMap(pickerTarget);
  const observationMap = baseMap(observationTarget);
  const observationLayer = L.layerGroup().addTo(observationMap);
  let selectedMarker;
  let selectedLocation = null;

  function emitLocation() {
    window.dispatchEvent(new CustomEvent("fieldwork-location-change", { detail: selectedLocation }));
  }

  function setSelectedLocation(latitude, longitude, options = {}) {
    const lat = Number(latitude);
    const lng = Number(longitude);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
    selectedLocation = { latitude: lat, longitude: lng };
    if (!selectedMarker) {
      selectedMarker = L.marker([lat, lng], { draggable: true }).addTo(pickerMap);
      selectedMarker.on("dragend", () => {
        const position = selectedMarker.getLatLng();
        selectedLocation = { latitude: position.lat, longitude: position.lng };
        emitLocation();
      });
    } else {
      selectedMarker.setLatLng([lat, lng]);
    }
    if (options.pan !== false) pickerMap.setView([lat, lng], Math.max(pickerMap.getZoom(), 17));
    emitLocation();
  }

  pickerMap.on("click", (event) => setSelectedLocation(event.latlng.lat, event.latlng.lng, { pan: false }));

  function photoIcon(item) {
    const color = categoryColors[item.category] || categoryColors.other;
    if (item.thumbnailUrl) {
      return L.divIcon({
        className: "",
        html: `<span class="fieldwork-photo-marker" style="--marker-color:${color}"><img src="${encodeURI(item.thumbnailUrl)}" alt="" /></span>`,
        iconSize: [46, 46],
        iconAnchor: [23, 46],
        popupAnchor: [0, -42]
      });
    }
    return L.divIcon({
      className: "",
      html: `<span class="fieldwork-file-marker" style="--marker-color:${color}">${escapeHtml(item.groupCode || "•")}</span>`,
      iconSize: [34, 40],
      iconAnchor: [17, 40],
      popupAnchor: [0, -36]
    });
  }

  function setObservations(items) {
    observationLayer.clearLayers();
    (items || []).forEach((item) => {
      if (!Number.isFinite(Number(item.latitude)) || !Number.isFinite(Number(item.longitude))) return;
      const title = item.displayName || item.originalName;
      const preview = item.thumbnailUrl
        ? `<button class="map-popup-preview" type="button" data-map-observation-id="${escapeHtml(item.id)}"><img src="${encodeURI(item.thumbnailUrl)}" alt="${escapeHtml(title)}" /></button>`
        : "";
      const marker = L.marker([Number(item.latitude), Number(item.longitude)], { icon: photoIcon(item) })
        .bindPopup(`${preview}<strong>${escapeHtml(title)}</strong><span>${escapeHtml(item.fieldDate)} · ${escapeHtml(item.groupCode)} · ${escapeHtml(item.studentName)}</span>`);
      marker.addTo(observationLayer);
    });
  }

  observationMap.on("popupopen", (event) => {
    const button = event.popup.getElement()?.querySelector("[data-map-observation-id]");
    if (!button) return;
    button.addEventListener("click", () => {
      window.dispatchEvent(new CustomEvent("fieldwork-preview-request", { detail: { id: button.dataset.mapObservationId } }));
    });
  });

  window.PlanningCommonsFieldworkMap = {
    getSelectedLocation: () => selectedLocation,
    setSelectedLocation,
    setObservations,
    refresh() {
      pickerMap.invalidateSize();
      observationMap.invalidateSize();
    }
  };

  setTimeout(() => window.PlanningCommonsFieldworkMap.refresh(), 100);
})();

