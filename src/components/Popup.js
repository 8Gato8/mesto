import { openedPopupClass, closeButtonClass, closeButtonSelector, escapeString } from './constants.js';

export class Popup {

  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(closeButtonSelector);
  }

  open() {
    this._popup.classList.add(openedPopupClass);
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    this._popup.classList.remove(openedPopupClass);
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
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
