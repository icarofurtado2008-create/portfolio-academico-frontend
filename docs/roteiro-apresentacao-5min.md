# Roteiro de Apresentação e Defesa Técnica (5 Minutos)

Guia prático para apresentar o portfólio acadêmico à professora Daniele Virgens, explicando as decisões técnicas e os principais trechos de JavaScript.

---

## Divisão de Tempo (5 minutos)

| Tempo | Bloco | O que apresentar e demonstrar |
| :--- | :--- | :--- |
| **0:00 – 0:45** | **1. Contexto e Evolução V1 → V2** | Mostrar o histórico Git (`tag v1.0.0-base` vs commits atuais) e explicar que o projeto usa exclusivamente HTML5 semântico, CSS3 puro e JavaScript Vanilla. |
| **0:45 – 1:45** | **2. Auditoria e Refatoração** | Apresentar os 5 problemas reais encontrados na V1 (falta de filtros/formulário, clique externo no menu mobile, header/espacamento em 360px, acoplamento global e erro 404 de favicon) e mostrar as evidências antes/depois em `docs/evidencias/`. |
| **1:45 – 2:45** | **3. Filtro de Projetos** | Demonstrar ao vivo o filtro por categoria (`Todos`, `Simulações e Cálculos`, `Gestão e Análise`), a busca por texto, o contador dinâmico e o estado vazio com botão `Limpar filtros`. |
| **2:45 – 4:15** | **4. Formulário Completo e Estados** | Demonstrar: envio vazio (foco no 1º inválido), seleção de `Outro` (campo condicional), contador de caracteres, **Simular falha** (dados preservados) seguido de **Simular sucesso**, e prevenção de clique duplo. |
| **4:15 – 5:00** | **5. Testes e Limitações** | Mostrar a matriz de testes (T01 a T13 aprovados), destacar responsividade (`360px` a `1280px` + zoom 200%) e citar honestamente as limitações (simulação local sem envio real de e-mail). |

---

## Explicação Simples dos Principais Trechos de JavaScript

### 1. Refatoração Modular (`window.PortfolioApp`)
- **Onde está:** `js/data.js`, `js/validation.js`, `js/projects.js`, `js/form.js`, `js/main.js`.
- **Como explicar na defesa:** *"Na V1, os dados ficavam soltos no escopo global. Na refatoração, separei cada responsabilidade em um módulo dentro do namespace `PortfolioApp`: dados em `data.js`, regras puras em `validation.js`, lógica dos cards em `projects.js` e controle de envio em `form.js`. Isso evita conflito de nomes e permite rodar o projeto tanto em servidor local quanto abrindo o `index.html` diretamente."*

### 2. Filtro de Projetos (`js/projects.js`)
- **Como funciona:**
  - Mantemos um objeto `state = { category: "Todos", search: "" }`.
  - Sempre que o usuário clica em uma categoria ou digita na busca, `filterProjects()` filtra `allProjects` verificando se a categoria bate (ou se é `"Todos"`) e se o texto digitado aparece em nome, descrição, problema, público-alvo ou tags.
  - `updateFilterButtonsState()` atualiza `aria-pressed="true"` apenas no botão ativo, garantindo acessibilidade para leitores de tela.
  - `renderCards()` alterna a visibilidade entre `#projects-grid` e `#projects-empty` quando o resultado é zero.

### 3. Validação e Foco no Primeiro Campo Inválido (`js/validation.js` e `js/form.js`)
- **Como funciona:**
  - Em `validation.js`, funções puras como `validateNome()`, `validateEmail()` e `validateMensagem()` retornam `""` quando válidas ou a mensagem específica de erro.
  - No `handleSubmit()` em `form.js`, percorremos os campos na ordem visual (`["nome", "email", "motivo", "outroMotivo", "mensagem"]`). O primeiro campo que retornar erro é salvo em `firstInvalidKey`.
  - Se houver erro, chamamos `fields[firstInvalidKey].focus()`, levando o usuário diretamente ao primeiro campo que precisa de correção.

### 4. Campo Condicional "Outro" (`syncOutroFieldVisibility` em `js/form.js`)
- **Como funciona:**
  - Quando `#contact-motivo` muda para `"Outro"`, removemos o atributo `hidden` de `#outro-motivo-group` e definimos `aria-hidden="false"`.
  - Se o usuário trocar para qualquer outro motivo, o grupo volta a ficar oculto, o valor digitado é apagado e o erro do campo é limpo.
  - Na validação (`validateOutroMotivo`), o campo só é exigido se `motivo === "Outro"`.

### 5. Prevenção de Duplicidade e Simulação Assíncrona (`handleSubmit` em `js/form.js`)
- **Como funciona:**
  - A variável `isSubmitting` começa como `false`. No início do envio válido, ela vira `true`, o botão fica `disabled = true` com `aria-busy="true"` e o texto muda para `"Processando envio..."`.
  - Se o usuário clicar novamente durante os `700ms` da `Promise`, o `if (isSubmitting) return;` ignora o clique extra.
  - No bloco `try/catch/finally`: se o seletor estiver em `"error"`, cai no `catch`, exibe o aviso de falha e **não** chama `form.reset()`, preservando tudo que foi digitado; se estiver em `"success"`, exibe a confirmação (com aviso de que nenhum e-mail foi enviado) e limpa o formulário. O `finally` sempre libera `isSubmitting = false`.
