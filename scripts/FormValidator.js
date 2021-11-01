export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_state_invalid",
};

export class FormValidator {
  constructor(validationConfig, formElement) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    this._submitButton = formElement.querySelector(validationConfig.submitButtonSelector);
  }

  _showError(errorElement, inputElement) {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._inputErrorClass);
  }

  _hideError(errorElement, inputElement) {
    errorElement.textContent = " ";
    inputElement.classList.remove(this._inputErrorClass);
  }

  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      this._showError(errorElement, inputElement);
    } else {
      this._hideError(errorElement, inputElement);
    }
  }

  _toggleButtonState(button, isActive) {
    if (isActive) {
      button.classList.remove(this._inactiveButtonClass);
      button.removeAttribute("disabled");
    } else {
      button.classList.add(this._inactiveButtonClass);
      button.setAttribute("disabled", "true");
    }
  };

  _setEventListeners() {
    const inputList = this._formElement.querySelectorAll(this._inputSelector);
    const submitButton = this._formElement.querySelector(this._submitButtonSelector);
    const isFormValid = this._formElement.checkValidity();
    this._toggleButtonState(submitButton, isFormValid);
    Array.from(inputList).forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        const isFormValid = this._formElement.checkValidity();
        this._checkInputValidity(inputElement);
        this._toggleButtonState(submitButton, isFormValid);
      });
    });
  };

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    this._hideError(inputElement, errorElement);
    });
  }
}
