/**
 * Módulo de validação pura para o formulário de contato.
 * Cada função retorna string vazia ("") quando válido ou a mensagem
 * de erro específica quando inválido.
 */
window.PortfolioApp = window.PortfolioApp || {};

window.PortfolioApp.Validation = (() => {
  const LIMITS = {
    nomeMin: 3,
    nomeMax: 100,
    emailMax: 120,
    outroMin: 3,
    outroMax: 80,
    mensagemMin: 10,
    mensagemMax: 500
  };

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function validateNome(value) {
    const trimmed = String(value || "").trim();
    if (!trimmed) {
      return "Informe seu nome completo.";
    }
    if (trimmed.length < LIMITS.nomeMin) {
      return `O nome deve ter pelo menos ${LIMITS.nomeMin} caracteres.`;
    }
    if (trimmed.length > LIMITS.nomeMax) {
      return `O nome deve ter no máximo ${LIMITS.nomeMax} caracteres.`;
    }
    return "";
  }

  function validateEmail(value) {
    const trimmed = String(value || "").trim();
    if (!trimmed) {
      return "Informe seu endereço de e-mail.";
    }
    if (trimmed.length > LIMITS.emailMax) {
      return `O e-mail deve ter no máximo ${LIMITS.emailMax} caracteres.`;
    }
    if (!EMAIL_REGEX.test(trimmed)) {
      return "Informe um e-mail válido (ex.: nome@dominio.com).";
    }
    return "";
  }

  function validateMotivo(value) {
    const trimmed = String(value || "").trim();
    if (!trimmed) {
      return "Selecione o motivo do contato.";
    }
    return "";
  }

  function validateOutroMotivo(value, motivo) {
    if (motivo !== "Outro") {
      return "";
    }
    const trimmed = String(value || "").trim();
    if (!trimmed) {
      return "Especifique o motivo do contato ao selecionar 'Outro'.";
    }
    if (trimmed.length < LIMITS.outroMin) {
      return `A especificação deve ter pelo menos ${LIMITS.outroMin} caracteres.`;
    }
    if (trimmed.length > LIMITS.outroMax) {
      return `A especificação deve ter no máximo ${LIMITS.outroMax} caracteres.`;
    }
    return "";
  }

  function validateMensagem(value) {
    const trimmed = String(value || "").trim();
    if (!trimmed) {
      return "Escreva uma mensagem antes de enviar.";
    }
    if (trimmed.length < LIMITS.mensagemMin) {
      return `A mensagem deve ter pelo menos ${LIMITS.mensagemMin} caracteres.`;
    }
    if (trimmed.length > LIMITS.mensagemMax) {
      return `A mensagem deve ter no máximo ${LIMITS.mensagemMax} caracteres.`;
    }
    return "";
  }

  function validateAll(fields) {
    return {
      nome: validateNome(fields.nome),
      email: validateEmail(fields.email),
      motivo: validateMotivo(fields.motivo),
      outroMotivo: validateOutroMotivo(fields.outroMotivo, fields.motivo),
      mensagem: validateMensagem(fields.mensagem)
    };
  }

  return {
    LIMITS,
    validateNome,
    validateEmail,
    validateMotivo,
    validateOutroMotivo,
    validateMensagem,
    validateAll
  };
})();
