import { cardReviewImg, cardReviewPopup, cardReviewTitle, cardElementClassSelector, cardImgSelector, cardTitleSelector, cardLikeButtonSelector, cardLikeButtonActiveClass, cardTrashButtonSelector } from './constants.js';

import { openPopup } from '../src/index.js';

export class Card {

  constructor(data, selector) {

    this._name = data.name;
    this._link = data.link;
    this._alt = data.name;
    this._selector = selector;
  }

  _getTemplate() {

    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector(cardElementClassSelector)
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {

    this._element = this._getTemplate();

    this._setEventListeners();

    this._element.querySelector(cardImgSelector).src = this._link;
    this._element.querySelector(cardTitleSelector).textContent = this._name;
    this._element.querySelector(cardImgSelector).alt = this._alt;

    return this._element;
  }

  _setEventListeners() {

    this._element.querySelector(cardLikeButtonSelector).addEventListener('click', () => {
      this._toggleLikeButton();
    })

    this._element.querySelector(cardTrashButtonSelector).addEventListener('click', () => {
      this._removePlaceElement();
    })

    this._element.querySelector(cardImgSelector).addEventListener('click', () => {
      this._openCardReview();
    })
  }

  _toggleLikeButton() {

    this._element.querySelector(cardLikeButtonSelector).classList.toggle(cardLikeButtonActiveClass);
  }

  _removePlaceElement() {

    this._element.remove();
  }

  _openCardReview() {

    cardReviewImg.src = this._link;
    cardReviewImg.alt = this._alt;
    cardReviewTitle.textContent = this._name;
    openPopup(cardReviewPopup);
  }
}


