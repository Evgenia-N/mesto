import Popup from '../components/Popup.js'
import { profileName, profileJob, nameInput, jobInput } from '../pages/index.js'

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupSelector.querySelector(".popup__form");
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
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent; 
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }

  _handleEscClose(evt) {
    super._handleEscClose(evt);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    })
  }
}