# Portfólio Acadêmico — Programação Front-End

Projeto individual desenvolvido para a disciplina de **Programação Front-End**, ministrada pela professora **Daniele Virgens**.

O projeto preserva a base **V1** intacta no histórico do Git (`tag v1.0.0-base`) e evolui na **V2** com auditoria documentada, refatoração modular, filtro acessível de projetos, formulário completo com validação e simulação assíncrona determinística, além de matriz de testes executada em navegador real.

## Stack Obrigatória
- **HTML5 semântico**
- **CSS3 puro** (modularizado em `css/style.css` e `css/responsive.css`)
- **JavaScript Vanilla (ES6+)**

## Estrutura de Arquivos
```text
portfolio-academico/
├── index.html                        # Estrutura semântica principal
├── css/
│   ├── style.css                     # Variáveis de tema, layout, filtros e formulário
│   └── responsive.css                # Media queries para tablets e dispositivos móveis
├── js/
│   ├── data.js                       # Dados estruturados dos projetos (TerraQuant, AgroCota)
│   ├── validation.js                 # Funções puras de validação do formulário
│   ├── projects.js                   # Filtro por categoria, busca, contagem e estado vazio
│   ├── form.js                       # Formulário, campo condicional, contador e simulação
│   └── main.js                       # Inicialização da navegação mobile, módulos e rodapé
├── assets/
│   └── images/
│       ├── favicon.svg
│       ├── terraquant-preview.svg
│       └── agrocota-preview.svg
├── docs/
│   ├── evidencias/                   # Capturas reais de antes (V1) e depois (V2)
│   ├── checklist-auditoria-v1.md
│   ├── auditoria-e-evidencias.md     # Diagnóstico dos 5 problemas reais e refatoração
│   ├── matriz-de-testes.md           # Resultados dos testes T01 a T13 e limitações
│   ├── revisao-cruzada-modelo.md     # Modelo em branco para revisão por colega
│   └── roteiro-apresentacao-5min.md  # Roteiro de defesa técnica em 5 minutos
└── README.md
```

## Como Executar Localmente
```bash
python -m http.server 8124
```
Em seguida, acesse `http://localhost:8124` no navegador. Também é possível abrir `index.html` diretamente.

## Documentação da Disciplina
- [Auditoria, Refatoração e Evidências (Antes/Depois)](docs/auditoria-e-evidencias.md)
- [Matriz de Testes (T01 a T13), Formulário e Limitações](docs/matriz-de-testes.md)
- [Roteiro de Apresentação e Defesa Técnica (5 min)](docs/roteiro-apresentacao-5min.md)
- [Modelo de Revisão Cruzada](docs/revisao-cruzada-modelo.md)
