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
    this._cardImage = this._element.querySelector(cardImgSelector);
    this._cardTitle = this._element.querySelector(cardTitleSelector);
    this._cardLikeCounter = this._element.querySelector(cardLikeCounterSelector);
    this._cardLikeButton = this._element.querySelector(cardLikeButtonSelector);
    this._cardTrashButton = this._element.querySelector(cardTrashButtonSelector);


    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._alt;
    this.setLikeCounter();

    this._setEventListeners();

    return this._element;
  }

  checkLikeStatus() {
    return this._likes.some(item => item._id === this._userId)
  }

  setLikeCounter() {
    this._cardLikeCounter.textContent = this._likes.length;
  }

  _setEventListeners() {

    this._cardLikeButton.addEventListener('click', () => {
      this._handleLikeClick(this);
    })

    if (this._amIOwner) {

      this._cardTrashButton.addEventListener('click', () => {
        this._handleTrashButtonClick(this);
      })
    }

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    })
  }

  toggleLikeButton() {
    this._cardLikeButton.classList.toggle(cardLikeButtonActiveClass);
  }

  removePlaceElement() {
    this._element.remove();
  }
}


