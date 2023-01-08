export const initialCards = [
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

export const page = document.querySelector('.page');

export const editButton = page.querySelector('.profile__edit-button');
export const addButton = page.querySelector('.profile__add-button');
export const closeButtonClass = ('close-button');

export const profileName = page.querySelector('.profile__name');
export const profileJob = page.querySelector('.profile__job');

export const profileFormElement = page.querySelector('#profile-form');
export const addPlaceFormElement = page.querySelector('#add-place-form');
export const profileFormSelector = ('#profile-form');
export const addPlaceFormSelector = ('#add-place-form');

export const inputSelector = ('.form__input');
export const submitButtonSelector = ('.form__submit-button');
export const inactiveButtonClass = ('form__submit-button_disabled');
export const inputErrorClass = ('form__input_type_error');
export const errorClass = ('form__input-error_visible');



export const cardsList = page.querySelector('.cards__list');
export const cardElementIdSelector = ('#card');
export const cardElementClassSelector = ('.card');
export const cardImgSelector = ('.card__img');
export const cardTitleSelector = ('.card__title');
export const cardLikeButtonSelector = ('.card__like-button');
export const cardLikeButtonActiveClass = ('card__like-button_active');
export const cardTrashButtonSelector = ('.card__trash-button');

export const inputName = page.querySelector('#input-name');
export const inputJob = page.querySelector('#input-job');

export const inputPlaceName = page.querySelector('#input-place-name');
export const inputPlaceLink = page.querySelector('#input-place-link');

export const profilePopup = page.querySelector('.popup_type_profile');
export const addPlacePopup = page.querySelector('.popup_type_add-place');
export const cardReviewPopup = page.querySelector('.popup_type_card-review');
export const popups = page.querySelectorAll('.popup');
export const openedPopupClass = ('popup_opened');
export const openedPopupSelector = ('.popup_opened');

export const forms = page.querySelectorAll('.form');

export const cardReviewImg = page.querySelector('.card-review__img');
export const cardReviewTitle = page.querySelector('.card-review__title');

export const escapeString = 'Escape';

export const formValidationSettings = {

  formSelector: profileFormSelector ?? addPlaceFormSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
};
