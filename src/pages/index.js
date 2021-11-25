import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  FormValidator,
  validationConfig,
} from "../components/FormValidator.js";
import Api from "../components/Api.js";

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
  popupFullscreenImage,
  popupDeleteCard,
} from "../utils/constants.js";

import "./index.css";
let userId;

const editProfileFormValidator = new FormValidator(validationConfig, popupEditProfileForm);
const addImageFormValidator = new FormValidator(validationConfig, popupAddImageForm);
const userInfo = new UserInfo({nameElem: profileName, jobElem: profileJob});
const popupWithImage = new PopupWithImage(popupFullscreenImage);

const popupConfirmDeletion = new PopupWithConfirmation(popupDeleteCard, {
  confirmDelete: (cardId, card) => {
    api.deleteCard(cardId)
      .then((res) => {
        card.deleteCardTemplate();
        popupConfirmDeletion.closePopup();
      })
      .catch((err) =>
        console.log(`Произошла ошибка: ${err}`))
  }
})

popupConfirmDeletion.setEventListeners();

const api = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-30',
  headers: { 
    authorization: '8449e18b-a7ee-40b0-b102-1a72c02d892b',
    'content-type': "application/json"
  }})

  const getUserInfo = api.getUserInfo()
    .then((userData) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    })
    
const cardsFromServer = api.getCards()
  .then(data => {
    console.log(data);
    cards.renderItems(data);
  });

  const cards = new Section(
    { renderer: (item) => {
        const newCard = addNewCard(item);
        cards.addItem(newCard);
      },
    },
    ".elements"
  );

const addNewCard = (data) => {
  const card = new Card(
    {
      data: data,
      userId: userId,
      handleCardClick: (name, link, alt) => {
        popupWithImage.openPopup(name, link, alt);
      },
      handleCardDelete: (cardId, card) => {
        popupConfirmDeletion.open(cardId, card);
      },
    },
    ".card-template", api
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
    console.log(data);
    addCardPopup.showLoading(true);
    api.addCard(data)
      .then((data) => {
        const newCard = addNewCard(data);
        cards.addItem(newCard);
        addCardPopup.closePopup();
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      })
      .finally(() => {
        addCardPopup.showLoading(false);
      })
    },
}); 

editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
popupWithImage.setEventListeners();

editProfileFormValidator.enableValidation();
addImageFormValidator.enableValidation();

popupEditProfileOpenBtn.addEventListener("click", openProfile);
popupAddImageOpenBtn.addEventListener("click", openCard);
