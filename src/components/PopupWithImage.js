import Popup from '../components/Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  
  openPopup() {
    const popupImage = this._popupSelector.querySelector(".popup__image");
    const popupCaption = this._popupSelector.querySelector(".popup__caption");
    popupCaption.textContent = this._name;
    popupImage.src = this._link;
    popupImage.alt = this._alt || this._name;
    super.openPopup();
  }

  closePopup() {
    super.closePopup();
  }

  _handleEscClose(evt) {
    super._handleEscClose(evt);
  }

  setEventListeners() {
    super.setEventListeners();
  }
}