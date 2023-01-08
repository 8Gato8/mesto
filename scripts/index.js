import { Card } from './Card.js';

import { FormValidator } from './FormValidator.js';

import { initialCards, page, editButton, addButton, closeButtonClass, profileName, profileJob, profileFormElement, addPlaceFormElement, profileFormSelector, addPlaceFormSelector, inputName, inputJob, inputPlaceName, inputPlaceLink, profilePopup, addPlacePopup, popups, openedPopupClass, openedPopupSelector, forms, escapeString, cardsList, cardElementIdSelector, formValidationSettings } from './constants.js';

/*Function's declaration*/

export const fillInputFields = function () {

  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

const closePopup = function (popup) {

  popup.classList.remove(openedPopupClass);
  document.removeEventListener('keydown', handleEscapeKeydown);
};

const handleEscapeKeydown = function (evt) {

  if (evt.key === escapeString) {
    closePopup(page.querySelector(openedPopupSelector));
  }
}

export const openPopup = function (popup) {
  popup.classList.add(openedPopupClass);
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
  cardsList.prepend(cardElement);

  closePopup(addPlacePopup);
  evt.target.reset();
}

const renderCard = item => {

  const card = new Card(item, cardElementIdSelector);
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

    if (evt.target.classList.contains(openedPopupClass)
      || evt.target.classList.contains(closeButtonClass)) {
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

const renderCards = (listOfCards) => {

  listOfCards.forEach(item => {
    const cardElement = renderCard(item);

    cardsList.prepend(cardElement);
  });
}

renderCards(initialCards);

/*Validation*/

fillInputFields();

forms.forEach(form => {

  const formElement = (form === profileFormElement)
    ? new FormValidator(formValidationSettings, profileFormSelector)
    : new FormValidator(formValidationSettings, addPlaceFormSelector);

  formElement.enableValidation();
});


