/*Variables*/

const page = document.querySelector('.page');

const pageProfile = page.querySelector('.page__profile');

const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.profile__add-button');

const profileName = page.querySelector('.profile__name');
const profileJob = page.querySelector('.profile__job');

const popups = page.querySelectorAll('.popup');
const formElements = page.querySelectorAll('.form');
const closeButtons = page.querySelectorAll('.form__close-button');

const inputName = page.querySelector('#input-name');
const inputJob = page.querySelector('#input-job');

const inputPlaceName = page.querySelector('#input-place-name');
const inputPlaceLink = page.querySelector('#input-place-link');

const profilePopup = page.querySelector('.profile-popup');
const addPlacePopup = page.querySelector('.add-place-popup');

const cardReview = page.querySelector('.card-review');
const cardReviewImg = page.querySelector('.card-review__img');
const cardReviewTitle = page.querySelector('.card-review__title');
const cardReviewCloseButton = page.querySelector('.card-review__close-button');

/*Card elements and functions*/

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

const cardTemplate = page.querySelector('#card').content;
const cardsListElement = page.querySelector('.cards__list');

const createPlaceElement = function (item) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardElementTitle = cardElement.querySelector('.card__title');
  const cardElementImg = cardElement.querySelector('.card__img');
  const likeButton = cardElement.querySelector('.card__like-button');
  const trashButton = cardElement.querySelector('.card__trash-button');

  cardsListElement.append(cardElement);

  cardElementTitle.textContent = item.name;
  cardElementImg.src = item.link;
  cardElementImg.alt = item.name;

  const toggleLikeButton = function (evt) {
    const eventTarget = evt.target;
    console.log(eventTarget);
    eventTarget.classList.toggle('card__like-button_active');
  }

  const removePlaceElement = function (evt) {
    const eventTarget = evt.target;
    eventTarget.closest('.card').remove();
  };

  const openCardReview = function (evt) {
    const eventTarget = evt.target;
    cardReviewImg.src = eventTarget.src;
    cardReview.alt = eventTarget.alt;
    const cardTitle = eventTarget.closest('.card').querySelector('.card__title');
    cardReviewTitle.textContent = cardTitle.textContent;
    cardReview.classList.add('card-review_opened');
  }

  const closeCardReview = function (evt) {
    const eventTarget = evt.target;
    const card = eventTarget.closest('.card-review');
    card.classList.remove('card-review_opened');
  }

  likeButton.addEventListener('click', toggleLikeButton);
  trashButton.addEventListener('click', removePlaceElement);
  cardElementImg.addEventListener('click', openCardReview);
  cardReviewCloseButton.addEventListener('click', closeCardReview);
}

initialCards.forEach(function (item) {
  createPlaceElement(item);
});


/*Popup's functions*/

const fillInputFields = function () {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

const openPopup = function (evt) {
  let popup;
  if (evt.target === editButton) {
    popup = profilePopup;
    fillInputFields();
  } else {
    popup = addPlacePopup;
  }
  popup.classList.add('popup_opened');
}

const closePopup = function (evt) {
  const eventTarget = evt.target;
  eventTarget.closest('.popup').classList.remove('popup_opened');
}

const profileFormSubmitHandler = function (evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;

  closePopup(evt);
}

const addPlaceFormSubmitHandler = function (evt) {
  evt.preventDefault();

  const item = {
    name: inputPlaceName.value,
    link: inputPlaceLink.value
  };

  createPlaceElement(item);
}

/*Event-listeners*/

editButton.addEventListener('click', openPopup);
addButton.addEventListener('click', openPopup);

closeButtons.forEach(function (element) {
  element.addEventListener('click', closePopup);
});

formElements[0].addEventListener('submit', profileFormSubmitHandler);
formElements[1].addEventListener('submit', addPlaceFormSubmitHandler);
