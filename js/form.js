/**
 * Módulo do Formulário de Contato (V2).
 * Implementa validação rigorosa, campo condicional "Outro",
 * contador de caracteres, prevenção de envios simultâneos,
 * foco no primeiro campo inválido e simulação assíncrona determinística.
 */
window.PortfolioApp = window.PortfolioApp || {};

window.PortfolioApp.Form = (() => {
  const SIMULATED_DELAY_MS = 700;

  let isSubmitting = false;
  let form = null;
  let fields = {};
  let errorNodes = {};
  let outroGroup = null;
  let charCounter = null;
  let submitButton = null;
  let statusBanner = null;

  function init() {
    form = document.getElementById("contact-form");
    if (!form) {
      return;
    }

    fields = {
      nome: document.getElementById("contact-nome"),
      email: document.getElementById("contact-email"),
      motivo: document.getElementById("contact-motivo"),
      outroMotivo: document.getElementById("contact-outro-motivo"),
      mensagem: document.getElementById("contact-mensagem")
    };

    errorNodes = {
      nome: document.getElementById("error-nome"),
      email: document.getElementById("error-email"),
      motivo: document.getElementById("error-motivo"),
      outroMotivo: document.getElementById("error-outro-motivo"),
      mensagem: document.getElementById("error-mensagem")
    };

    outroGroup = document.getElementById("outro-motivo-group");
    charCounter = document.getElementById("mensagem-counter");
    submitButton = document.getElementById("contact-submit");
    statusBanner = document.getElementById("form-status");

    bindEvents();
    syncOutroFieldVisibility();
    updateCharCounter();
  }

  function bindEvents() {
    fields.motivo.addEventListener("change", () => {
      syncOutroFieldVisibility();
      validateSingleField("motivo");
    });

    Object.keys(fields).forEach((key) => {
      const input = fields[key];
      if (!input) {
        return;
      }

      input.addEventListener("input", () => {
        if (key === "mensagem") {
          updateCharCounter();
        }
        // Revalida o campo apenas se ele já estiver marcado como inválido
        if (input.getAttribute("aria-invalid") === "true") {
          validateSingleField(key);
        }
      });

      input.addEventListener("blur", () => {
        if (input.value.trim() !== "") {
          validateSingleField(key);
        }
      });
    });

    form.addEventListener("submit", handleSubmit);
  }

  function syncOutroFieldVisibility() {
    const isOutro = fields.motivo.value === "Outro";
    if (!outroGroup) {
      return;
    }

    outroGroup.hidden = !isOutro;
    outroGroup.setAttribute("aria-hidden", String(!isOutro));

    if (!isOutro && fields.outroMotivo) {
      fields.outroMotivo.value = "";
      setFieldError("outroMotivo", "");
    }
  }

  function updateCharCounter() {
    if (!charCounter || !fields.mensagem) {
      return;
    }
    const max = window.PortfolioApp.Validation.LIMITS.mensagemMax;
    const current = fields.mensagem.value.length;
    charCounter.textContent = `${current} / ${max} caracteres`;
    charCounter.classList.toggle("is-near-limit", current >= max - 50 && current <= max);
  }

  function getFieldValues() {
    return {
      nome: fields.nome ? fields.nome.value : "",
      email: fields.email ? fields.email.value : "",
      motivo: fields.motivo ? fields.motivo.value : "",
      outroMotivo: fields.outroMotivo ? fields.outroMotivo.value : "",
      mensagem: fields.mensagem ? fields.mensagem.value : ""
    };
  }

  function validateSingleField(key) {
    const validation = window.PortfolioApp.Validation;
    const values = getFieldValues();
    let errorMessage = "";

    switch (key) {
      case "nome":
        errorMessage = validation.validateNome(values.nome);
        break;
      case "email":
        errorMessage = validation.validateEmail(values.email);
        break;
      case "motivo":
        errorMessage = validation.validateMotivo(values.motivo);
        break;
      case "outroMotivo":
        errorMessage = validation.validateOutroMotivo(values.outroMotivo, values.motivo);
        break;
      case "mensagem":
        errorMessage = validation.validateMensagem(values.mensagem);
        break;
      default:
        break;
    }

    setFieldError(key, errorMessage);
    return errorMessage;
  }

  function setFieldError(key, message) {
    const input = fields[key];
    const errorNode = errorNodes[key];

    if (input) {
      input.setAttribute("aria-invalid", message ? "true" : "false");
    }
    if (errorNode) {
      errorNode.textContent = message;
    }
  }

  function setStatus(type, message) {
    if (!statusBanner) {
      return;
    }
    statusBanner.className = "form-status";
    if (!type) {
      statusBanner.hidden = true;
      statusBanner.textContent = "";
      return;
    }
    statusBanner.hidden = false;
    statusBanner.classList.add(`is-${type}`);
    statusBanner.textContent = message;
  }

  function setProcessingState(processing) {
    isSubmitting = processing;
    if (submitButton) {
      submitButton.disabled = processing;
      submitButton.setAttribute("aria-busy", String(processing));
      submitButton.textContent = processing ? "Processando envio..." : "Enviar mensagem";
    }
  }

  function getSelectedSimulationOutcome() {
    const checked = form.querySelector('input[name="sim-outcome"]:checked');
    return checked ? checked.value : "success";
  }

  function simulateAsyncSubmission(outcome) {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        if (outcome === "error") {
          reject(new Error("Falha simulada na transmissão. Seus dados foram preservados."));
        } else {
          resolve({ status: "ok" });
        }
      }, SIMULATED_DELAY_MS);
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // Previne envios simultâneos caso o usuário clique repetidamente
    if (isSubmitting) {
      return;
    }

    const errors = window.PortfolioApp.Validation.validateAll(getFieldValues());
    const orderedKeys = ["nome", "email", "motivo", "outroMotivo", "mensagem"];
    let firstInvalidKey = null;

    orderedKeys.forEach((key) => {
      const msg = errors[key] || "";
      setFieldError(key, msg);
      if (msg && !firstInvalidKey) {
        firstInvalidKey = key;
      }
    });

    if (firstInvalidKey) {
      setStatus("error", "Revise os campos destacados antes de enviar.");
      if (fields[firstInvalidKey]) {
        fields[firstInvalidKey].focus();
      }
      return;
    }

    setProcessingState(true);
    setStatus("processing", "Processando envio simulado... Aguarde um instante.");

    try {
      const outcome = getSelectedSimulationOutcome();
      await simulateAsyncSubmission(outcome);

      setStatus(
        "success",
        "Simulação concluída com sucesso! Lembrete: nenhum e-mail real foi enviado neste ambiente acadêmico."
      );
      form.reset();
      syncOutroFieldVisibility();
      updateCharCounter();
      orderedKeys.forEach((key) => setFieldError(key, ""));
    } catch (error) {
      // Preserva todos os dados preenchidos em caso de falha para permitir nova tentativa
      setStatus(
        "error",
        `${error.message} Corrija ou altere o modo de simulação e tente novamente.`
      );
    } finally {
      setProcessingState(false);
    }
  }

  return { init };
})();
