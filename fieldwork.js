(function defineCloudflareFieldwork() {
  const MAX_FILES = 5;
  const MAX_IMAGE_SOURCE_BYTES = 50 * 1024 * 1024;
  const MAX_PDF_BYTES = 10 * 1024 * 1024;
  const MAX_VIDEO_BYTES = 20 * 1024 * 1024;
  const IMAGE_TARGET_BYTES = 1.5 * 1024 * 1024;
  const THUMBNAIL_TARGET_BYTES = 240 * 1024;
  const MANAGE_TOKENS_KEY = "planning-commons-manage-tokens-v2";
  const UPLOAD_CODE_KEY = "planning-commons-upload-code";
  const ADMIN_CODE_KEY = "planning-commons-admin-code";
  const HEIC_CONVERTER_URL = "https://cdn.jsdelivr.net/npm/heic-to@1.5.2/dist/iife/heic-to.js";
  let items = [];
  let summaryData = null;
  let summaryError = false;
  let activeSummaryTab = "categories";
  let materialNameFilter = "";
  let loadSequence = 0;
  let editItemId = "";
  let heicConverterPromise;
  let volatileManageTokens = {};

  function readManageTokens() {
    try {
      return { ...(JSON.parse(localStorage.getItem(MANAGE_TOKENS_KEY) || "{}") || {}), ...volatileManageTokens };
    } catch {
      return { ...volatileManageTokens };
    }
  }

  function saveManageToken(id, token) {
    volatileManageTokens[id] = token;
    const tokens = readManageTokens();
    tokens[id] = token;
    try {
      localStorage.setItem(MANAGE_TOKENS_KEY, JSON.stringify(tokens));
    } catch {
      // Keep the token in memory so the uploader can still manage it in this tab.
    }
  }

  function removeManageToken(id) {
    delete volatileManageTokens[id];
    const tokens = readManageTokens();
    delete tokens[id];
    try {
      localStorage.setItem(MANAGE_TOKENS_KEY, JSON.stringify(tokens));
    } catch {
      // The server deletion has already succeeded; local cleanup is best effort.
    }
  }

  function observationKind(item) {
    if ((item.contentType || "").startsWith("image/")) return "image";
    if ((item.contentType || "").startsWith("video/")) return "video";
    if (item.contentType === "application/pdf") return "pdf";
    return "other";
  }

  function categoryLabel(item) {
    if (item.category === "other") return item.otherCategory || t("catOther");
    return t({
      walking: "catWalking",
      public_space: "catPublic",
      commerce: "catCommerce",
      transport: "catTransport",
      community: "catCommunity",
      environment: "catEnvironment"
    }[item.category] || "catOther");
  }

  function formatDate(value) {
    const locale = currentLanguage === "zh-Hant" ? "zh-TW" : currentLanguage;
    return new Date(`${value}T00:00:00`).toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }

  function formatSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function summaryLabel(entry, tab) {
    if (tab === "categories") return categoryLabel(entry);
    if (tab === "dates") return formatDate(entry.fieldDate);
    return entry.name || "-";
  }

  function summaryValue(entry, tab) {
    if (tab === "categories") return entry.category;
    if (tab === "dates") return entry.fieldDate;
    return entry.name || "";
  }

  function summaryFilter(tab) {
    if (tab === "categories") return "category";
    if (tab === "dates") return "date";
    return "name";
  }

  function activeSummaryValue(tab) {
    if (tab === "categories") return document.getElementById("observationCategoryFilter")?.value || "";
    if (tab === "dates") return document.getElementById("observationDateFilter")?.value || "";
    return materialNameFilter;
  }

  function renderSummary() {
    const body = document.getElementById("observationSummaryBody");
    const scope = document.getElementById("observationSummaryScope");
    if (!body || !scope) return;

    document.querySelectorAll("[data-summary-tab]").forEach((button) => {
      const active = button.dataset.summaryTab === activeSummaryTab;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
    });

    if (summaryError) {
      scope.textContent = "";
      body.innerHTML = `<p class="observation-summary-message">${escapeHtml(t("summaryUnavailable"))}</p>`;
      return;
    }
    if (!summaryData) {
      scope.textContent = "";
      body.innerHTML = `<p class="observation-summary-message">${escapeHtml(t("summaryLoading"))}</p>`;
      return;
    }

    const total = Number(summaryData.total || 0);
    scope.textContent = t("summaryScope", {
      total: total.toLocaleString(currentLanguage),
      shown: items.length.toLocaleString(currentLanguage)
    });
    const entries = summaryData[activeSummaryTab] || [];
    if (!entries.length || !total) {
      body.innerHTML = `<p class="observation-summary-message">${escapeHtml(t("summaryEmpty"))}</p>`;
      return;
    }

    const selected = activeSummaryValue(activeSummaryTab);
    const filter = summaryFilter(activeSummaryTab);
    body.innerHTML = entries.map((entry) => {
      const label = summaryLabel(entry, activeSummaryTab);
      const value = summaryValue(entry, activeSummaryTab);
      const count = Number(entry.count || 0);
      const percent = total ? (count / total) * 100 : 0;
      const categoryAttribute = activeSummaryTab === "categories" ? ` data-category="${escapeHtml(entry.category)}"` : "";
      const active = value === selected;
      return `<button class="observation-summary-row${active ? " active" : ""}" type="button" data-summary-filter="${filter}" data-summary-value="${escapeHtml(value)}"${categoryAttribute} title="${escapeHtml(`${label} — ${t("summaryFilterHint")}`)}">
        <span class="observation-summary-row-label">${escapeHtml(label)}</span>
        <span class="observation-summary-bar" aria-hidden="true"><span style="--summary-width:${Math.max(percent, 1).toFixed(1)}%"></span></span>
        <span class="observation-summary-value">${escapeHtml(t("summaryValue", {
          count: count.toLocaleString(currentLanguage),
          percent: percent.toLocaleString(currentLanguage, { maximumFractionDigits: 1 })
        }))}</span>
      </button>`;
    }).join("");
  }

  function renderStats() {
    const target = document.getElementById("observationStats");
    if (!target) return;
    const groups = items.reduce((result, item) => {
      result[item.groupCode] = (result[item.groupCode] || 0) + 1;
      return result;
    }, {});
    const chips = [
      `<span class="observation-stat"><span>${escapeHtml(t("filterSummary"))}</span><strong>${items.length.toLocaleString(currentLanguage)}</strong></span>`,
      ...Object.entries(groups).sort().map(([group, count]) =>
        `<span class="observation-stat"><span>${escapeHtml(t("groupSummary", { group }))}</span><strong>${count.toLocaleString(currentLanguage)}</strong></span>`
      ),
      ...(materialNameFilter ? [`<button class="observation-stat observation-stat-filter" type="button" data-summary-clear-name title="${escapeHtml(t("clearFilters"))}"><span>${escapeHtml(t("summaryNameTab"))}</span><strong>${escapeHtml(materialNameFilter)}</strong><span aria-hidden="true">×</span></button>`] : [])
    ];
    target.innerHTML = chips.join("");
  }

  function renderItems() {
    const grid = document.getElementById("observationGrid");
    if (!grid) return;
    document.getElementById("observationCount").textContent = items.length.toLocaleString(currentLanguage);
    renderStats();
    renderSummary();
    window.PlanningCommonsFieldworkMap?.setObservations(items);

    if (!items.length) {
      grid.innerHTML = `<p class="empty-state">${escapeHtml(t("noUploadedMaterials"))}</p>`;
      return;
    }

    grid.innerHTML = items.map((item) => {
      const kind = observationKind(item);
      const title = item.displayName || item.originalName;
      const owner = Boolean(readManageTokens()[item.id]);
      const adminMode = Boolean(document.getElementById("adminAccessCode")?.value.trim());
      const managementActions = `${owner || adminMode
        ? `<button type="button" data-fieldwork-action="edit" data-id="${escapeHtml(item.id)}">${escapeHtml(t("editDetails"))}</button>`
        : ""}
        <button class="danger" type="button" data-fieldwork-action="delete" data-id="${escapeHtml(item.id)}">${escapeHtml(t(adminMode ? "adminDelete" : owner ? "ownDelete" : "adminDelete"))}</button>`;
      const preview = kind === "image"
        ? `<img src="${encodeURI(item.thumbnailUrl || item.fileUrl)}" alt="${escapeHtml(title)}" loading="lazy" />`
        : `<span class="observation-file-badge">${escapeHtml(t(kind === "video" ? "fileVideo" : kind === "pdf" ? "filePdf" : "fileOther"))}</span>`;
      return `
        <article class="observation-card${item.starred ? " is-starred" : ""}">
          <button class="observation-preview-trigger" type="button" data-fieldwork-action="preview" data-id="${escapeHtml(item.id)}" aria-label="${escapeHtml(`${t("preview")}: ${title}`)}">
            ${preview}
          </button>
          <div class="observation-card-body">
            <div class="observation-card-title-row">
              <h4>${escapeHtml(title)}</h4>
              <button class="observation-icon-button${item.starred ? " active" : ""}" type="button" data-fieldwork-action="star" data-id="${escapeHtml(item.id)}" aria-label="${escapeHtml(t(item.starred ? "unstar" : "star"))}" title="${escapeHtml(t(item.starred ? "unstar" : "star"))}">${item.starred ? "★" : "☆"}</button>
            </div>
            <p class="observation-meta">${escapeHtml(formatDate(item.fieldDate))} · ${escapeHtml(t("groupSummary", { group: item.groupCode }))} · ${escapeHtml(item.studentName || "-")} · ${escapeHtml(categoryLabel(item))}</p>
            ${item.note ? `<p class="observation-note">${escapeHtml(item.note)}</p>` : ""}
            <p class="observation-filename"><span>${escapeHtml(t("originalFileName"))}:</span> ${escapeHtml(item.originalName)} · ${escapeHtml(formatSize(item.sizeBytes))}</p>
            <div class="observation-actions">
              <button type="button" data-fieldwork-action="preview" data-id="${escapeHtml(item.id)}">${escapeHtml(t("preview"))}</button>
              ${managementActions}
            </div>
          </div>
        </article>`;
    }).join("");
  }

  async function parseResponse(response) {
    let result = {};
    try {
      result = await response.json();
    } catch {
      // Cloudflare can reject a request before the function returns JSON.
    }
    if (!response.ok) {
      const error = new Error(result.error || t("uploadError"));
      error.status = response.status;
      throw error;
    }
    return result;
  }

  async function loadItems() {
    const sequence = ++loadSequence;
    const status = document.getElementById("observationLibraryStatus");
    status.textContent = t("loadingMaterials");
    const query = new URLSearchParams();
    const date = document.getElementById("observationDateFilter").value;
    const group = document.getElementById("observationGroupFilter").value;
    const category = document.getElementById("observationCategoryFilter").value;
    if (date) query.set("date", date);
    if (group) query.set("group", group);
    if (category) query.set("category", category);
    if (materialNameFilter) query.set("name", materialNameFilter);

    summaryData = null;
    summaryError = false;
    renderSummary();
    const summaryPromise = (async () => {
      try {
        const response = await fetch(`/api/observations/summary${query.size ? `?${query}` : ""}`, { headers: { Accept: "application/json" } });
        const result = await parseResponse(response);
        if (sequence !== loadSequence) return;
        summaryData = result;
      } catch {
        if (sequence !== loadSequence) return;
        summaryData = null;
        summaryError = true;
      }
      renderSummary();
    })();

    try {
      const response = await fetch(`/api/observations${query.size ? `?${query}` : ""}`, { headers: { Accept: "application/json" } });
      const result = await parseResponse(response);
      if (sequence !== loadSequence) return;
      items = result.items || [];
      observationItems = items;
      status.textContent = "";
      renderItems();
    } catch (error) {
      if (sequence !== loadSequence) return;
      items = [];
      observationItems = items;
      status.textContent = error.status === 500 ? t("apiNotReady") : t("loadMaterialsError");
      renderItems();
    } finally {
      await summaryPromise;
    }
  }

  function openPreview(item) {
    const dialog = document.getElementById("observationPreviewDialog");
    const body = document.getElementById("observationPreviewBody");
    const title = item.displayName || item.originalName;
    document.getElementById("observationPreviewTitle").textContent = title;
    const kind = observationKind(item);
    if (kind === "image") {
      body.innerHTML = `<img src="${encodeURI(item.fileUrl)}" alt="${escapeHtml(title)}" />`;
    } else if (kind === "video") {
      body.innerHTML = `<video src="${encodeURI(item.fileUrl)}" controls playsinline></video>`;
    } else if (kind === "pdf") {
      body.innerHTML = `<iframe src="${encodeURI(item.fileUrl)}" title="${escapeHtml(title)}"></iframe>`;
    } else {
      body.innerHTML = `<a class="source-link" href="${encodeURI(item.fileUrl)}" target="_blank" rel="noreferrer">${escapeHtml(t("open"))}</a>`;
    }
    dialog.showModal();
  }

  function requestHeaders(item, includeUploadCode = false) {
    const headers = { "Content-Type": "application/json" };
    const tokens = readManageTokens();
    const uploadCode = document.getElementById("uploadAccessCode").value.trim();
    const adminCode = document.getElementById("adminAccessCode").value.trim();
    if (tokens[item.id]) headers["X-Manage-Token"] = tokens[item.id];
    if (adminCode) headers["X-Admin-Code"] = adminCode;
    if (includeUploadCode && uploadCode) headers["X-Upload-Code"] = uploadCode;
    return headers;
  }

  async function updateItem(item, changes, includeUploadCode = false) {
    const response = await fetch(`/api/observations/${encodeURIComponent(item.id)}`, {
      method: "PATCH",
      headers: requestHeaders(item, includeUploadCode),
      body: JSON.stringify(changes)
    });
    return parseResponse(response);
  }

  function updateEditLocationLabel(location) {
    const label = document.getElementById("observationEditLocationText");
    if (!label) return;
    label.textContent = location
      ? t("editLocationSelected", { lat: Number(location.latitude).toFixed(5), lng: Number(location.longitude).toFixed(5) })
      : t("editLocationHint");
  }

  function openEdit(item) {
    const dialog = document.getElementById("observationEditDialog");
    editItemId = item.id;
    document.getElementById("observationEditName").value = item.displayName || item.originalName;
    document.getElementById("observationEditNote").value = item.note || "";
    document.getElementById("observationEditStatus").textContent = "";
    const hasLocation = item.latitude != null && item.longitude != null
      && Number.isFinite(Number(item.latitude)) && Number.isFinite(Number(item.longitude));
    const location = hasLocation ? { latitude: Number(item.latitude), longitude: Number(item.longitude) } : null;
    updateEditLocationLabel(location);
    dialog.showModal();
    setTimeout(() => {
      if (location) window.PlanningCommonsFieldworkMap?.setEditLocation(location.latitude, location.longitude);
      else window.PlanningCommonsFieldworkMap?.clearEditLocation();
      window.PlanningCommonsFieldworkMap?.refresh();
    }, 0);
  }

  function canvasBlob(canvas, quality) {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error(t("imageConversionError"))), "image/jpeg", quality);
    });
  }

  function loadHeicConverter() {
    if (typeof window.HeicTo === "function") return Promise.resolve(window.HeicTo);
    if (!heicConverterPromise) {
      heicConverterPromise = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = HEIC_CONVERTER_URL;
        script.crossOrigin = "anonymous";
        script.onload = () => typeof window.HeicTo === "function"
          ? resolve(window.HeicTo)
          : reject(new Error(t("imageConversionError")));
        script.onerror = () => reject(new Error(t("imageConversionError")));
        document.head.append(script);
      }).catch((error) => {
        heicConverterPromise = undefined;
        throw error;
      });
    }
    return heicConverterPromise;
  }

  async function convertHeic(file) {
    const convert = await loadHeicConverter();
    const result = await convert({ blob: file, type: "image/jpeg", quality: 0.88 });
    if (!(result instanceof Blob) || !result.size) throw new Error(t("imageConversionError"));
    return result;
  }

  async function decodeImage(file) {
    let source = file;
    const heic = /\.(heic|heif)$/i.test(file.name) || /image\/hei[cf]/i.test(file.type);
    if (heic) {
      source = await convertHeic(file);
    }

    try {
      const bitmap = await createImageBitmap(source, { imageOrientation: "from-image" });
      return { image: bitmap, width: bitmap.width, height: bitmap.height, close: () => bitmap.close?.() };
    } catch {
      const url = URL.createObjectURL(source);
      const image = new Image();
      image.decoding = "async";
      image.src = url;
      try {
        await image.decode();
        return { image, width: image.naturalWidth, height: image.naturalHeight, close: () => URL.revokeObjectURL(url) };
      } catch {
        URL.revokeObjectURL(url);
        throw new Error(t("imageConversionError"));
      }
    }
  }

  async function encodeImage(decoded, maxDimension, targetBytes, initialQuality) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) throw new Error(t("imageConversionError"));
    let scale = Math.min(1, maxDimension / Math.max(decoded.width, decoded.height));
    let quality = initialQuality;
    let blob;
    for (let attempt = 0; attempt < 8; attempt += 1) {
      canvas.width = Math.max(1, Math.round(decoded.width * scale));
      canvas.height = Math.max(1, Math.round(decoded.height * scale));
      context.fillStyle = "#fff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(decoded.image, 0, 0, canvas.width, canvas.height);
      blob = await canvasBlob(canvas, quality);
      if (blob.size <= targetBytes) break;
      quality = Math.max(0.58, quality - 0.07);
      if (attempt > 3) scale *= 0.86;
    }
    if (!blob) throw new Error(t("imageConversionError"));
    return blob;
  }

  function isImage(file) {
    return (file.type || "").startsWith("image/") || /\.(heic|heif|jpe?g|png|webp|gif)$/i.test(file.name);
  }

  async function prepareFile(file) {
    if (isImage(file)) {
      if (file.size > MAX_IMAGE_SOURCE_BYTES) throw new Error(t("fileTooLarge"));
      const heic = /\.(heic|heif)$/i.test(file.name) || /image\/hei[cf]/i.test(file.type);
      const declaredType = String(file.type || "").toLowerCase();
      const inferredType = ["image/jpg", "image/pjpeg"].includes(declaredType) ? "image/jpeg" : declaredType || (/\.jpe?g$/i.test(file.name)
        ? "image/jpeg"
        : /\.png$/i.test(file.name)
          ? "image/png"
          : /\.webp$/i.test(file.name)
            ? "image/webp"
            : "");
      const directlyUploadable = ["image/jpeg", "image/png", "image/webp"].includes(inferredType);
      const uploadableSource = directlyUploadable && file.type !== inferredType
        ? new File([file], file.name, { type: inferredType, lastModified: file.lastModified })
        : file;
      if (!heic && directlyUploadable && file.size <= THUMBNAIL_TARGET_BYTES) {
        const thumbnail = inferredType === "image/jpeg"
          ? new File([uploadableSource], `${file.name.replace(/\.[^.]+$/, "") || "fieldwork-photo"}-thumbnail.jpg`, { type: "image/jpeg" })
          : null;
        return { file: uploadableSource, thumbnail, originalName: file.name };
      }
      let convertedHeic = null;
      let decoded;
      try {
        if (heic) convertedHeic = await convertHeic(file);
        const decodeSource = convertedHeic || uploadableSource;
        decoded = await decodeImage(decodeSource);

        let mainBlob;
        if (convertedHeic || file.size > IMAGE_TARGET_BYTES) {
          mainBlob = await encodeImage(decoded, 1920, IMAGE_TARGET_BYTES, 0.86);
        } else {
          mainBlob = uploadableSource;
        }

        let thumbnailBlob = null;
        try {
          if (inferredType === "image/jpeg" && file.size <= THUMBNAIL_TARGET_BYTES) {
            thumbnailBlob = uploadableSource;
          } else {
            thumbnailBlob = await encodeImage(decoded, 480, THUMBNAIL_TARGET_BYTES, 0.78);
          }
        } catch {
          // A thumbnail is optional; the original remains available in the library.
        }
        const baseName = file.name.replace(/\.[^.]+$/, "") || "fieldwork-photo";
        const reencoded = mainBlob !== uploadableSource;
        const outputName = reencoded ? `${baseName}.jpg` : file.name;
        const outputType = reencoded ? "image/jpeg" : inferredType;
        return {
          file: new File([mainBlob], outputName, { type: outputType, lastModified: file.lastModified }),
          thumbnail: thumbnailBlob ? new File([thumbnailBlob], `${baseName}-thumbnail.jpg`, { type: "image/jpeg" }) : null,
          originalName: file.name
        };
      } catch (error) {
        if (!heic && directlyUploadable && file.size <= 20 * 1024 * 1024) {
          return { file: uploadableSource, thumbnail: null, originalName: file.name };
        }
        throw error;
      } finally {
        decoded?.close();
      }
    }

    const lowerName = file.name.toLowerCase();
    if (file.type === "application/pdf" || lowerName.endsWith(".pdf")) {
      if (file.size > MAX_PDF_BYTES) throw new Error(t("fileTooLarge"));
      return { file: new File([file], file.name, { type: "application/pdf", lastModified: file.lastModified }), thumbnail: null, originalName: file.name };
    }
    if (["video/mp4", "video/quicktime"].includes(file.type) || /\.(mp4|mov)$/i.test(file.name)) {
      if (file.size > MAX_VIDEO_BYTES) throw new Error(t("fileTooLarge"));
      const type = file.type || (lowerName.endsWith(".mov") ? "video/quicktime" : "video/mp4");
      return { file: new File([file], file.name, { type, lastModified: file.lastModified }), thumbnail: null, originalName: file.name };
    }
    throw new Error(t("unsupportedFile"));
  }

  function updateLocationFields(location) {
    const latitude = document.getElementById("observationLatitude");
    const longitude = document.getElementById("observationLongitude");
    const label = document.getElementById("selectedLocationText");
    if (!location) {
      latitude.value = "";
      longitude.value = "";
      label.textContent = t("locationHint");
      return;
    }
    latitude.value = location.latitude.toFixed(7);
    longitude.value = location.longitude.toFixed(7);
    label.textContent = t("locationSelected", { lat: location.latitude.toFixed(5), lng: location.longitude.toFixed(5) });
  }

  window.setupCloudflareFieldwork = function setupCloudflareFieldwork() {
    const form = document.getElementById("fieldworkForm");
    if (!form) return;
    const category = document.getElementById("observationCategory");
    const otherField = document.getElementById("otherCategoryField");
    const otherInput = document.getElementById("otherCategory");
    const filesInput = document.getElementById("fieldworkFiles");
    const selectedFiles = document.getElementById("selectedFiles");
    const submit = document.getElementById("fieldworkSubmit");
    const status = document.getElementById("fieldworkStatus");
    const progress = document.getElementById("uploadProgressBar");
    const uploadCodeInput = document.getElementById("uploadAccessCode");
    const adminCodeInput = document.getElementById("adminAccessCode");
    const studentNameInput = document.getElementById("studentName");
    const library = document.getElementById("observationGrid");
    const summary = document.getElementById("observationSummary");
    const stats = document.getElementById("observationStats");
    const previewDialog = document.getElementById("observationPreviewDialog");
    const editDialog = document.getElementById("observationEditDialog");
    const editForm = document.getElementById("observationEditForm");
    const editSave = document.getElementById("observationEditSave");

    document.getElementById("fieldDate").value = new Date().toISOString().slice(0, 10);
    try { uploadCodeInput.value = sessionStorage.getItem(UPLOAD_CODE_KEY) || ""; } catch { uploadCodeInput.value = ""; }
    try { adminCodeInput.value = sessionStorage.getItem(ADMIN_CODE_KEY) || ""; } catch { adminCodeInput.value = ""; }
    try { studentNameInput.value = localStorage.getItem("planning-commons-student-name") || ""; } catch { studentNameInput.value = ""; }

    uploadCodeInput.addEventListener("input", () => {
      try { sessionStorage.setItem(UPLOAD_CODE_KEY, uploadCodeInput.value); } catch {}
    });
    adminCodeInput.addEventListener("input", () => {
      try { sessionStorage.setItem(ADMIN_CODE_KEY, adminCodeInput.value); } catch {}
      renderItems();
    });
    studentNameInput.addEventListener("change", () => {
      try { localStorage.setItem("planning-commons-student-name", studentNameInput.value.trim()); } catch {}
    });

    category.addEventListener("change", () => {
      const other = category.value === "other";
      otherField.hidden = !other;
      otherInput.required = other;
      if (!other) otherInput.value = "";
    });

    filesInput.addEventListener("change", () => {
      const files = [...(filesInput.files || [])];
      const total = files.reduce((sum, file) => sum + file.size, 0);
      selectedFiles.textContent = files.length ? t("selectedFiles", { count: files.length, size: formatSize(total) }) : t("fileHint");
    });

    window.addEventListener("fieldwork-location-change", (event) => updateLocationFields(event.detail));
    window.addEventListener("fieldwork-edit-location-change", (event) => updateEditLocationLabel(event.detail));
    document.getElementById("useCurrentLocation").addEventListener("click", () => {
      if (!navigator.geolocation) {
        status.textContent = t("geolocationError");
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => window.PlanningCommonsFieldworkMap?.setSelectedLocation(position.coords.latitude, position.coords.longitude),
        () => { status.textContent = t("geolocationError"); },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
      );
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const files = [...(filesInput.files || [])];
      if (!uploadCodeInput.value.trim()) {
        status.textContent = t("uploadCodeRequired");
        uploadCodeInput.focus();
        return;
      }
      if (!window.PlanningCommonsFieldworkMap?.getSelectedLocation()) {
        status.textContent = t("locationRequired");
        document.getElementById("uploadLocationMap").scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      if (!files.length) return;
      if (files.length > MAX_FILES) {
        status.textContent = t("tooManyFiles");
        return;
      }

      submit.disabled = true;
      progress.style.width = "0%";
      let saved = 0;
      try {
        for (const [index, sourceFile] of files.entries()) {
          status.textContent = isImage(sourceFile) ? t("processingImage") : t("uploadProgress", { current: index + 1, total: files.length });
          const prepared = await prepareFile(sourceFile);
          status.textContent = t("uploadProgress", { current: index + 1, total: files.length });
          const payload = new FormData();
          payload.set("studentName", studentNameInput.value.trim());
          payload.set("fieldDate", document.getElementById("fieldDate").value);
          payload.set("studentGroup", document.getElementById("studentGroup").value);
          payload.set("observationCategory", category.value);
          payload.set("otherCategory", otherInput.value.trim());
          payload.set("note", document.getElementById("observationNote").value.trim());
          payload.set("latitude", document.getElementById("observationLatitude").value);
          payload.set("longitude", document.getElementById("observationLongitude").value);
          const requestedName = document.getElementById("observationName").value.trim();
          payload.set("displayName", requestedName && files.length > 1 ? `${requestedName} ${index + 1}` : requestedName);
          payload.set("originalName", prepared.originalName);
          payload.set("file", prepared.file, prepared.file.name);
          if (prepared.thumbnail) payload.set("thumbnail", prepared.thumbnail, prepared.thumbnail.name);

          const response = await fetch("/api/observations", {
            method: "POST",
            headers: { "X-Upload-Code": uploadCodeInput.value.trim() },
            body: payload
          });
          const result = await parseResponse(response);
          if (result.item?.id && result.manageToken) saveManageToken(result.item.id, result.manageToken);
          saved += 1;
          progress.style.width = `${Math.round((saved / files.length) * 100)}%`;
        }
        status.textContent = t("uploadSuccess", { count: saved });
        filesInput.value = "";
        document.getElementById("observationName").value = "";
        selectedFiles.textContent = t("fileHint");
        await loadItems();
      } catch (error) {
        status.textContent = error instanceof Error ? error.message : t("uploadError");
      } finally {
        submit.disabled = false;
      }
    });

    [document.getElementById("observationDateFilter"), document.getElementById("observationGroupFilter"), document.getElementById("observationCategoryFilter")]
      .forEach((control) => control.addEventListener("change", loadItems));

    document.getElementById("observationFiltersClear").addEventListener("click", () => {
      document.getElementById("observationDateFilter").value = "";
      document.getElementById("observationGroupFilter").value = "";
      document.getElementById("observationCategoryFilter").value = "";
      materialNameFilter = "";
      loadItems();
    });

    summary?.addEventListener("click", (event) => {
      const tab = event.target.closest("[data-summary-tab]");
      if (tab) {
        activeSummaryTab = tab.dataset.summaryTab;
        renderSummary();
        return;
      }

      const row = event.target.closest("[data-summary-filter]");
      if (!row) return;
      const value = row.dataset.summaryValue || "";
      if (row.dataset.summaryFilter === "category") {
        const control = document.getElementById("observationCategoryFilter");
        control.value = control.value === value ? "" : value;
      } else if (row.dataset.summaryFilter === "date") {
        const control = document.getElementById("observationDateFilter");
        control.value = control.value === value ? "" : value;
      } else if (row.dataset.summaryFilter === "name") {
        materialNameFilter = materialNameFilter === value ? "" : value;
      }
      loadItems();
    });

    stats?.addEventListener("click", (event) => {
      if (!event.target.closest("[data-summary-clear-name]")) return;
      materialNameFilter = "";
      loadItems();
    });

    library.addEventListener("click", async (event) => {
      const button = event.target.closest("[data-fieldwork-action]");
      if (!button) return;
      const item = items.find((entry) => entry.id === button.dataset.id);
      if (!item) return;
      const action = button.dataset.fieldworkAction;
      if (action === "preview") {
        openPreview(item);
        return;
      }
      try {
        if (action === "edit") {
          openEdit(item);
          return;
        } else if (action === "star") {
          if (!uploadCodeInput.value.trim()) throw new Error(t("uploadCodeRequired"));
          await updateItem(item, { starred: !item.starred }, true);
        } else if (action === "delete") {
          const owner = Boolean(readManageTokens()[item.id]);
          const adminCode = adminCodeInput.value.trim();
          if (!owner && !adminCode) {
            document.getElementById("observationLibraryStatus").textContent = t("adminCodeRequired");
            adminCodeInput.focus();
            adminCodeInput.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
          }
          if (!window.confirm(t("deleteConfirm"))) return;
          const response = await fetch(`/api/observations/${encodeURIComponent(item.id)}`, {
            method: "DELETE",
            headers: requestHeaders(item)
          });
          await parseResponse(response);
          removeManageToken(item.id);
        }
        await loadItems();
      } catch (error) {
        document.getElementById("observationLibraryStatus").textContent = error.status === 403 ? t("managePermissionError") : (error.message || t("updateError"));
      }
    });

    editForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const item = items.find((entry) => entry.id === editItemId);
      const name = document.getElementById("observationEditName").value.trim();
      const note = document.getElementById("observationEditNote").value;
      const location = window.PlanningCommonsFieldworkMap?.getEditLocation();
      const editStatus = document.getElementById("observationEditStatus");
      if (!item) {
        editStatus.textContent = t("updateError");
        return;
      }
      if (!name) {
        document.getElementById("observationEditName").focus();
        return;
      }
      if (!location) {
        editStatus.textContent = t("locationRequired");
        return;
      }

      editSave.disabled = true;
      editStatus.textContent = t("editSaving");
      try {
        const previousName = item.displayName || item.originalName;
        await updateItem(item, {
          displayName: name,
          note,
          latitude: location.latitude,
          longitude: location.longitude
        });
        if (materialNameFilter === previousName) materialNameFilter = name;
        await loadItems();
        editDialog.close();
        document.getElementById("observationLibraryStatus").textContent = t("editSuccess");
      } catch (error) {
        editStatus.textContent = error.status === 403 ? t("managePermissionError") : (error.message || t("updateError"));
      } finally {
        editSave.disabled = false;
      }
    });

    window.addEventListener("fieldwork-preview-request", (event) => {
      const item = items.find((entry) => entry.id === event.detail?.id);
      if (item) openPreview(item);
    });

    document.getElementById("observationPreviewClose").addEventListener("click", () => previewDialog.close());
    previewDialog.addEventListener("click", (event) => { if (event.target === previewDialog) previewDialog.close(); });
    previewDialog.addEventListener("close", () => { document.getElementById("observationPreviewBody").innerHTML = ""; });
    document.getElementById("observationEditClose").addEventListener("click", () => editDialog.close());
    document.getElementById("observationEditCancel").addEventListener("click", () => editDialog.close());
    editDialog.addEventListener("click", (event) => { if (event.target === editDialog) editDialog.close(); });
    editDialog.addEventListener("close", () => {
      editItemId = "";
      document.getElementById("observationEditStatus").textContent = "";
    });

    document.getElementById("siteLanguage").addEventListener("change", () => {
      setTimeout(() => {
        renderItems();
        renderSummary();
        updateLocationFields(window.PlanningCommonsFieldworkMap?.getSelectedLocation());
        updateEditLocationLabel(window.PlanningCommonsFieldworkMap?.getEditLocation());
      }, 0);
    });

    loadItems();
  };
})();
