import { cardElementClassSelector, cardImgSelector, cardTitleSelector, cardLikeButtonSelector, cardLikeButtonActiveClass, cardTrashButtonSelector } from '../utils/constants.js';

export class Card {

  constructor({ place, link }, { handleCardClick }, selector) {

    this._name = place;
    this._link = link;
    this._alt = place;
    this._handleCardClick = handleCardClick;
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
      this._handleCardClick();
    })
  }

  _toggleLikeButton() {

    this._element.querySelector(cardLikeButtonSelector).classList.toggle(cardLikeButtonActiveClass);
  }

  _removePlaceElement() {

    this._element.remove();
  }
}


