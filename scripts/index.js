import { initialCards } from './initial-cards.js';
import * as validate from './validate.js';

/*Variables*/

const page = document.querySelector('.page');

const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.profile__add-button');

const profileName = page.querySelector('.profile__name');
const profileJob = page.querySelector('.profile__job');

const profileFormElement = page.querySelector('#profile-form');
const addPlaceFormElement = page.querySelector('#add-place-form');

const inputName = page.querySelector('#input-name');
const inputJob = page.querySelector('#input-job');

const inputPlaceName = page.querySelector('#input-place-name');
const inputPlaceLink = page.querySelector('#input-place-link');

const profilePopup = page.querySelector('.popup_type_profile');
const addPlacePopup = page.querySelector('.popup_type_add-place');
const cardReviewPopup = page.querySelector('.popup_type_card-review');
const popups = page.querySelectorAll('.popup');

const cardReviewImg = page.querySelector('.card-review__img');
const cardReviewTitle = page.querySelector('.card-review__title');

const cardTemplate = page.querySelector('#card').content.querySelector('.card');
const cardsListElement = page.querySelector('.cards__list');

/*Function's declaration*/

const fillInputFields = function () {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('mousedown', checkOverlayClick);
  document.removeEventListener('keydown', closeByPressingEscape);
};

const checkOverlayClick = function (evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.target === openedPopup) {
    closePopup(openedPopup);
  }
};

const closeByPressingEscape = function (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('mousedown', checkOverlayClick);
  document.addEventListener('keydown', closeByPressingEscape);
}

const toggleLikeButton = function (evt) {
  const eventTarget = evt.target;
  console.log(eventTarget);
  eventTarget.classList.toggle('card__like-button_active');
}

const createPlaceElement = function (item) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardElementTitle = cardElement.querySelector('.card__title');
  const cardElementImg = cardElement.querySelector('.card__img');
  const likeButton = cardElement.querySelector('.card__like-button');
  const trashButton = cardElement.querySelector('.card__trash-button');

  cardElementTitle.textContent = item.name;
  cardElementImg.src = item.link;
  cardElementImg.alt = item.name;

  likeButton.addEventListener('click', toggleLikeButton);
  trashButton.addEventListener('click', removePlaceElement);
  cardElementImg.addEventListener('click', openCardReview);

  return cardElement;
}

const removePlaceElement = function (evt) {
  const eventTarget = evt.target;
  eventTarget.closest('.card').remove();
};

const openCardReview = function (evt) {
  const eventTarget = evt.target;
  cardReviewImg.src = eventTarget.src;
  cardReviewImg.alt = eventTarget.alt;
  const cardTitle = eventTarget.closest('.card').querySelector('.card__title');
  cardReviewTitle.textContent = cardTitle.textContent;
  openPopup(cardReviewPopup);
}

const handleProfileFormSubmit = function () {
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;

  closePopup(profilePopup);
}

const handleAddPlaceFormSubmit = function (evt) {
  const item = {
    name: inputPlaceName.value,
    link: inputPlaceLink.value
  };

  const newCardElement = createPlaceElement(item);
  cardsListElement.prepend(newCardElement);
  closePopup(addPlacePopup);
  evt.target.reset();
}

const checkInputsValidity = function (formElement) {

  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__submit-button');

  validate.toggleButtonState(inputList, buttonElement, validate.validationSettings);
};

const checkFormValidity = function (formElement) {

  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__submit-button');

  if (!(validate.hasInvalidInput(inputList))) {
    inputList.forEach(inputElement => {
      validate.hideInputError(formElement, inputElement, validate.validationSettings);
      validate.activateButtonElement(buttonElement, validate.validationSettings);
    });
  }
}

/*Global event-listeners*/

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
addPlaceFormElement.addEventListener('submit', handleAddPlaceFormSubmit);

/*Cycles*/

initialCards.forEach(function (element) {
  const newCardElement = createPlaceElement(element);
  cardsListElement.prepend(newCardElement);
});

popups.forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {

    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }

    if (evt.target.classList.contains('close-button')) {
      closePopup(popup);
    }

  });
});

editButton.addEventListener('click', () => {
  fillInputFields();
  checkFormValidity(profileFormElement);
  openPopup(profilePopup);
});

addButton.addEventListener('click', () => {
  checkInputsValidity(addPlaceFormElement);
  openPopup(addPlacePopup);
});

/*Validation*/

fillInputFields();
validate.enableValidation(validate.validationSettings);
