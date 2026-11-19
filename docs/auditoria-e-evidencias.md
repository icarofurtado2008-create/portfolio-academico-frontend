# Auditoria Técnica, Refatoração e Evidências (Antes / Depois)

Este documento registra os **5 problemas reais** identificados na V1 (`tag v1.0.0-base`) durante a inspeção de código e execução no navegador, bem como a refatoração aplicada e as evidências visuais de antes e depois.

---

## 1. Diagnóstico dos 5 Problemas Reais da V1

### Problema 1 — Funcionalidade: Ausência de filtragem de projetos e formulário funcional
- **Local:** `index.html` (`#projetos` e `#contato`), `js/projects.js`, `js/main.js`.
- **Reprodução:** Acessar as seções `#projetos` e `#contato` na V1.
- **Comportamento atual (V1):** Os projetos eram exibidos de forma estática, sem filtro por categoria, busca textual, contagem de resultados ou tratamento de estado vazio. A seção Contato possuía apenas um bloco informativo sem formulário.
- **Comportamento esperado:** Barra de filtros com opção `Todos`, estado ativo acessível (`aria-pressed`), busca por palavra-chave, contagem dinâmica (`aria-live="polite"`), estado vazio com botão de redefinição e formulário de contato completo com validação e simulação assíncrona determinística.
- **Prioridade:** Alta.
- **Solução aplicada:** Criação de `js/projects.js` (controle de filtros, busca e estado vazio), `js/validation.js` (regras puras de validação) e `js/form.js` (controle de estados, campo condicional, contador e simulação assíncrona).

### Problema 2 — Acessibilidade: Fechamento do menu mobile e anúncios dinâmicos incompletos
- **Local:** `js/main.js` (`initMobileNav`) e `index.html`.
- **Reprodução:** Abrir o menu mobile em `360px` e clicar fora da área de navegação; interagir com atualizações dinâmicas sem regiões `aria-live` dedicadas.
- **Comportamento atual (V1):** O menu mobile fechava apenas pelo botão, links ou tecla `Escape`, mas permanecia aberto ao clicar fora dele. Não havia feedback dinâmico dedicado para contagem de projetos nem status de formulário.
- **Comportamento esperado:** Fechamento do menu também ao clicar fora (`click outside`), preservação de retorno de foco ao `#nav-toggle` no `Escape`, `aria-pressed` nos filtros e `aria-live="polite"` / `role="alert"` no formulário.
- **Prioridade:** Alta.
- **Solução aplicada:** Adicionado listener de clique externo em `js/main.js` e atributos ARIA completos em `index.html`, `js/projects.js` e `js/form.js`.

### Problema 3 — Responsividade: Altura fixa do header e espaçamento apertado em 360px / Zoom 200%
- **Local:** `css/style.css` (`.site-header`, `.container`) e `css/responsive.css`.
- **Reprodução:** Visualizar a página em `360px` de largura ou aplicar zoom de `200%` em viewport de `1280px`.
- **Comportamento atual (V1):** O header utilizava `height: 76px` rígido e o `.container` usava `2.5rem` de margem lateral combinado a `padding: 2rem` nos cards, reduzindo a área útil de leitura em telas estreitas.
- **Comportamento esperado:** Header flexível com `min-height` e padding vertical; margens e paddings dos cards ajustados em `@media (max-width: 768px)` para garantir zero overflow horizontal em `360px`, `768px`, `1280px` e zoom `200%`.
- **Prioridade:** Média.
- **Solução aplicada:** Substituído `height` por `min-height` no `.site-header`, ajustado `.container` para `min(100% - 2rem, ...)` e reduzido o padding interno dos cards em mobile para `1.25rem`.

### Problema 4 — Organização do Código: Acoplamento por variável global e script único
- **Local:** `js/projects.js` e `js/main.js` (V1).
- **Reprodução:** Inspecionar como `main.js` consumia `PROJECTS_DATA` diretamente no escopo global.
- **Comportamento atual (V1):** Os dados ficavam expostos como constante global solta e toda a lógica de interface residia em `main.js`.
- **Comportamento esperado:** Separação clara de responsabilidades em módulos independentes sob namespace controlado (`window.PortfolioApp`), mantendo compatibilidade tanto via servidor HTTP quanto via abertura direta (`file://`).
- **Prioridade:** Média.
- **Solução aplicada:** Refatoração em 5 módulos: `js/data.js`, `js/validation.js`, `js/projects.js`, `js/form.js` e `js/main.js`.

### Problema 5 — Rede / Console: Erro 404 de `favicon.ico` e imagens sem dimensões explícitas
- **Local:** `index.html` (`<head>`) e `js/main.js` (`createProjectCard` na V1).
- **Reprodução:** Abrir a V1 no navegador com o Console/Network aberto (`http://localhost:8124/`).
- **Comportamento atual (V1):** O navegador registrava `[ERROR] Failed to load resource: the server responded with a status of 404 (File not found) @ http://localhost:8124/favicon.ico:1`. Além disso, as tags `<img>` dos cards não definiam `width` e `height` explícitos.
- **Comportamento esperado:** Zero erros no console e zero requisições com status `>= 400` na aba Network; imagens com `width="800"` e `height="450"` para evitar deslocamento de layout (CLS).
- **Prioridade:** Média.
- **Solução aplicada:** Criado `assets/images/favicon.svg` referenciado no `<head>` e adicionados `width="800"` e `height="450"` na criação das imagens em `js/projects.js`.

---

## 2. Explicação da Refatoração

Na V1, o JavaScript era composto por `projects.js` (dados globais) e `main.js` (navegação, renderização e rodapé). Com a introdução de filtros, busca, validação e simulação de envio, manter tudo em um único arquivo geraria acoplamento e dificultaria testes e manutenção.

A refatoração dividiu a aplicação em camadas sob `window.PortfolioApp`:
1. **`js/data.js`**: Fonte única de dados dos projetos.
2. **`js/validation.js`**: Funções puras de validação, sem dependência do DOM, facilitando leitura e testes.
3. **`js/projects.js`**: Estado e renderização do catálogo, filtros e estado vazio.
4. **`js/form.js`**: Ciclo de vida do formulário (campo condicional, contador, bloqueio de duplicidade e simulação assíncrona).
5. **`js/main.js`**: Ponto de entrada que inicializa a navegação mobile e os módulos.

---

## 3. Evidências Reais (Antes e Depois)

Todas as capturas foram geradas via Playwright em `http://localhost:8124/`.

| Área | Antes (V1) | Depois (V2) | O que mudou |
| :--- | :--- | :--- | :--- |
| **Projetos (Desktop)** | [antes-projetos-desktop.png](evidencias/antes-projetos-desktop.png) | [depois-projetos-desktop.png](evidencias/depois-projetos-desktop.png) | Inclusão de filtros com `aria-pressed`, busca, badge de categoria e contagem dinâmica. |
| **Contato (Desktop)** | [antes-contato-desktop.png](evidencias/antes-contato-desktop.png) | [depois-contato-desktop.png](evidencias/depois-contato-desktop.png) | Substituição do espaço reservado pelo formulário completo com contador, validação e controle de simulação. |
| **Mobile (360px)** | [antes-mobile-360.png](evidencias/antes-mobile-360.png) | [depois-mobile-360.png](evidencias/depois-mobile-360.png) | Ajuste de espaçamento lateral, header flexível (`min-height`) e menu com fechamento por clique externo. |
