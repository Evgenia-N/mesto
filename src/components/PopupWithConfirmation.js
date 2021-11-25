import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popup, { confirmDelete }) {
    super(popup);
    this._confirmDelete = confirmDelete;
    this._form = this._popup.querySelector('.popup__form');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._confirmDelete(this._cardId, this._card);
    })
  }

  openPopup(cardId, card) {
    super.openPopup();
    this._cardId = cardId;
    this._card = card;
  }
}