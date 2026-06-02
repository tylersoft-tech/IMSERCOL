(function () {
  const root = document.documentElement;
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navMenu = document.querySelector("[data-nav-menu]");
  const siteHeader = document.querySelector(".site-header");
  const mobileQuery = window.matchMedia("(max-width: 1040px)");
  const backTop = document.querySelector("[data-back-top]");
  const quoteForm = document.querySelector("[data-quote-form]");
  const galleryGrid = document.querySelector("[data-gallery-grid]");
  const galleryFilters = document.querySelectorAll("[data-gallery-filter]");
  const serviceSelect = document.querySelector("[data-service-select]");
  const navOpenLabel = navToggle ? navToggle.getAttribute("aria-label") || "Abrir menu" : "Abrir menu";
  const navCloseLabel = navOpenLabel.toLowerCase().includes("open") ? "Close menu" : "Cerrar menu";

  function setScrolledState() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
    if (backTop) backTop.classList.toggle("is-visible", window.scrollY > 420);
  }

  function setMegaOpen(isOpen) {
    if (!siteHeader) return;
    const shouldOpen = Boolean(isOpen && !mobileQuery.matches);
    siteHeader.classList.toggle("mega-open", shouldOpen);

    const mega = siteHeader.querySelector(".mega-panel");
    if (mega) mega.setAttribute("aria-hidden", String(!shouldOpen));

    siteHeader.querySelectorAll("[data-mega-trigger]").forEach((trigger) => {
      trigger.setAttribute("aria-expanded", String(shouldOpen));
    });
  }

  function setMenuOpen(isOpen) {
    if (!navMenu || !navToggle) return;
    navMenu.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? navCloseLabel : navOpenLabel);
    root.classList.toggle("nav-open", isOpen);
    if (isOpen) setMegaOpen(false);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  function getBasePath() {
    const path = window.location.pathname;
    return path.includes("/legal/") || path.includes("/en/") ? "../" : "";
  }

  function enhanceNavigation() {
    if (!siteHeader || !navMenu || navMenu.dataset.enhanced === "true") return;
    navMenu.dataset.enhanced = "true";
    const base = getBasePath();
    const mega = document.createElement("div");
    mega.className = "mega-panel";
    mega.id = "site-mega-menu";
    mega.setAttribute("role", "navigation");
    mega.setAttribute("aria-label", "Menu tecnico ampliado");
    mega.setAttribute("aria-hidden", "true");
    mega.innerHTML = `
      <div class="container mega-panel__inner">
        <div class="mega-panel__intro">
          <span class="eyebrow">Navegacion tecnica</span>
          <h3>Centro tecnico IMSERCOL</h3>
          <p>Accesos directos para responsables de integridad, mantenimiento, compras tecnicas y HSEQ.</p>
          <div class="mega-kpis" aria-label="Credenciales principales">
            <span><strong>23-OIN-020</strong>ONAC</span>
            <span><strong>ISO/IEC</strong>17020:2012</span>
          </div>
          <a class="btn btn-primary" href="${base}contacto.html">Enviar requerimiento</a>
        </div>
        <div class="mega-panel__decision">
          <h4>Que necesitas hacer?</h4>
          <a href="${base}alcance-acreditado.html"><strong>Validar alcance ONAC</strong><span>Revisa actividades, metodos y documentos visibles del certificado.</span></a>
          <a href="${base}contacto.html"><strong>Cotizar una inspeccion</strong><span>Envia activo, ubicacion, metodo esperado y fecha tentativa.</span></a>
          <a href="${base}servicios.html"><strong>Comparar servicios</strong><span>Diferencia alcance acreditado y servicios complementarios.</span></a>
        </div>
        <div class="mega-panel__cols">
          <div>
            <h4>Servicios acreditados</h4>
            <a href="${base}servicios.html">Inspeccion visual</a>
            <a href="${base}servicios.html">Ultrasonido</a>
            <a href="${base}servicios.html">Particulas magneticas</a>
            <a href="${base}servicios.html">Pruebas hidrostaticas</a>
          </div>
          <div>
            <h4>Cumplimiento ONAC</h4>
            <a href="${base}alcance-acreditado.html">Alcance acreditado 23-OIN-020</a>
            <a href="${base}acreditacion-onac.html">Acreditacion y vigencia</a>
            <a href="${base}assets/certificados/certificado-onac-23-oin-020.pdf" download>Descargar certificado PDF</a>
            <a href="${base}servicios.html">Servicios complementarios</a>
          </div>
          <div>
            <h4>Operacion B2B</h4>
            <a href="${base}proyectos.html">Galeria tecnica</a>
            <a href="${base}contacto.html">Cotizacion tecnica</a>
            <a href="${base}legal/tratamiento-datos.html">Tratamiento de datos</a>
            <a href="${base}en/index.html">English overview</a>
          </div>
        </div>
      </div>
    `;
    siteHeader.appendChild(mega);

    const mobileClose = document.createElement("button");
    mobileClose.className = "mobile-nav-close";
    mobileClose.type = "button";
    mobileClose.dataset.navClose = "true";
    mobileClose.setAttribute("aria-label", navCloseLabel);
    mobileClose.innerHTML = "<span></span>";
    navMenu.appendChild(mobileClose);

    const mobilePanel = document.createElement("div");
    mobilePanel.className = "mobile-nav-panel";
    mobilePanel.innerHTML = `
      <div class="mobile-nav-actions">
        <a class="btn btn-primary" href="${base}contacto.html">Cotizar inspeccion</a>
        <a class="btn btn-secondary" href="${base}alcance-acreditado.html">Alcance ONAC</a>
      </div>
      <div class="mobile-nav-credential">
        <strong>ONAC 23-OIN-020</strong>
        <span>Organismo de Inspeccion acreditado bajo ISO/IEC 17020:2012.</span>
      </div>
      <div class="mobile-nav-group">
        <h4>Prioridad tecnica</h4>
        <a href="${base}servicios.html">Servicios acreditados y complementarios</a>
        <a href="${base}assets/certificados/certificado-onac-23-oin-020.pdf" download>Descargar certificado ONAC</a>
        <a href="${base}contacto.html">Enviar requerimiento de activo</a>
      </div>
      <div class="mobile-nav-note">ONAC 23-OIN-020 | ISO/IEC 17020:2012</div>
    `;
    navMenu.appendChild(mobilePanel);
    mobileClose.addEventListener("click", closeMenu);

    [...navMenu.children].forEach((child) => {
      if (child.matches && child.matches("a")) child.classList.add("nav-link");
    });

    const openTargets = [...navMenu.children].filter((child) => (
      child.matches && child.matches('a[href*="servicios"], a[href*="alcance"], a[href*="acreditacion"]')
    ));
    let closeTimer;
    const openMega = () => {
      clearTimeout(closeTimer);
      setMegaOpen(true);
    };
    const scheduleClose = () => {
      clearTimeout(closeTimer);
      closeTimer = setTimeout(() => setMegaOpen(false), 160);
    };
    openTargets.forEach((link) => {
      link.classList.add("nav-link--mega");
      link.dataset.megaTrigger = "true";
      link.setAttribute("aria-haspopup", "true");
      link.setAttribute("aria-expanded", "false");
      link.setAttribute("aria-controls", "site-mega-menu");
      link.addEventListener("mouseenter", openMega);
      link.addEventListener("focus", openMega);
      link.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowDown") return;
        event.preventDefault();
        openMega();
        mega.querySelector("a")?.focus();
      });
    });
    navMenu.querySelectorAll(".nav-link:not([data-mega-trigger])").forEach((link) => {
      link.addEventListener("mouseenter", scheduleClose);
    });
    mega.addEventListener("mouseenter", openMega);
    mega.addEventListener("mouseleave", scheduleClose);
    mega.addEventListener("focusin", openMega);
    navMenu.addEventListener("mouseleave", scheduleClose);
    siteHeader.addEventListener("mouseleave", scheduleClose);
    siteHeader.addEventListener("focusout", (event) => {
      if (!siteHeader.contains(event.relatedTarget)) setMegaOpen(false);
    });
    siteHeader.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setMegaOpen(false);
    });
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      setMenuOpen(!navMenu.classList.contains("is-open"));
    });

    navMenu.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      closeMenu();
      setMegaOpen(false);
    });

    document.addEventListener("click", (event) => {
      if (!root.classList.contains("nav-open")) return;
      if (event.target.closest("[data-nav-menu]") || event.target.closest("[data-nav-toggle]")) return;
      closeMenu();
    });
  }

  enhanceNavigation();

  if (new URLSearchParams(window.location.search).get("nav") === "open" && navMenu && navToggle) {
    setMenuOpen(true);
  }

  if (new URLSearchParams(window.location.search).get("mega") === "open" && siteHeader) {
    setMegaOpen(true);
  }

  mobileQuery.addEventListener("change", () => {
    closeMenu();
    setMegaOpen(false);
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  if (backTop) {
    backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  function renderGallery(filter = "all") {
    if (!galleryGrid || !window.IMSERCOL_DATA) return;
    const items = window.IMSERCOL_DATA.gallery.filter((item) => filter === "all" || item.category === filter);
    galleryGrid.innerHTML = items.map((item) => `
      <article class="project-card fade-up" data-category="${item.category}">
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        <div class="project-card__body">
          <span class="eyebrow">${item.category}</span>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <span class="badge badge-muted">${item.label}</span>
        </div>
      </article>
    `).join("");
  }

  if (galleryGrid) renderGallery();

  galleryFilters.forEach((button) => {
    button.addEventListener("click", () => {
      galleryFilters.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      renderGallery(button.dataset.galleryFilter);
    });
  });

  if (serviceSelect && window.IMSERCOL_DATA) {
    const services = [
      ...window.IMSERCOL_DATA.accreditedServices.map((item) => `${item.name} - alcance ONAC a verificar`),
      ...window.IMSERCOL_DATA.complementaryServices.map((item) => `${item.name} - servicio complementario`)
    ];
    services.forEach((service) => {
      const option = document.createElement("option");
      option.value = service;
      option.textContent = service;
      serviceSelect.appendChild(option);
    });
  }

  if (quoteForm) {
    quoteForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const requiredFields = quoteForm.querySelectorAll("[required]");
      let valid = true;

      requiredFields.forEach((field) => {
        const fieldValid = field.type === "checkbox" ? field.checked : field.value.trim().length > 0;
        field.classList.toggle("is-invalid", !fieldValid);
        if (!fieldValid) valid = false;
      });

      const feedback = quoteForm.querySelector("[data-form-feedback]");
      if (!valid) {
        if (feedback) feedback.textContent = "Revisa los campos obligatorios antes de continuar.";
        return;
      }

      const formData = new FormData(quoteForm);
      const subject = encodeURIComponent("Solicitud de cotizacion tecnica IMSERCOL");
      const body = encodeURIComponent(Array.from(formData.entries()).map(([key, value]) => `${key}: ${value}`).join("\n"));
      const mailto = `mailto:?subject=${subject}&body=${body}`;

      if (feedback) feedback.textContent = "Solicitud preparada. Se abrira tu cliente de correo para enviar la informacion.";
      window.location.href = mailto;
      quoteForm.reset();
    });
  }

  const revealItems = document.querySelectorAll(".section, .card, .service-card, .project-card, .document-card, .onac-panel, .hero-panel");
  if ("IntersectionObserver" in window) {
    revealItems.forEach((item) => item.classList.add("reveal"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealItems.forEach((item) => observer.observe(item));
  }

  window.addEventListener("scroll", setScrolledState, { passive: true });
  setScrolledState();
})();
