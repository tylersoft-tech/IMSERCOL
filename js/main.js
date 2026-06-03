(function () {
  const root = document.documentElement;
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navMenu = document.querySelector("[data-nav-menu]");
  const siteHeader = document.querySelector(".site-header");
  const mobileQuery = window.matchMedia("(max-width: 1040px)");
  const backTop = document.querySelector("[data-back-top]");
  const mobileActionBar = document.querySelector(".mobile-action-bar");
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
    if (mobileActionBar) mobileActionBar.classList.toggle("is-visible", window.scrollY > 520);
  }

  let activeMegaTrigger = null;

  function setMegaOpen(isOpen, trigger = activeMegaTrigger) {
    if (!siteHeader) return;
    const shouldOpen = Boolean(isOpen && !mobileQuery.matches);
    const selectedTrigger = trigger || siteHeader.querySelector("[data-mega-trigger]");
    siteHeader.classList.toggle("mega-open", shouldOpen);
    activeMegaTrigger = shouldOpen ? selectedTrigger : null;

    const mega = siteHeader.querySelector(".mega-panel");
    if (mega) mega.setAttribute("aria-hidden", String(!shouldOpen));

    siteHeader.querySelectorAll("[data-mega-trigger]").forEach((trigger) => {
      trigger.setAttribute("aria-expanded", String(shouldOpen && trigger === activeMegaTrigger));
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
    const isEnglish = document.documentElement.lang === "en";
    const languageHref = isEnglish ? `${base}index.html` : `${base}en/index.html`;
    const text = isEnglish ? {
      menuLabel: "Expanded technical menu",
      portfolio: "IMSERCOL portfolio",
      title: "Services for critical industrial assets",
      intro: "NDT inspection, testing, maintenance, instrumentation and documentation support for energy, hydrocarbons, drilling and workover.",
      kpiNdt: "NDT",
      kpiNdtDetail: "UT, MT, PT, EMI",
      kpiOps: "Operation",
      kpiOpsDetail: "Barrancabermeja and Yondo",
      quote: "Request quotation",
      viewPortfolio: "View portfolio",
      mainServices: "Main services",
      visualTitle: "Visual and dimensional inspection",
      visualText: "Drill pipe, tubing, casing, towers, substructures, connections and tools.",
      ndtTitle: "NDT",
      ndtText: "Ultrasonic testing, magnetic particles, liquid penetrants and EMI inspection.",
      testsTitle: "Testing and API",
      testsText: "Hydrostatic testing, API RP 4G category III and IV, accumulator FIC test.",
      maintenanceTitle: "Maintenance and calibration",
      maintenanceText: "Accumulators, pumps, valves, pressure indicators and weight indicators.",
      instrumentationTitle: "Instrumentation",
      instrumentationText: "Rig up, digital pressure systems and PLC alarms.",
      fieldTitle: "Field applications",
      fieldText: "Applications by technical front, equipment, plants and infrastructure.",
      quick: "Quick access",
      requestTitle: "Send requirement",
      requestText: "Asset, location, expected method, urgency and required document.",
      docsTitle: "Documentation support",
      docsText: "ICONTEC certifications, ONAC and verification documents.",
      langTitle: "Spanish version",
      langText: "Return to the Spanish homepage.",
      quoteBetter: "For a better quote",
      quoteItems: ["Asset type and quantity", "Service location", "Expected method or standard", "Tentative date"],
      mobilePortfolio: "Technical portfolio",
      mobileVisual: "Visual and dimensional inspection",
      mobileNdt: "NDT: UT, MT, PT and EMI",
      mobileMaintenance: "Maintenance and instrumentation",
      mobileDocs: "Documentation support"
    } : {
      menuLabel: "Menu tecnico ampliado",
      portfolio: "Portafolio IMSERCOL",
      title: "Servicios para activos industriales criticos",
      intro: "Inspeccion NDT, pruebas, mantenimiento, instrumentacion y soporte documental para energia, hidrocarburos, perforacion y workover.",
      kpiNdt: "NDT",
      kpiNdtDetail: "UT, MT, PT, EMI",
      kpiOps: "Operacion",
      kpiOpsDetail: "Barrancabermeja y Yondo",
      quote: "Cotizar servicio",
      viewPortfolio: "Ver portafolio",
      mainServices: "Servicios principales",
      visualTitle: "Inspeccion visual y dimensional",
      visualText: "Drill pipe, tubing, casing, torres, subestructuras, conexiones y herramientas.",
      ndtTitle: "NDT / END",
      ndtText: "Ultrasonido UT, particulas magneticas, liquidos penetrantes e inspeccion EMI.",
      testsTitle: "Pruebas y API",
      testsText: "Hidrostaticas, API RP 4G categoria III y IV, FIC de acumuladores.",
      maintenanceTitle: "Mantenimiento y calibracion",
      maintenanceText: "Acumuladores, bombas, valvulas, indicadores de presion y peso.",
      instrumentationTitle: "Instrumentacion",
      instrumentationText: "Rig up, sistemas digitales de presion y alarmas con PLC.",
      fieldTitle: "Campo industrial",
      fieldText: "Aplicaciones por frente tecnico, equipos, plantas e infraestructura.",
      quick: "Accesos rapidos",
      requestTitle: "Enviar requerimiento",
      requestText: "Activo, ubicacion, metodo esperado, urgencia y documento requerido.",
      docsTitle: "Soporte documental",
      docsText: "Certificaciones ICONTEC, ONAC y documentos de verificacion.",
      langTitle: "English overview",
      langText: "Resumen del portafolio industrial en ingles.",
      quoteBetter: "Para cotizar mejor",
      quoteItems: ["Tipo y cantidad de activos", "Sitio de atencion", "Metodo o norma esperada", "Fecha tentativa"],
      mobilePortfolio: "Portafolio tecnico",
      mobileVisual: "Inspeccion visual y dimensional",
      mobileNdt: "NDT: UT, MT, PT y EMI",
      mobileMaintenance: "Mantenimiento e instrumentacion",
      mobileDocs: "Soporte documental"
    };
    const mega = document.createElement("div");
    mega.className = "mega-panel";
    mega.id = "site-mega-menu";
    mega.setAttribute("role", "navigation");
    mega.setAttribute("aria-label", text.menuLabel);
    mega.setAttribute("aria-hidden", "true");
    mega.innerHTML = `
      <div class="container mega-panel__inner mega-panel__inner--portfolio">
        <div class="mega-panel__intro">
          <span class="eyebrow">${text.portfolio}</span>
          <h3>${text.title}</h3>
          <p>${text.intro}</p>
          <div class="mega-kpis" aria-label="Credenciales principales">
            <span><strong>${text.kpiNdt}</strong>${text.kpiNdtDetail}</span>
            <span><strong>${text.kpiOps}</strong>${text.kpiOpsDetail}</span>
          </div>
          <div class="mega-panel__actions">
            <a class="btn btn-primary" href="${base}contacto.html">${text.quote}</a>
            <a class="btn btn-ghost" href="${base}servicios.html">${text.viewPortfolio}</a>
          </div>
        </div>
        <div class="mega-panel__services">
          <h4>${text.mainServices}</h4>
          <div class="mega-service-grid">
            <a href="${base}servicios.html#inspeccion"><strong>${text.visualTitle}</strong><span>${text.visualText}</span></a>
            <a href="${base}servicios.html#ndt"><strong>${text.ndtTitle}</strong><span>${text.ndtText}</span></a>
            <a href="${base}servicios.html#pruebas"><strong>${text.testsTitle}</strong><span>${text.testsText}</span></a>
            <a href="${base}servicios.html#mantenimiento"><strong>${text.maintenanceTitle}</strong><span>${text.maintenanceText}</span></a>
            <a href="${base}servicios.html#instrumentacion"><strong>${text.instrumentationTitle}</strong><span>${text.instrumentationText}</span></a>
            <a href="${base}proyectos.html"><strong>${text.fieldTitle}</strong><span>${text.fieldText}</span></a>
          </div>
        </div>
        <div class="mega-panel__support">
          <div class="mega-panel__decision">
            <h4>${text.quick}</h4>
            <a href="${base}contacto.html"><strong>${text.requestTitle}</strong><span>${text.requestText}</span></a>
            <a href="${base}acreditacion-onac.html"><strong>${text.docsTitle}</strong><span>${text.docsText}</span></a>
            <a href="${languageHref}"><strong>${text.langTitle}</strong><span>${text.langText}</span></a>
          </div>
          <div class="mega-quote-note">
            <h4>${text.quoteBetter}</h4>
            ${text.quoteItems.map((item) => `<span>${item}</span>`).join("")}
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
        <a class="btn btn-primary" href="${base}contacto.html">${text.quote}</a>
        <a class="btn btn-secondary" href="${base}servicios.html">${text.viewPortfolio}</a>
      </div>
      <div class="mobile-nav-group">
        <h4>${text.mobilePortfolio}</h4>
        <a href="${base}servicios.html#inspeccion">${text.mobileVisual}</a>
        <a href="${base}servicios.html#ndt">${text.mobileNdt}</a>
        <a href="${base}servicios.html#mantenimiento">${text.mobileMaintenance}</a>
        <a href="${base}acreditacion-onac.html">${text.mobileDocs}</a>
      </div>
      <div class="mobile-nav-note">Barrancabermeja | Yondo | Colombia</div>
    `;
    navMenu.appendChild(mobilePanel);
    mobileClose.addEventListener("click", closeMenu);

    [...navMenu.children].forEach((child) => {
      if (child.matches && child.matches("a")) child.classList.add("nav-link");
    });

    const openTargets = [...navMenu.children].filter((child) => (
      child.matches && child.matches('a[href*="servicios"]')
    ));
    let closeTimer;
    const openMega = (trigger) => {
      clearTimeout(closeTimer);
      setMegaOpen(true, trigger);
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
      link.addEventListener("mouseenter", () => openMega(link));
      link.addEventListener("focus", () => openMega(link));
      link.addEventListener("click", (event) => {
        if (mobileQuery.matches) return;
        if (siteHeader.classList.contains("mega-open") && activeMegaTrigger === link) {
          setMegaOpen(false);
          return;
        }
        event.preventDefault();
        openMega(link);
      });
      link.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowDown") return;
        event.preventDefault();
        openMega(link);
        mega.querySelector("a")?.focus();
      });
    });
    navMenu.querySelectorAll(".nav-link:not([data-mega-trigger])").forEach((link) => {
      link.addEventListener("mouseenter", scheduleClose);
    });
    mega.addEventListener("mouseenter", () => openMega(activeMegaTrigger));
    mega.addEventListener("mouseleave", scheduleClose);
    mega.addEventListener("focusin", () => openMega(activeMegaTrigger));
    navMenu.addEventListener("mouseleave", scheduleClose);
    siteHeader.addEventListener("mouseleave", scheduleClose);
    siteHeader.addEventListener("focusout", (event) => {
      if (!siteHeader.contains(event.relatedTarget)) setMegaOpen(false);
    });
    siteHeader.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setMegaOpen(false);
    });
    document.addEventListener("click", (event) => {
      if (!siteHeader.classList.contains("mega-open")) return;
      if (event.target.closest(".site-header")) return;
      setMegaOpen(false);
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
      ...window.IMSERCOL_DATA.inspectionServices.map((item) => item.name),
      ...window.IMSERCOL_DATA.complementaryServices.map((item) => item.name)
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
      const recipient = window.IMSERCOL_DATA?.contact?.email || "";
      const mailto = `mailto:${recipient}?subject=${subject}&body=${body}`;

      if (feedback) feedback.textContent = "Solicitud preparada. Se abrira tu cliente de correo para enviar la informacion.";
      window.location.href = mailto;
      quoteForm.reset();
    });
  }

  const revealItems = document.querySelectorAll(".section, .card, .service-card, .project-card, .document-card, .info-panel, .onac-panel, .hero-panel");
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
