import { cardElementClassSelector, cardImgSelector, cardTitleSelector, cardLikeButtonSelector, cardLikeButtonActiveClass, cardLikeCounterSelector, cardTrashButtonSelector } from '../utils/constants.js';

export class Card {

  constructor({ name, link, likes, owner, _id }, userObj, { handleCardClick, handleTrashButtonClick, handleLikeClick }, selector) {

    this._name = name;
    this._link = link;
    this._alt = name;
    this._likes = likes;
    this._handleCardClick = handleCardClick;
    this._handleTrashButtonClick = handleTrashButtonClick;
    this._handleLikeClick = handleLikeClick;
    this._selector = selector;
    this._ownerId = owner._id;
    this._id = _id;
    this._userId = userObj._id;
    this._amIOwner = (this._ownerId === this._userId);
  }

  _getTemplate() {

    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector(cardElementClassSelector)
      .cloneNode(true);

    if (this._amIOwner) {
      cardElement.insertAdjacentHTML('beforeEnd', '<button class="card__trash-button" type="button"></button>');
    }
    return cardElement;
  }

  generateCard() {

    this._element = this._getTemplate();

    this._setEventListeners();

    this._element.querySelector(cardImgSelector).src = this._link;
    this._element.querySelector(cardTitleSelector).textContent = this._name;
    this._element.querySelector(cardImgSelector).alt = this._alt;
    this.setLikeCounter();

    return this._element;
  }

  checkLikeStatus() {
    return this._likes.some(item => item._id === this._userId)
  }

  setLikeCounter() {
    this._element.querySelector(cardLikeCounterSelector).textContent = this._likes.length;
  }

  _setEventListeners() {

    this._element.querySelector(cardLikeButtonSelector).addEventListener('click', () => {
      this.toggleLikeButton();
      this._handleLikeClick(this);
    })

    if (this._amIOwner) {

      this._element.querySelector(cardTrashButtonSelector).addEventListener('click', () => {
        this._handleTrashButtonClick(this);
      })
    }

    this._element.querySelector(cardImgSelector).addEventListener('click', () => {
      this._handleCardClick();
    })
  }

  toggleLikeButton() {
    this._element.querySelector(cardLikeButtonSelector).classList.toggle(cardLikeButtonActiveClass);
  }

  removePlaceElement() {
    this._element.remove();
  }
}


