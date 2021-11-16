import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards } from "../components/cards.js";
import {
  FormValidator,
  validationConfig,
} from "../components/FormValidator.js";

import {
  popupEditProfile,
  popupEditProfileForm,
  popupEditProfileOpenBtn,
  profileName,
  profileJob,
  nameInput,
  jobInput,
  popupAddImage,
  popupAddImageForm,
  popupAddImageOpenBtn,
  placeInput,
  urlInput,
  popupFullscreenImage,
  popupImage,
  popupCaption,
} from "../utils/constants.js";

import "./index.css";

const editProfileFormValidator = new FormValidator(validationConfig, popupEditProfileForm);
const addImageFormValidator = new FormValidator(validationConfig, popupAddImageForm);

const userInfo = new UserInfo({nameSelector: profileName, jobSelector: profileJob});

const cards = new Section(
  {
    data: initialCards.reverse(),
    renderer: (item) => {
      const newCard = addNewCard(item);
      cards.addItem(newCard);
    },
  },
  ".elements"
);

const addNewCard = (item) => {
  const card = new Card(
    {
      data: item,
      handleCardClick: (name, link, alt) => {
        const popupWithImage = new PopupWithImage(popupFullscreenImage);
        popupWithImage.openPopup();
        popupWithImage.setEventListeners();
        popupCaption.textContent = name;
        popupImage.src = link;
        popupImage.alt = alt || name;
      },
    },
    ".card-template"
  );
  const newCard = card.generateCard();
  return newCard;
};

const openProfile = () => {
  editProfileFormValidator.resetValidation();
  editProfilePopup.openPopup();
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
};

const openCard = () => {
  addImageFormValidator.resetValidation();
  addCardPopup.openPopup();
};

const editProfilePopup = new PopupWithForm({
  popupSelector: popupEditProfile,
  handleFormSubmit: () => {
    userInfo.setUserInfo(nameInput.value, jobInput.value);
    editProfilePopup.closePopup();
  },
});

const addCardPopup = new PopupWithForm({
  popupSelector: popupAddImage,
  handleFormSubmit: () => {
    const card = { name: placeInput.value, link: urlInput.value };
    const newCard = addNewCard(card);
    cards.addItem(newCard);
    addCardPopup.closePopup();
  },
});

editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();

cards.renderItems();
userInfo.setUserInfo(nameInput.value, jobInput.value);

editProfileFormValidator.enableValidation();
addImageFormValidator.enableValidation();

popupEditProfileOpenBtn.addEventListener("click", openProfile);
popupAddImageOpenBtn.addEventListener("click", openCard);
