import { Popup } from './Popup.js';
import { cardReviewSelector, cardReviewTitleSelector, cardReviewImgSelector, } from './constants.js';

export class PopupWithImage extends Popup {

  constructor({ place, link }, popupSelector) {
    super(popupSelector);

    this._cardsContainer = this._popup.querySelector(cardReviewSelector);
    this._imageTitle = this._cardsContainer.querySelector(cardReviewTitleSelector);
    this._image = this._cardsContainer.querySelector(cardReviewImgSelector);
    this._image.src = link;
    this._image.alt = place;
    this._imageTitle.textContent = place;
  }

  open() {
    this._cardsContainer.prepend(this._image);
    super.open();
  }
}
