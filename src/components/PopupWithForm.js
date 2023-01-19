import { Popup } from './Popup.js';
import { inputSelector, formSelector } from '../utils/constants.js';

export class PopupWithForm extends Popup {

  constructor(popupSelector, { handleFormSubmit }) {

    super(popupSelector);

    this._form = this._popup.querySelector(formSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {

    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());
    });
  }

  _getInputValues() {

    this._inputList = this._form.querySelectorAll(inputSelector);

    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }
}
