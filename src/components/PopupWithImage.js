import Popup from '../components/Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupCaption = this._popup.querySelector(".popup__caption");
  }
  
  openPopup() {
    this._popupCaption.textContent = this._name;
    this._popupImage.src = this._link;
    this._popupImage.alt = this._alt || this._name;
    super.openPopup();
  }
}