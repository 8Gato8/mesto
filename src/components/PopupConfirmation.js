import { PopupWithForm } from './PopupWithForm.js';

export class PopupConfirmation extends PopupWithForm {

  constructor(popupSelector, { handleFormSubmit }) {

    super(popupSelector, { handleFormSubmit });
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleFormSubmit();
    });
  }
}
