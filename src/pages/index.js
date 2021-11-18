import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
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
  initialCards
} from "../utils/constants.js";

import "./index.css";

const editProfileFormValidator = new FormValidator(validationConfig, popupEditProfileForm);
const addImageFormValidator = new FormValidator(validationConfig, popupAddImageForm);

const userInfo = new UserInfo({nameElem: profileName, jobElem: profileJob});
const popupWithImage = new PopupWithImage(popupFullscreenImage);

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
      handleCardClick: (place, link, alt) => {
        popupWithImage.openPopup();
        popupCaption.textContent = place;
        popupImage.src = link;
        popupImage.alt = alt || place;
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
  popup: popupEditProfile,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data.name, data['about-self']);
    editProfilePopup.closePopup();
  },
});

const addCardPopup = new PopupWithForm({
  popup: popupAddImage,
  handleFormSubmit: (data) => {
    const newCard = addNewCard(data);
    cards.addItem(newCard);
    addCardPopup.closePopup();
  },
});

editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();

cards.renderItems();
popupWithImage.setEventListeners();
userInfo.setUserInfo(nameInput.value, jobInput.value);

editProfileFormValidator.enableValidation();
addImageFormValidator.enableValidation();

popupEditProfileOpenBtn.addEventListener("click", openProfile);
popupAddImageOpenBtn.addEventListener("click", openCard);
