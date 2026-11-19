/**
 * Dados dos projetos exibidos no portfólio (V1).
 *
 * Cada item segue um contrato fixo para facilitar a renderização dinâmica
 * e a futura inclusão de filtros acessíveis nas etapas seguintes.
 * Links não confirmados permanecem como `null` para evitar URLs simuladas.
 */
const PROJECTS_DATA = [
  {
    id: "terraquant",
    nome: "TerraQuant",
    descricao:
      "Plataforma web voltada a simulações e cálculos aplicados ao contexto do agronegócio.",
    problema:
      "Centralizar e organizar cálculos e simulações operacionais do setor agrícola em uma interface web clara.",
    publicoAlvo:
      "Produtores, consultores e profissionais envolvidos em planejamento no agronegócio.",
    contribuicao:
      "Estruturação de interface web e organização visual dos fluxos de simulação no front-end.",
    tecnologias: ["Aplicação Web", "Simulações e Cálculos", "Agronegócio"],
    imagem: "assets/images/terraquant-preview.svg",
    imagemAlt: "Prévia ilustrativa da plataforma TerraQuant com gráfico conceitual de simulação",
    demoUrl: null,
    repoUrl: null
  },
  {
    id: "agrocota",
    nome: "AgroCota",
    descricao:
      "Sistema web com funcionalidades relacionadas à gestão e análise no setor agro.",
    problema:
      "Apoiar a visualização e a organização de dados de gestão e análise operacional no setor agropecuário.",
    publicoAlvo:
      "Gestores, produtores e equipes que atuam na administração de atividades no setor agro.",
    contribuicao:
      "Desenvolvimento de interface web e estruturação das telas voltadas à gestão e análise.",
    tecnologias: ["Sistema Web", "Gestão e Análise", "Setor Agro"],
    imagem: "assets/images/agrocota-preview.svg",
    imagemAlt: "Prévia ilustrativa do sistema AgroCota com painéis conceituais de análise",
    demoUrl: null,
    repoUrl: null
  }
];
