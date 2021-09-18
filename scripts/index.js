let popup = document.querySelector(".popup");
let popupOpen = document.querySelector(".profile__edit-button");
let popupClose = popup.querySelector(".popup__close-button");
let formElement = document.querySelector(".popup__form");
let profName = document.querySelector(".profile__title");
let profJob = document.querySelector(".profile__subtitle");
let nameInput = formElement.querySelector(".popup__input_type_name");
let jobInput = formElement.querySelector(".popup__input_type_about-self");

function clickOverlay(event) {
  if (event.target === event.currentTarget) {
    popupToggle();
  }
}

function popupToggle() {
  if (popup.classList.contains("popup_opened") === false) {
    popup.classList.add("popup_opened");
    nameInput.value = profName.textContent;
    jobInput.value = profJob.textContent;
  } else {
    popup.classList.remove("popup_opened");
  }
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profName.textContent = nameInput.value;
  profJob.textContent = jobInput.value;
  popupToggle();
}

popup.addEventListener("click", clickOverlay);
popupOpen.addEventListener("click", popupToggle);
popupClose.addEventListener("click", popupToggle);
formElement.addEventListener("submit", formSubmitHandler);
