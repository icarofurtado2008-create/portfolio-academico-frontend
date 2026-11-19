# Matriz de Testes, Funcionamento do Formulário e Limitações Conhecidas

## 1. Matriz de Testes Executados (T01 a T13)

Todos os testes abaixo foram executados em navegador real (Chromium via Playwright) contra o servidor local `http://localhost:8124/`.

| ID | Caso de Teste | Cenário / Passos | Resultado Esperado | Resultado Observado | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **T01** | Carregamento inicial, Console e Network | Abrir `http://localhost:8124/` em `1280x800` e monitorar `console` e `response`. | Zero erros de console e zero respostas HTTP `>= 400`. | `consoleErrors: []`, `failedRequests: []`. | **Aprovado** |
| **T02** | Filtro de projetos e contagem | Clicar em `Simulações e Cálculos`, depois `Gestão e Análise`, depois `Todos`. | `aria-pressed="true"` no botão ativo e contagem atualizada (`1 de 2`, `1 de 2`, `2 de 2`). | `simPressed: "true"`, contagens exatas exibidas. | **Aprovado** |
| **T03** | Busca e resultado vazio | Digitar `"termoinexistente123"` em `#project-search` e clicar em `Limpar filtros`. | Exibe `0 de 2 projetos`, mostra `#projects-empty` e restaura `2 de 2` ao limpar. | Estado vazio exibido e restaurado com sucesso. | **Aprovado** |
| **T04** | Responsividade (`360px`, `768px`, `1280px`) | Redimensionar viewport para `360`, `768` e `1280` e checar `scrollWidth <= innerWidth`. | Zero overflow horizontal nas três larguras. | `true` para `360`, `768` e `1280`. | **Aprovado** |
| **T05** | Zoom de `200%` | Testar viewport equivalente `640x400` (`1280x800` a 200%). | Zero overflow horizontal e layout legível. | `zoom200NoOverflow: true`. | **Aprovado** |
| **T06** | Navegação por teclado | Focar `#contact-nome` e pressionar `Tab`. | Foco move para `#contact-email` com anel de foco visível. | `activeElement.id === "contact-email"`. | **Aprovado** |
| **T07** | Validação e foco no 1º inválido | Submeter formulário vazio clicando em `#contact-submit`. | Mensagens específicas por campo e foco movido para `#contact-nome`. | Foco em `#contact-nome`, erros exibidos. | **Aprovado** |
| **T08** | Campo condicional `Outro` | Selecionar `Outro` em `#contact-motivo` e depois trocar para `Dúvida acadêmica`. | Exibe `#outro-motivo-group` ao selecionar `Outro` e oculta ao trocar. | `outroVisible: true`, `outroHidden: true`. | **Aprovado** |
| **T09** | Contador de caracteres | Preencher `#contact-mensagem` com texto de 40 caracteres. | Atualizar contador para `40 / 500 caracteres`. | Texto exibido: `40 / 500 caracteres`. | **Aprovado** |
| **T10** | Fluxo de falha seguida de sucesso | Submeter com `Simular falha`, verificar preservação dos dados, mudar para `Simular sucesso` e reenviar. | Na falha: preserva nome/campos e exibe erro. No sucesso: confirma envio simulado sem e-mail real. | Nome preservado (`Ícaro Furtado`), erro e sucesso confirmados. | **Aprovado** |
| **T11** | Prevenção de submissões duplicadas | Submeter formulário válido e checar botão durante os `700ms` de processamento. | Botão `disabled` e `aria-busy="true"` durante o envio. | `disabledDuringSubmit: true`, `aria-busy: "true"`. | **Aprovado** |
| **T12** | *(Adicional)* Menu mobile: clique fora e `Escape` | Em `360px`, abrir menu, clicar fora (`y=500`), reabrir e pressionar `Escape`. | Fecha no clique externo e no `Escape`, retornando foco para `#nav-toggle`. | `openState: "true"`, `closedByOutside: "false"`, `closedByEsc: "false"`, foco em `nav-toggle`. | **Aprovado** |
| **T13** | *(Adicional)* Limpeza de erro ao corrigir campo | Após erro em `#contact-nome`, preencher valor válido. | `aria-invalid` atualizado automaticamente para `"false"`. | `nomeInvalidAfterFix: "false"`. | **Aprovado** |

---

## 2. Funcionamento do Formulário de Contato

1. **Validação em camadas (`js/validation.js`):**
   - `nome`: obrigatório, entre `3` e `100` caracteres.
   - `email`: obrigatório, formato `nome@dominio.ext`, máximo `120` caracteres.
   - `motivo`: obrigatório (`Dúvida acadêmica`, `Proposta de projeto`, `Feedback técnico` ou `Outro`).
   - `outroMotivo`: obrigatório apenas quando `motivo === "Outro"`, entre `3` e `80` caracteres; ocultado e limpo automaticamente quando outra opção é escolhida.
   - `mensagem`: obrigatório, entre `10` e `500` caracteres, com contador dinâmico em tempo real.
2. **Acessibilidade e Foco:**
   - O formulário usa `novalidate` para substituir balões nativos por mensagens consistentes com `role="alert"` e `aria-describedby`.
   - Ao falhar a validação, o foco é movido programaticamente para o primeiro campo inválido.
3. **Prevenção de Duplicidade e Simulação Assíncrona:**
   - A flag `isSubmitting` bloqueia novos envios enquanto `simulateAsyncSubmission()` aguarda `700ms`.
   - O botão recebe `disabled = true` e `aria-busy="true"`.
   - O seletor determinístico permite testar tanto o cenário de sucesso quanto o de falha (com preservação integral dos dados preenchidos).
   - Um aviso explícito informa que **nenhum e-mail real é enviado**.

---

## 3. Limitações Conhecidas

- **Ausência de back-end real:** O envio do formulário é uma simulação assíncrona determinística no navegador; nenhuma mensagem é transmitida para servidor ou caixa de entrada real.
- **Links externos dos projetos:** Os projetos **TerraQuant** e **AgroCota** permanecem sem `demoUrl` e `repoUrl` vinculados até confirmação oficial das URLs públicas.
- **Revisão cruzada:** O modelo de revisão cruzada foi preparado em `docs/revisao-cruzada-modelo.md` e aguarda preenchimento por um colega da turma.
