import Popup from '../components/Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  } 

  openPopup() {
    super.openPopup();
  }

  closePopup() {
    super.closePopup();
    this._element.reset();
  }

  _handleEscClose(evt) {
    super._handleEscClose(evt);
  }

  setEventListeners() {
    super.setEventListeners();
    this._handleFormSubmit(this._getInputValues());
    this._popupSelector.addEventListener("submit", handleFormSubmit(this._getInputValues()));
    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
  }
}