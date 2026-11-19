# Portfólio Acadêmico — V1 (Programação Front-End)

Projeto individual desenvolvido para a disciplina de **Programação Front-End**, ministrada pela professora **Daniele Virgens**.

Esta **V1** estabelece a base estrutural, semântica e visual do portfólio, preservada no histórico do Git para permitir auditoria, diagnóstico de problemas reais, refatoração e evolução ao longo das 8 etapas do roteiro da disciplina.

## Stack Obrigatória
- **HTML5 semântico**
- **CSS3 puro** (modularizado em `style.css` e `responsive.css`)
- **JavaScript Vanilla (ES6+)**

## Estrutura de Arquivos
```text
portfolio-academico/
├── index.html                  # Estrutura semântica principal
├── css/
│   ├── style.css               # Variáveis de tema, tipografia, layout e componentes
│   └── responsive.css          # Media queries para tablets e dispositivos móveis
├── js/
│   ├── projects.js             # Array de dados dos projetos (TerraQuant, AgroCota)
│   └── main.js                 # Menu mobile, renderização dos cards e ano do rodapé
├── assets/
│   └── images/
│       ├── terraquant-preview.svg
│       └── agrocota-preview.svg
├── docs/
│   └── checklist-auditoria-v1.md
└── README.md
```

## Como Executar Localmente
1. **Via servidor local (recomendado):**
   ```bash
   npx serve .
   ```
   Ou com Python:
   ```bash
   python -m http.server 8080
   ```
   Em seguida, acesse `http://localhost:8080` no navegador.
2. **Abertura direta:** também é possível abrir `index.html` diretamente no navegador.

## Marco Inicial no Git (Preservação da V1)
Para registrar esta versão como ponto de partida auditável:
```bash
git init
git add .
git commit -m "chore: cria base inicial V1 do portfolio academico"
git tag v1.0.0-base
```
