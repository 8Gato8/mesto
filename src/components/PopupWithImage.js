import { Popup } from './Popup.js';
import { cardReviewSelector, cardReviewTitleSelector, cardReviewImgSelector, } from '../utils/constants.js';

export class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);

    this._cardsContainer = this._popup.querySelector(cardReviewSelector);
    this._imageTitle = this._cardsContainer.querySelector(cardReviewTitleSelector);
    this._image = this._cardsContainer.querySelector(cardReviewImgSelector);
  }

  open({ name, link }) {

    this._image.src = link;
    this._image.alt = name;
    this._imageTitle.textContent = name;

    super.open();
  }
}
