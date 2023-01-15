export class Popup {

  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('close-button');
  }

  open() {
    this.popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    this.popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  setEventListeners() {

    this._popup.addEventListener('mousedown', (evt) => {

      if (evt.target.classList.contains('popup_opened')
        || evt.target.classList.contains('close-button')) {
        this.close();
      }
    });
  }

  _handleEscClose(evt) {
    if (evt.key === 'Esc') {
      this.close();
    }
  }
}
