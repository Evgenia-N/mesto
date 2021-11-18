import Popup from '../components/Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupCaption = this._popup.querySelector(".popup__caption");
  }
  
  openPopup(name, link, alt) {
    this._popupCaption.textContent = name;
    this._popupImage.src = link;
    this._popupImage.alt = alt || name;
    super.openPopup();
  }
}