// Pequeña animación al hacer scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll(".section, .reveal");
  const skillBars = document.querySelectorAll(".skill-bar");

  sections.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    } else {
      el.style.opacity = 0;
      el.style.transform = "translateY(30px)";
    }
  });

  // Animar barras de habilidad una sola vez
  skillBars.forEach(bar => {
    const rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100 && !bar.classList.contains("filled")) {
      bar.classList.add("filled");
    }
  });
});
