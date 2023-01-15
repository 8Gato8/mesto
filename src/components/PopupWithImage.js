import { Popup } from './Popup.js';

class PopupWithImage extends Popup {

  constructor({ name, link }, popupSelector) {
    super(popupSelector);

    this._cardsContainer = super._popup.querySelector('.card-review');
    this._image = this._cardsContainer.querySelector('.card-review__img');
    this._image.src = link;
    this._image.alt = name;
    this._image.textContent = name;
  }

  open() {
    this._cardsContainer.prepend(this._image);
    super.open();
  }
}
