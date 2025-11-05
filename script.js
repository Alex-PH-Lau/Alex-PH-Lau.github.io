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
