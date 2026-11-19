/**
 * Script principal da V1 do Portfólio Acadêmico.
 * Responsável pela navegação responsiva, renderização dos projetos
 * e atualização do ano no rodapé.
 */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  renderProjects(typeof PROJECTS_DATA !== "undefined" ? PROJECTS_DATA : []);
  updateFooterYear();
});

/**
 * Controla a abertura e o fechamento do menu em telas menores.
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

  toggleButton.addEventListener("click", () => {
    const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";
    setMenuState(!isExpanded);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setMenuState(false);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && primaryNav.classList.contains("is-open")) {
      setMenuState(false);
      toggleButton.focus();
    }
  });
}

/**
 * Renderiza os cards de projeto no container #projects-grid.
 * @param {Array<Object>} projects - Lista de projetos definida em projects.js
 */
function renderProjects(projects) {
  const grid = document.getElementById("projects-grid");
  if (!grid) {
    return;
  }

  grid.replaceChildren();

  if (!Array.isArray(projects) || projects.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "project-link-status";
    emptyMessage.textContent = "Nenhum projeto cadastrado nesta versão.";
    grid.appendChild(emptyMessage);
    return;
  }

  const fragment = document.createDocumentFragment();
  projects.forEach((project) => {
    fragment.appendChild(createProjectCard(project));
  });

  grid.appendChild(fragment);
}

/**
 * Constrói o elemento HTML de um card de projeto usando DOM API.
 * @param {Object} project - Objeto com os metadados do projeto
 * @returns {HTMLElement}
 */
function createProjectCard(project) {
  const card = document.createElement("article");
  card.className = "project-card";

  // Imagem de prévia
  const media = document.createElement("div");
  media.className = "project-media";

  const img = document.createElement("img");
  img.className = "project-image";
  img.src = project.imagem;
  img.alt = project.imagemAlt || `Prévia do projeto ${project.nome}`;
  img.loading = "lazy";
  media.appendChild(img);

  // Corpo do card
  const body = document.createElement("div");
  body.className = "project-body";

  const title = document.createElement("h3");
  title.className = "project-title";
  title.textContent = project.nome;

  const description = document.createElement("p");
  description.className = "project-description";
  description.textContent = project.descricao;

  // Lista de definição para Problema, Público-alvo e Contribuição
  const details = document.createElement("dl");
  details.className = "project-details";
  details.appendChild(createDetailItem("Problema abordado", project.problema));
  details.appendChild(createDetailItem("Público-alvo", project.publicoAlvo));
  details.appendChild(createDetailItem("Minha contribuição", project.contribuicao));

  // Tecnologias / Contexto técnico
  const techList = document.createElement("ul");
  techList.className = "project-tech-list";
  techList.setAttribute("aria-label", `Tecnologias e contexto de ${project.nome}`);

  if (Array.isArray(project.tecnologias)) {
    project.tecnologias.forEach((tech) => {
      const item = document.createElement("li");
      item.className = "project-tech-tag";
      item.textContent = tech;
      techList.appendChild(item);
    });
  }

  // Área de links (apenas quando confirmados)
  const linksContainer = document.createElement("div");
  linksContainer.className = "project-links";

  let hasLinks = false;

  if (project.demoUrl) {
    linksContainer.appendChild(createExternalLink("Ver demonstração", project.demoUrl, "btn btn-primary btn-sm"));
    hasLinks = true;
  }

  if (project.repoUrl) {
    linksContainer.appendChild(createExternalLink("Ver repositório", project.repoUrl, "btn btn-secondary btn-sm"));
    hasLinks = true;
  }

  if (!hasLinks) {
    const status = document.createElement("span");
    status.className = "project-link-status";
    status.textContent = "Links de demonstração e repositório não vinculados nesta V1.";
    linksContainer.appendChild(status);
  }

  body.append(title, description, details, techList, linksContainer);
  card.append(media, body);

  return card;
}

/**
 * Cria um par <dt>/<dd> para os detalhes estruturados do projeto.
 * @param {string} label
 * @param {string} value
 * @returns {HTMLDivElement}
 */
function createDetailItem(label, value) {
  const wrapper = document.createElement("div");
  wrapper.className = "project-detail-item";

  const dt = document.createElement("dt");
  dt.textContent = label;

  const dd = document.createElement("dd");
  dd.textContent = value;

  wrapper.append(dt, dd);
  return wrapper;
}

/**
 * Cria um link externo seguro com target="_blank" e rel="noopener noreferrer".
 * @param {string} label
 * @param {string} url
 * @param {string} className
 * @returns {HTMLAnchorElement}
 */
function createExternalLink(label, url, className) {
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  anchor.className = className;
  anchor.textContent = label;
  return anchor;
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
