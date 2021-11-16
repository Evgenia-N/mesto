import Card from '../components/Card.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards } from '../components/cards.js';
import { FormValidator, validationConfig} from '../components/FormValidator.js';
import './index.css';

export { profileName, profileJob, nameInput, jobInput } 

const popups = document.querySelectorAll(".popup")
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupEditProfileForm = popupEditProfile.querySelector(".popup__form");
const popupEditProfileOpenBtn = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const nameInput = popupEditProfileForm.querySelector(".popup__input_type_name");
const jobInput = popupEditProfileForm.querySelector(".popup__input_type_about-self");

const elements = document.querySelector(".elements");

const popupAddImage = document.querySelector(".popup_type_add-image");
const popupAddImageForm = popupAddImage.querySelector(".popup__form");
const popupAddImageOpenBtn = document.querySelector(".profile__add-button");
const placeInput = popupAddImage.querySelector(".popup__input_type_place");
const urlInput = popupAddImage.querySelector(".popup__input_type_url");
const popupFullscreenImage = document.querySelector(".popup_type_fullscreen");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

const editProfileFormValidator = new FormValidator(validationConfig, popupEditProfileForm);
const addImageFormValidator = new FormValidator(validationConfig, popupAddImageForm);
const userInfo = new UserInfo ({nameSelector: profileName, jobSelector: profileJob});
userInfo.setUserInfo(nameInput.value, jobInput.value);

const editProfilePopup = new PopupWithForm (
  {popupSelector: popupEditProfile, 
  handleFormSubmit: () => {
  userInfo.setUserInfo(nameInput.value, jobInput.value);
  editProfilePopup.closePopup();
  }
});

editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm (
  {popupSelector: popupAddImage, 
  handleFormSubmit: () => {
  const card = {name: placeInput.value, link: urlInput.value};
  const newCard = addNewCard(card);
  cards.addItem(newCard);
  addCardPopup.closePopup();
  }
});

addCardPopup.setEventListeners();

const openProfile = () => {
  editProfileFormValidator.resetValidation();
  editProfilePopup.openPopup();
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
}

const openCard = () => {
  addImageFormValidator.resetValidation();
  addCardPopup.openPopup();
}

const addNewCard = (item) => {
  const card = new Card({data: item, handleCardClick: (name, link, alt) => {
    const popupWithImage = new PopupWithImage(popupFullscreenImage);
    popupWithImage.openPopup();
    popupWithImage.setEventListeners();
    popupCaption.textContent = name;
    popupImage.src = link;
    popupImage.alt = alt || name; 
  }}, '.card-template');
  const newCard = card.generateCard();
  return newCard;
};

const cards = new Section({
  data: initialCards.reverse(),
  renderer: (item) => {
    const newCard = addNewCard(item);
    cards.addItem(newCard);
  }},
  '.elements'
);

cards.renderItems();

editProfileFormValidator.enableValidation();
addImageFormValidator.enableValidation();

popupEditProfileOpenBtn.addEventListener("click", openProfile);
popupAddImageOpenBtn.addEventListener("click", openCard);

