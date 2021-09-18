let popup = document.querySelector(".popup");
let popupOpenBtn = document.querySelector(".profile__edit-button");
let popupCloseBtn = popup.querySelector(".popup__close-button");
let formElement= document.querySelector(".popup__form");
let profileName = document.querySelector(".profile__title");
let profileJob = document.querySelector(".profile__subtitle");
let nameInput = formElement.querySelector(".popup__input_type_name");
let jobInput = formElement.querySelector(".popup__input_type_about-self");

function popupToggle() {
  if (popup.classList.contains("popup_opened") === false) {
    popup.classList.add("popup_opened");
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  } else {
    popup.classList.remove("popup_opened");
  }
}

popupOpenBtn.addEventListener("click", popupToggle);
popupCloseBtn.addEventListener("click", popupToggle);

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupToggle();
}

formElement.addEventListener("submit", formSubmitHandler);

function clickOverlay(event) {
  if (event.target === event.currentTarget) {
    popupToggle();
  }
}

popup.addEventListener("click", clickOverlay);
