import { initialCards } from './initial-cards.js';

/*Variables*/

const page = document.querySelector('.page');

const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.profile__add-button');

const profileName = page.querySelector('.profile__name');
const profileJob = page.querySelector('.profile__job');

const profileFormElement = page.querySelector('#profile-form');
const addPlaceFormElement = page.querySelector('#add-place-form');

const closeButtons = page.querySelectorAll('.close-button');

const inputName = page.querySelector('#input-name');
const inputJob = page.querySelector('#input-job');

const inputPlaceName = page.querySelector('#input-place-name');
const inputPlaceLink = page.querySelector('#input-place-link');

const profilePopup = page.querySelector('.popup_type_profile');
const addPlacePopup = page.querySelector('.popup_type_add-place');
const cardReviewPopup = page.querySelector('.popup_type_card-review');

const cardReviewImg = page.querySelector('.card-review__img');
const cardReviewTitle = page.querySelector('.card-review__title');

const cardTemplate = page.querySelector('#card').content.querySelector('.card');
const cardsListElement = page.querySelector('.cards__list');

/*Function's declaration*/

const openPopup = function (popup) {
  popup.classList.add('popup_opened');
}

const closePopup = function (evt) {
  const eventTarget = evt.target;
  eventTarget.closest('.popup').classList.remove('popup_opened');
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

const fillInputFields = function () {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

const handleProfileFormSubmit = function (evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;

  closePopup(evt);
}

const handleAddPlaceFormSubmit = function (evt) {
  evt.preventDefault();

  const item = {
    name: inputPlaceName.value,
    link: inputPlaceLink.value
  };

  const newCardElement = createPlaceElement(item);
  cardsListElement.prepend(newCardElement);
  closePopup(evt);
  evt.target.reset();
}

/*Global event-listeners*/

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
addPlaceFormElement.addEventListener('submit', handleAddPlaceFormSubmit);

/*Cycles*/

initialCards.forEach(function (item) {
  const newCardElement = createPlaceElement(item);
  cardsListElement.prepend(newCardElement);
});

closeButtons.forEach(function (element) {
  element.addEventListener('click', closePopup);
});

editButton.addEventListener('click', function () {
  openPopup(profilePopup);
  fillInputFields();
});

addButton.addEventListener('click', function () {
  openPopup(addPlacePopup);
});
