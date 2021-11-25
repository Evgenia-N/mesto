export default class Card {
  constructor({data, userId, handleCardClick, handleCardDelete, handleCardLike}, cardSelector, api) {
    this._name = data.name;
    this._link = data.link;
    this._description = data.alt;
    this._cardSelector = cardSelector;
    this._api = api;
    this._userId = userId;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
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
    this._likeCounter = this._cardElement.querySelector('.elements__like-counter');
    this._cardElementDelete = this._cardElement.querySelector('.elements__delete-button');
    this._setEventListeners();
    this._cardElementName.textContent = this._name;
    this._cardElementPhoto.src = this._link;
    this._cardElementPhoto.alt = this._description || this._name;
    this._likeCounter.textContent = this._likes.length;
    this._toggleDeleteButton();
    this._checkUserLike();
    return this._cardElement;
  }

  _deleteCardTemplate() {
    this._cardElement.remove();
    /*this._element = null;*/
  }

  _setEventListeners() {
    this._cardElementLike.addEventListener('click', () => {
      this.handleLikeClick(this);
    });
    this._cardElementDelete.addEventListener('click', () => {
      this._handleCardDelete(this._cardId, this._card);
    });
    this._cardElementPhoto.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link, this._description);
    });
  }
  
  handleLikeClick() {
    if (this._cardElementLike.classList.contains('elements__like-button_active')) {
      this._api.removeLike(this._cardId)
        .then((data) => {
          this._cardElementLike.classList.remove('elements__like-button_active');
          this._likeCounter.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
    } else {
      this._api.addLike(this._cardId)
        .then((data) => {
          this._cardElementLike.classList.add('elements__like-button_active');
          this._likeCounter.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
      })
    }
  }

  _toggleDeleteButton() {
    if (this._ownerId !== this._userId) {
      this._cardElementDelete.classList.add('elements__delete-button_hidden')
    }
    else {
      this._cardElementDelete.classList.remove('elements__delete-button_hidden')
    }
  }

  _checkUserLike() {
    if (this._likes.find((item) => this._userId === item._id)) {
      this._cardElementLike.classList.add('elements__like-button_active');
    }
  }
}