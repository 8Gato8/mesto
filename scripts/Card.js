import { cardReviewImg, cardReviewPopup, cardReviewTitle, openPopup } from './index.js';

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
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {

    this._element = this._getTemplate();

    this._setEventListeners();

    this._element.querySelector('.card__img').src = this._link;
    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__img').alt = this._alt;

    return this._element;
  }

  _setEventListeners() {

    this._element.querySelector('.card__like-button').addEventListener('click', () => {
      this._toggleLikeButton();
    })

    this._element.querySelector('.card__trash-button').addEventListener('click', () => {
      this._removePlaceElement();
    })

    this._element.querySelector('.card__img').addEventListener('click', () => {
      this._openCardReview();
    })
  }

  _toggleLikeButton() {

    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
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


