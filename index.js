/* Помещение всех нужных объектов в переменные */

let page = document.querySelector('.page');

let pageProfile = page.querySelector('.page__profile');

let popup = page.querySelector('.popup');

let editButton = pageProfile.querySelector('.profile__edit-button');

let formElement = popup.querySelector('.form');

let closeButton = formElement.querySelector('.form__close-button');

let profileOwnerName = formElement.querySelector('.form__profile-owner-name');
let profileOwnerOccupation = formElement.querySelector('.form__profile-owner-occupation');


let profileName = pageProfile.querySelector('.profile__name');
let profileAbout = pageProfile.querySelector('.profile__about');


profileOwnerName.value = profileName.textContent;
profileOwnerOccupation.value = profileAbout.textContent;

/*Функции*/

function getPopupVisible() {
  popup.classList.add('page__popup_opened');
}

function getPopupInvisible() {
  popup.classList.remove('page__popup_opened');
  profileOwnerName.value = profileName.textContent;
  profileOwnerOccupation.value = profileAbout.textContent;
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = profileOwnerName.value;
  profileAbout.textContent = profileOwnerOccupation.value;

  getPopupInvisible();
}


/*Слушатели событий*/

editButton.addEventListener('click', getPopupVisible);
closeButton.addEventListener('click', getPopupInvisible);
formElement.addEventListener('submit', formSubmitHandler);
