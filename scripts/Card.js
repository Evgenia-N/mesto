export default class Card {
  constructor(data, cardSelector, openPopup) {
    this._name = data.name;
    this._link = data.link;
    this._description = data.alt;
    this._cardSelector = cardSelector;
    this._openPopup = openPopup;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content.querySelector('.elements__card').cloneNode(true);
    return cardTemplate;
  }
  
  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardElementName = this._cardElement.querySelector('.elements__title');
    this._cardElementPhoto = this._cardElement.querySelector('.elements__photo');
    this._cardElementLike = this._cardElement.querySelector('.elements__like-button');
    this._cardElementDelete = this._cardElement.querySelector('.elements__delete-button');
    this._setEventListeners();
    this._cardElementName.textContent = this._name;
    this._cardElementPhoto.src = this._link;
    this._cardElementPhoto.alt = this._description || this._name;
    return this._cardElement;
  }

  _setEventListeners() {
    this._cardElementLike.addEventListener('click', () => {
      this._pressLike();
    });
    this._cardElementDelete.addEventListener('click', () => {
      this._deleteCard();
    });
    this._cardElementPhoto.addEventListener('click', () => {
      this._openPopupFullscreen(this._name, this._link, this._description);
    });
  }

  _pressLike() {
    this._cardElementLike.classList.toggle('elements__like-button_active');
  }

  _deleteCard() {
    this._cardElement.remove();
  }

  _openPopupFullscreen() {
    const popupFullscreenImage = document.querySelector(".popup_type_fullscreen");
    const popupImage = document.querySelector(".popup__image");
    const popupCaption = document.querySelector(".popup__caption");
    popupImage.src = this._link;
    popupImage.alt = this._description || this._name;
    popupCaption.textContent = this._name;
    this._openPopup(popupFullscreenImage);
  }
}