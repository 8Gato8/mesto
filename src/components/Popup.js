import { openedPopupClass, closeButtonClass, closeButtonSelector, submitButtonSelector, escapeString } from '../utils/constants.js';

export class Popup {

  constructor(popupSelector) {

    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(closeButtonSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this.submitButton = this._popup.querySelector(submitButtonSelector);
  }

  open() {

    this._popup.classList.add(openedPopupClass);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {

    this._popup.classList.remove(openedPopupClass);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {

    this._popup.addEventListener('mousedown', (evt) => {

      if (evt.target.classList.contains(openedPopupClass)
        || evt.target.classList.contains(closeButtonClass)) {
        this.close();
      }
    });
  }

  _handleEscClose(evt) {

    if (evt.key === escapeString) {
      this.close();
    }
  }
}
