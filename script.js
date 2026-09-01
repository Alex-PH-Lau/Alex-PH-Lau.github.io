/**
 * Este script utiliza el Intersection Observer para animar elementos
 * cuando entran en la pantalla. Es mucho más eficiente que
 * usar un evento de 'scroll'.
 */
document.addEventListener("DOMContentLoaded", () => {
  
  // --- Configuración del Observer ---
  const options = {
    root: null, // Observa en relación al viewport
    rootMargin: "0px",
    threshold: 0.2 // Se activa cuando el 20% del elemento sea visible
  };

  // --- Lógica del Observer ---
  // Esta función se llamará CADA VEZ que un elemento observado
  // entre o salga de la pantalla (según el 'threshold')
  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      
      // 'entry.isIntersecting' es true si el elemento está visible
      if (entry.isIntersecting) {
        
        // 1. Añade la clase correspondiente para activar la animación CSS
        if (entry.target.classList.contains("skill-bar")) {
          entry.target.classList.add("filled");
        } else {
          entry.target.classList.add("visible");
        }

        // 2. Deja de observar el elemento (¡Importante!)
        // Una vez animado, no necesitamos vigilarlo más.
        observer.unobserve(entry.target);
      }
    });
  };

  // --- Creación y Ejecución ---

  // 1. Creamos una instancia del observer con nuestra lógica
  const observer = new IntersectionObserver(observerCallback, options);

  // 2. Le decimos qué elementos tiene que vigilar
  // Seleccionamos TODOS los elementos que queremos animar
  const elementsToAnimate = document.querySelectorAll(".reveal, .skill-bar");

  // 3. Le decimos al observer que vigile cada uno de ellos
  elementsToAnimate.forEach((el) => observer.observe(el));

});

/**
 * Paneles "split" de Wet Lab / Dry Lab.
 * En escritorio, la expansión se gestiona solo con CSS (:hover / :focus-within).
 * En dispositivos táctiles (sin hover real), tocar el panel lo expande o
 * lo contrae; tocar directamente uno de los enlaces de la lista navega
 * con normalidad, sin interferencia.
 */
document.addEventListener("DOMContentLoaded", () => {
  const splitPanels = document.querySelectorAll(".split-panel");
  const isTouchDevice = window.matchMedia("(hover: none)").matches;

  if (!isTouchDevice || splitPanels.length === 0) return;

  splitPanels.forEach((panel) => {
    panel.addEventListener("click", (event) => {
      // Si el toque fue directamente sobre un enlace o botón de la
      // lista, se deja actuar con normalidad, sin interferir.
      const clickedItem = event.target.closest(".split-list a, .split-list button");
      if (clickedItem) return;

      // Si no, se trata de un toque sobre el panel: expande o contrae.
      const alreadyExpanded = panel.classList.contains("expanded");
      splitPanels.forEach((p) => p.classList.remove("expanded"));
      if (!alreadyExpanded) {
        panel.classList.add("expanded");
      }
    });
  });
});

/**
 * Panel integrado de resumen (usado por ICM y Semillas Fitó): al pulsar
 * el botón correspondiente en la lista, se despliega un panel dentro
 * de la propia página (empujando el contenido de más abajo), en vez
 * de un modal superpuesto.
 */
document.addEventListener("DOMContentLoaded", () => {
  const panel = document.getElementById("labInfoPanel");
  if (!panel) return;

  const closeBtn = panel.querySelector(".lab-info-close");
  const contents = panel.querySelectorAll(".lab-info-content");
  const triggers = document.querySelectorAll("[data-modal-target]");

  function openPanel(targetId) {
    contents.forEach((content) => {
      content.hidden = content.id !== targetId;
    });
    panel.hidden = false;
    // requestAnimationFrame para asegurar que el navegador aplica el
    // estado inicial (max-height: 0) antes de añadir .open, y así
    // se vea la transición en vez de saltar directamente al final.
    requestAnimationFrame(() => panel.classList.add("open"));
    panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function closePanel() {
    panel.classList.remove("open");
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const targetId = trigger.dataset.modalTarget;
      // Si ya estaba abierto mostrando el mismo contenido, el botón
      // actúa como cierre; si no, lo abre (o cambia de contenido).
      const isSameAndOpen =
        panel.classList.contains("open") &&
        !document.getElementById(targetId).hidden;
      if (isSameAndOpen) {
        closePanel();
      } else {
        openPanel(targetId);
      }
    });
  });

  closeBtn.addEventListener("click", closePanel);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && panel.classList.contains("open")) {
      closePanel();
    }
  });
});

/**
 * Barra de navegación flotante: permanece oculta mientras se está en
 * el hero (que ya tiene sus propios botones) y aparece con una
 * transición suave en cuanto se hace scroll hacia abajo.
 */
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("floatingNav");
  const hero = document.querySelector(".hero");
  if (!nav || !hero) return;

  const heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Cuando el hero deja de ser visible (se ha hecho scroll más
        // allá de él), se muestra la barra; cuando vuelve a verse
        // (se ha vuelto arriba del todo), se oculta de nuevo.
        nav.classList.toggle("visible", !entry.isIntersecting);
      });
    },
    { threshold: 0 }
  );

  heroObserver.observe(hero);
});
