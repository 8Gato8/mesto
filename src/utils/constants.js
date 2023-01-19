export const initialCards = [
  {
    place: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    place: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    place: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    place: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    place: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    place: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const page = document.querySelector('.page');

export const editButton = page.querySelector('.profile__edit-button');
export const addButton = page.querySelector('.profile__add-button');
export const closeButtonClass = ('close-button');
export const closeButtonSelector = ('.close-button');

export const profileNameSelector = ('.profile__name');
export const profileJobSelector = ('.profile__job');

export const profileFormId = ('#profile-form');
export const addPlaceFormId = ('#add-place-form');

export const inputSelector = ('.form__input');
export const submitButtonSelector = ('.form__submit-button');
export const inactiveButtonClass = ('form__submit-button_disabled');
export const inputErrorClass = ('form__input_type_error');
export const errorClass = ('form__input-error_visible');


export const cardsList = page.querySelector('.cards__list');
export const cardsListSelector = ('.cards__list');

export const cardElementIdSelector = ('#card');
export const cardElementClassSelector = ('.card');
export const cardImgSelector = ('.card__img');
export const cardTitleSelector = ('.card__title');
export const cardLikeButtonSelector = ('.card__like-button');
export const cardLikeButtonActiveClass = ('card__like-button_active');
export const cardTrashButtonSelector = ('.card__trash-button');

export const inputName = page.querySelector('#input-name');
export const inputJob = page.querySelector('#input-job');

export const profilePopupSelector = ('.popup_type_profile');
export const addPlacePopupSelector = ('.popup_type_add-place');
export const cardReviewPopupSelector = ('.popup_type_card-review');

export const openedPopupClass = ('popup_opened');
export const formSelector = ('.form');

export const cardReviewSelector = ('.card-review');
export const cardReviewImgSelector = ('.card-review__img');
export const cardReviewTitleSelector = ('.card-review__title');

export const escapeString = 'Escape';

export const formValidationSettings = {

  formSelector: profileFormId ?? addPlaceFormId,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
};
