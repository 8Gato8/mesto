/* Помещение всех нужных объектов в переменные */

let page = document.querySelector('.page');

let pageProfile = page.querySelector('.page__profile');

let popup = page.querySelector('.popup');

let editButton = pageProfile.querySelector('.profile__edit-button');

let formElement = popup.querySelector('.form');

let closeButton = formElement.querySelector('.form__close-button');

let profileInputName = formElement.querySelector('#input-name');
let profileInputJob = formElement.querySelector('#input-job');


let profileName = pageProfile.querySelector('.profile__name');
let profileJob = pageProfile.querySelector('.profile__job');


/*Функции*/

function getPopupVisible() {
  profileInputName.value = profileName.textContent;
  profileInputJob.value = profileJob.textContent;
  popup.classList.add('popup_opened');
}

function getPopupInvisible() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = profileInputName.value;
  profileJob.textContent = profileInputJob.value;

  getPopupInvisible();
}

/*Слушатели событий*/

editButton.addEventListener('click', getPopupVisible);
closeButton.addEventListener('click', getPopupInvisible);
formElement.addEventListener('submit', formSubmitHandler);
