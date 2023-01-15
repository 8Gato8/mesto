import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {

  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._form = super._popup.querySelector('.form');
    this._hadleFormSubmit = handleFormSubmit;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('click', this._handleFormSubmit.bind(this));
  }

  _getInputValues() {
    this._inputList = super._popup.querySelectorAll('.form__input');

    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }
}
