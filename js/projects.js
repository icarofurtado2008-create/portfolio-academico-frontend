/**
 * Módulo de Projetos (V2 — Refatorada).
 * Gerencia filtragem por categoria, busca textual, contagem acessível
 * de resultados, estado vazio e renderização segura dos cards.
 */
window.PortfolioApp = window.PortfolioApp || {};

window.PortfolioApp.Projects = (() => {
  const state = {
    category: "Todos",
    search: ""
  };

  let allProjects = [];
  let elements = {};

  function init() {
    allProjects = (window.PortfolioApp.DATA && window.PortfolioApp.DATA.projects) || [];

    elements = {
      grid: document.getElementById("projects-grid"),
      count: document.getElementById("projects-count"),
      filtersContainer: document.getElementById("project-filters"),
      searchInput: document.getElementById("project-search"),
      emptyState: document.getElementById("projects-empty"),
      resetButton: document.getElementById("reset-filters-btn")
    };

    if (!elements.grid) {
      return;
    }

    renderFilterButtons();
    bindEvents();
    applyFilters();
  }

  function getCategories() {
    const categories = new Set(["Todos"]);
    allProjects.forEach((project) => {
      if (project.categoria) {
        categories.add(project.categoria);
      }
    });
    return Array.from(categories);
  }

  function renderFilterButtons() {
    if (!elements.filtersContainer) {
      return;
    }

    elements.filtersContainer.replaceChildren();
    const categories = getCategories();

    categories.forEach((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "filter-btn";
      button.dataset.category = category;
      button.setAttribute("aria-pressed", String(state.category === category));
      button.textContent = category;
      elements.filtersContainer.appendChild(button);
    });
  }

  function bindEvents() {
    if (elements.filtersContainer) {
      elements.filtersContainer.addEventListener("click", (event) => {
        const button = event.target.closest(".filter-btn");
        if (!button) {
          return;
        }
        state.category = button.dataset.category || "Todos";
        updateFilterButtonsState();
        applyFilters();
      });
    }

    if (elements.searchInput) {
      elements.searchInput.addEventListener("input", (event) => {
        state.search = event.target.value.trim().toLowerCase();
        applyFilters();
      });
    }

    if (elements.resetButton) {
      elements.resetButton.addEventListener("click", () => {
        resetFilters();
        if (elements.filtersContainer) {
          const firstFilter = elements.filtersContainer.querySelector(".filter-btn");
          if (firstFilter) {
            firstFilter.focus();
          }
        }
      });
    }
  }

  function updateFilterButtonsState() {
    if (!elements.filtersContainer) {
      return;
    }
    const buttons = elements.filtersContainer.querySelectorAll(".filter-btn");
    buttons.forEach((btn) => {
      const isActive = btn.dataset.category === state.category;
      btn.setAttribute("aria-pressed", String(isActive));
      btn.classList.toggle("is-active", isActive);
    });
  }

  function resetFilters() {
    state.category = "Todos";
    state.search = "";
    if (elements.searchInput) {
      elements.searchInput.value = "";
    }
    updateFilterButtonsState();
    applyFilters();
  }

  function filterProjects() {
    return allProjects.filter((project) => {
      const matchesCategory =
        state.category === "Todos" || project.categoria === state.category;

      if (!matchesCategory) {
        return false;
      }

      if (!state.search) {
        return true;
      }

      const searchableText = [
        project.nome,
        project.categoria,
        project.descricao,
        project.problema,
        project.publicoAlvo,
        ...(Array.isArray(project.tecnologias) ? project.tecnologias : [])
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(state.search);
    });
  }

  function applyFilters() {
    const filtered = filterProjects();
    updateCount(filtered.length, allProjects.length);
    renderCards(filtered);
  }

  function updateCount(visibleCount, totalCount) {
    if (!elements.count) {
      return;
    }
    const label = visibleCount === 1 ? "projeto" : "projetos";
    elements.count.textContent = `Exibindo ${visibleCount} de ${totalCount} ${label}.`;
  }

  function renderCards(projects) {
    elements.grid.replaceChildren();

    const isEmpty = projects.length === 0;
    if (elements.emptyState) {
      elements.emptyState.hidden = !isEmpty;
    }
    elements.grid.hidden = isEmpty;

    if (isEmpty) {
      return;
    }

    const fragment = document.createDocumentFragment();
    projects.forEach((project) => {
      fragment.appendChild(createProjectCard(project));
    });
    elements.grid.appendChild(fragment);
  }

  function createProjectCard(project) {
    const card = document.createElement("article");
    card.className = "project-card";

    const media = document.createElement("div");
    media.className = "project-media";

    const img = document.createElement("img");
    img.className = "project-image";
    img.src = project.imagem;
    img.alt = project.imagemAlt || `Prévia do projeto ${project.nome}`;
    img.width = 800;
    img.height = 450;
    img.loading = "lazy";
    media.appendChild(img);

    const body = document.createElement("div");
    body.className = "project-body";

    const categoryBadge = document.createElement("span");
    categoryBadge.className = "project-category-badge";
    categoryBadge.textContent = project.categoria;

    const title = document.createElement("h3");
    title.className = "project-title";
    title.textContent = project.nome;

    const description = document.createElement("p");
    description.className = "project-description";
    description.textContent = project.descricao;

    const details = document.createElement("dl");
    details.className = "project-details";
    details.appendChild(createDetailItem("Problema abordado", project.problema));
    details.appendChild(createDetailItem("Público-alvo", project.publicoAlvo));
    details.appendChild(createDetailItem("Minha contribuição", project.contribuicao));

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
      status.textContent = "Links de demonstração e repositório não vinculados nesta versão.";
      linksContainer.appendChild(status);
    }

    body.append(categoryBadge, title, description, details, techList, linksContainer);
    card.append(media, body);

    return card;
  }

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

  function createExternalLink(label, url, className) {
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.className = className;
    anchor.textContent = label;
    return anchor;
  }

  return { init };
})();
