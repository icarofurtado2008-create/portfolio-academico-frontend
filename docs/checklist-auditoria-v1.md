# Checklist de Auditoria e Evolução — V1

Documento de apoio para a auditoria técnica e evolução do portfólio acadêmico ao longo das 8 etapas da disciplina de **Programação Front-End** (Profa. Daniele Virgens).

## 1. Escopo concluído na V1
- [x] Estrutura HTML5 semântica (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`)
- [x] Skip link (`Pular para o conteúdo principal`) e foco visível (`:focus-visible`)
- [x] Identidade visual aplicada (`#0F172A`, `#DC143C`, `#D4AF37`)
- [x] Menu responsivo para dispositivos móveis com controle de `aria-expanded` e fechamento por tecla `Escape`
- [x] Seção Hero com posicionamento e CTAs funcionais por âncora
- [x] Seção Sobre mim sem dados fictícios
- [x] Seção Habilidades categorizada e contextualizada
- [x] Seção Projetos alimentada dinamicamente por array JavaScript (`js/projects.js`)
- [x] Seção Contato preparada visualmente para evolução futura

## 2. O que falta implementar nas próximas etapas (conforme roteiro)
- [ ] Diagnóstico formal de 5 problemas reais identificados após testes na V1
- [ ] Registro de evidências de antes e depois (capturas, métricas ou logs)
- [ ] Filtro de projetos com estados acessíveis (`aria-pressed` / `aria-live`)
- [ ] Formulário de contato completo com regras rigorosas de validação
- [ ] Estados visuais de processamento, sucesso e erro no envio do formulário
- [ ] Testes sistemáticos de responsividade em múltiplos viewports
- [ ] Refatoração guiada pelos problemas reais diagnosticados
- [ ] Matriz de testes executada e documentada
- [ ] Revisão cruzada entre pares e consolidação da documentação técnica final

## 3. Pontos de atenção para a auditoria da V1
1. Verificar contraste de cores (WCAG AA) entre textos secundários e fundos `#0F172A` / `#1E293B`.
2. Testar navegação completa apenas via teclado (`Tab`, `Shift+Tab`, `Enter`, `Escape`).
3. Validar comportamento do menu mobile em larguras entre `320px` e `768px`.
4. Confirmar carregamento das imagens locais SVG sem erros no console.
5. Verificar comportamento com `prefers-reduced-motion: reduce` ativado.
6. Confirmar vinculação futura de `demoUrl` e `repoUrl` reais para TerraQuant e AgroCota quando disponíveis.
