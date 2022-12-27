import { Card } from './Card.js';
import { profileFormValidationSettings, addPlaceFormValidationSettings, FormValidator } from './FormValidator.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

/*Variables*/

const page = document.querySelector('.page');

export const editButton = page.querySelector('.profile__edit-button');
export const addButton = page.querySelector('.profile__add-button');

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
export const cardReviewPopup = page.querySelector('.popup_type_card-review');
const popups = page.querySelectorAll('.popup');

const forms = page.querySelectorAll('.form');

export const cardReviewImg = page.querySelector('.card-review__img');
export const cardReviewTitle = page.querySelector('.card-review__title');

/*Function's declaration*/

export const fillInputFields = function () {

  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

const closePopup = function (popup) {

  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscapeKeydown);
};

const handleEscapeKeydown = function (evt) {

  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

export const openPopup = function (popup) {

  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscapeKeydown);
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

  const cardElement = renderCard(item);
  document.querySelector('.cards__list').prepend(cardElement);

  closePopup(addPlacePopup);
  evt.target.reset();
}

const renderCard = item => {

  const card = new Card(item, '#card');
  const cardElement = card.generateCard();

  return cardElement;
}

/*Event-listeners*/

profileFormElement.addEventListener('submit', () => {

  handleProfileFormSubmit();
});

addPlaceFormElement.addEventListener('submit', handleAddPlaceFormSubmit);

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
  openPopup(profilePopup);
});

addButton.addEventListener('click', () => {

  openPopup(addPlacePopup);
});

/*Render Cards*/

const renderCards = (cardsList) => {

  cardsList.forEach(item => {
    const cardElement = renderCard(item);

    page.querySelector('.cards__list').prepend(cardElement);
  });
}

renderCards(initialCards);

/*Validation*/

fillInputFields();

forms.forEach(form => {

  const formElement = (form === profileFormElement)
    ? new FormValidator(profileFormValidationSettings, '#profile-form')
    : new FormValidator(addPlaceFormValidationSettings, '#add-place-form');

  formElement.enableValidation();
});


