const showError = (errorElement, inputElement, config) => {
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(config.inputErrorClass);
};

const hideError = (errorElement, inputElement, config) => {
  errorElement.textContent = " ";
  inputElement.classList.remove(config.inputErrorClass);
};

const checkInputValidity = (formElement, inputElement, config) => {
  const isInputNotValid = !inputElement.validity.valid;
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  if (isInputNotValid) {
    showError(errorElement, inputElement, config);
  } else {
    hideError(errorElement, inputElement, config);
  }
};

const toggleButtonState = (button, isActive, config) => {
  if (isActive) {
    button.classList.remove(config.inactiveButtonClass);
    button.removeAttribute("disabled");
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.setAttribute("disabled", "true");
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const submitButton = formElement.querySelector(config.submitButtonSelector);
  const isFormValid = formElement.checkValidity();
  toggleButtonState(submitButton, isFormValid, config);

  Array.from(inputList).forEach((inputElement) => {
    inputElement.addEventListener("input", (evt) => {
      const isFormValid = formElement.checkValidity();
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(submitButton, isFormValid, config);
    });
  });
  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });
  formElement.addEventListener("reset", (evt) => {
    toggleButtonState(submitButton, isFormValid, config);
  });
};

const enableValidation = (config) => {
  const forms = document.querySelectorAll(config.formSelector);
  Array.from(forms).forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_state_invalid",
};

enableValidation(validationConfig);
