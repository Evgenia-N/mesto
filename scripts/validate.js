const showError = (errorElement, inputElement) => {
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add("popup__input_state_invalid");
}

const hideError = (errorElement, inputElement) => {
  errorElement.textContent = " ";
  inputElement.classList.remove("popup__input_state_invalid");
}

const checkInputValidity = (formElement, inputElement) => {
  const isInputNotValid = !inputElement.validity.valid;
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  if (isInputNotValid) {
    showError(errorElement, inputElement);
  }
  else {
    hideError(errorElement, inputElement);
  }
}

const setEventListeners = (formElement) => {
  const inputList = formElement.querySelectorAll(".popup__input");

  Array.from(inputList).forEach(inputElement => {
    inputElement.addEventListener("input", (evt) => {
      checkInputValidity(formElement, inputElement);
    })
  })
  formElement.addEventListener ("submit", (evt) => {
    evt.preventDefault();
})
}

const enableValidation = () => {
  const forms = document.querySelectorAll(".popup__form");
  Array.from(forms).forEach(formElement => {
    setEventListeners(formElement);
  })
}

enableValidation();
