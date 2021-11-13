export default class Card {
  constructor({data, handleCardClick}, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._description = data.alt;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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

  _pressLike() {
    this._cardElementLike.classList.toggle('elements__like-button_active');
  }

  _deleteCard() {
    this._cardElement.remove();
  }

  _setEventListeners() {
    this._cardElementLike.addEventListener('click', () => {
      this._pressLike();
    });
    this._cardElementDelete.addEventListener('click', () => {
      this._deleteCard();
    });
    this._cardElementPhoto.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link, this._description);
    });
  }
}