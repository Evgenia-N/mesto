import Card from './Card.js';
import { initialCards } from './cards.js';
import { FormValidator, validationConfig} from './FormValidator.js';

const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupEditProfileForm = popupEditProfile.querySelector(".popup__form");
const popupEditProfileOpenBtn = document.querySelector(".profile__edit-button");
const popupEditProfileCloseBtn = popupEditProfile.querySelector(".popup__close-button");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const nameInput = popupEditProfileForm.querySelector(".popup__input_type_name");
const jobInput = popupEditProfileForm.querySelector(".popup__input_type_about-self");

const elements = document.querySelector(".elements");

const popupAddImage = document.querySelector(".popup_type_add-image");
const popupAddImageForm = popupAddImage.querySelector(".popup__form");
const popupAddImageOpenBtn = document.querySelector(".profile__add-button");
const popupAddImageCloseBtn = popupAddImage.querySelector(".popup__close-button");
const placeInput = popupAddImage.querySelector(".popup__input_type_place");
const urlInput = popupAddImage.querySelector(".popup__input_type_url");
const popupFullscreenImage = document.querySelector(".popup_type_fullscreen");
const popupCloseImageBtn = popupFullscreenImage.querySelector(".popup__close-button");
const editProfileFormValidator = new FormValidator(validationConfig, popupEditProfileForm);
const addImageFormValidator = new FormValidator(validationConfig, popupAddImageForm);
editProfileFormValidator.enableValidation();
addImageFormValidator.enableValidation();

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", pressEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", pressEsc);
}

function openProfile() {
  openPopup(popupEditProfile);
  editProfileFormValidator.resetValidation();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;  
}

function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function openCard() {
  openPopup(popupAddImage);
  addImageFormValidator.resetValidation();
}

function createCard(item) {
  const card = new Card(item, '.card-template', openPopup);
  const cardElement = card.generateCard();
  return cardElement;
}

function addCard(evt) {
  evt.preventDefault();
  const cardName = placeInput.value;
  const cardLink = urlInput.value;
  const newCard = createCard({ name: cardName, link: cardLink });
  elements.prepend(newCard);
  closePopup(popupAddImage);
  evt.target.reset();
}

function addInitialCard(item) {
  const initialCard = createCard(item);
  elements.append(initialCard);
}

function clickOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    const popupActive = document.querySelector(".popup_opened");
    closePopup(popupActive);
  }
}

function pressEsc(evt) {
  if (evt.key === 'Escape') {
    const popupActive = document.querySelector(".popup_opened");
    closePopup(popupActive);
  }
}

initialCards.map(addInitialCard);

popupEditProfileOpenBtn.addEventListener("click", openProfile);
popupEditProfileCloseBtn.addEventListener("click", () => closePopup(popupEditProfile));
popupAddImageOpenBtn.addEventListener("click", openCard);
popupAddImageCloseBtn.addEventListener("click", () => closePopup(popupAddImage));
popupEditProfileForm.addEventListener("submit", submitEditProfileForm);
popupAddImageForm.addEventListener("submit", addCard);
popupCloseImageBtn.addEventListener("click", () => closePopup(popupFullscreenImage));
popupEditProfile.addEventListener("click", clickOverlay);
popupAddImage.addEventListener("click", clickOverlay);
popupFullscreenImage.addEventListener("click", clickOverlay);
