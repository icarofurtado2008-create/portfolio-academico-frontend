/**
 * Orquestrador principal do Portfólio Acadêmico (V2 — Refatorada).
 * Inicializa navegação responsiva, módulo de projetos, formulário de contato
 * e atualização do ano no rodapé.
 */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();

  if (window.PortfolioApp && window.PortfolioApp.Projects) {
    window.PortfolioApp.Projects.init();
  }

  if (window.PortfolioApp && window.PortfolioApp.Form) {
    window.PortfolioApp.Form.init();
  }

  updateFooterYear();
});

/**
 * Controla a abertura e o fechamento do menu em telas menores,
 * incluindo fechamento por clique externo e tecla Escape.
 */
function initMobileNav() {
  const toggleButton = document.getElementById("nav-toggle");
  const primaryNav = document.getElementById("primary-nav");

  if (!toggleButton || !primaryNav) {
    return;
  }

  const navLinks = primaryNav.querySelectorAll(".nav-link");

  const setMenuState = (isOpen) => {
    toggleButton.setAttribute("aria-expanded", String(isOpen));
    toggleButton.setAttribute(
      "aria-label",
      isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"
    );
    primaryNav.classList.toggle("is-open", isOpen);
  };

  toggleButton.addEventListener("click", (event) => {
    event.stopPropagation();
    const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";
    setMenuState(!isExpanded);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setMenuState(false);
    });
  });

  document.addEventListener("click", (event) => {
    const isOpen = primaryNav.classList.contains("is-open");
    if (!isOpen) {
      return;
    }
    const clickedInsideNav = primaryNav.contains(event.target);
    const clickedToggle = toggleButton.contains(event.target);
    if (!clickedInsideNav && !clickedToggle) {
      setMenuState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && primaryNav.classList.contains("is-open")) {
      setMenuState(false);
      toggleButton.focus();
    }
  });
}

/**
 * Mantém o ano do rodapé atualizado automaticamente.
 */
function updateFooterYear() {
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
}
