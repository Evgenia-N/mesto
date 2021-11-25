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
  popupEditProfilePic,
  popupEditProfileForm,
  popupEditProfilePicForm,
  popupEditProfilePicBtn,
  popupEditProfileOpenBtn,
  profileName,
  profileJob,
  profilePic,
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
const editProfilePicFormValidator = new FormValidator(validationConfig, popupEditProfilePicForm);
const userInfo = new UserInfo({nameElem: profileName, jobElem: profileJob, avatar: profilePic});
const popupWithImage = new PopupWithImage(popupFullscreenImage);

const api = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-30',
  headers: { 
    authorization: '8449e18b-a7ee-40b0-b102-1a72c02d892b',
    'content-type': "application/json"
  }
})

const getUserInfo = api.getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
  })
  .catch((err) => {
    console.log(`${err}`);
  })
    
const cardsFromServer = api.getCards()
  .then(data => {
    cards.renderItems(data);
  })
  .catch((err) => {
    console.log(`${err}`);
  })
  
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
        confirmDeletionPopup.openPopup(cardId, card);
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

const editProfilePic = () => {
  editProfilePicFormValidator.resetValidation();
  editProfilePicPopup.openPopup();
}

const openCard = () => {
  addImageFormValidator.resetValidation();
  addCardPopup.openPopup();
};

const editProfilePopup = new PopupWithForm({
  popup: popupEditProfile,
  handleFormSubmit: (data) => {
    editProfilePopup.showLoading(true);
    api.editUserInfo(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        editProfilePopup.closePopup();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        editProfilePopup.showLoading(false);
      })
  }
});

const editProfilePicPopup = new PopupWithForm({
  popup: popupEditProfilePic,
  handleFormSubmit: (data) => {
    editProfilePicPopup.showLoading(true);
    api.editProfilePic(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        editProfilePicPopup.closePopup();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        editProfilePicPopup.showLoading(false);
      })
  }
})

const addCardPopup = new PopupWithForm({
  popup: popupAddImage,
  handleFormSubmit: (data) => {
    addCardPopup.showLoading(true);
    api.addCard(data)
      .then((data) => {
        const newCard = addNewCard(data);
        cards.addItem(newCard);
        addCardPopup.closePopup();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        addCardPopup.showLoading(false);
      })
    },
}); 

const confirmDeletionPopup = new PopupWithConfirmation(popupDeleteCard, {
  confirmDelete: (cardId, card) => {
    api.deleteCard(cardId)
      .then((res) => {
        card.remove();
        confirmDeletionPopup.closePopup();
      })
      .catch((err) =>
        console.log(`${err}`))
  }
})

editProfilePopup.setEventListeners();
editProfilePicPopup.setEventListeners();
addCardPopup.setEventListeners();
popupWithImage.setEventListeners();
confirmDeletionPopup.setEventListeners();

editProfileFormValidator.enableValidation();
addImageFormValidator.enableValidation();
editProfilePicFormValidator.enableValidation();

popupEditProfileOpenBtn.addEventListener("click", openProfile);
popupAddImageOpenBtn.addEventListener("click", openCard);
popupEditProfilePicBtn.addEventListener("click", editProfilePic)