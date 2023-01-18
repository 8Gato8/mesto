import './pages/index.css';

import { Card } from './components/Card.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { Section } from './components/Section.js';
import { UserInfo } from './components/UserInfo.js';
import { FormValidator } from './components/FormValidator.js';

import { initialCards, editButton, addButton, profileNameSelector, profileJobSelector, profileFormElement, profileFormId, addPlaceFormId, inputName, inputJob, profilePopupSelector, addPlacePopupSelector, cardReviewPopupSelector, forms, cardsList, cardsListSelector, cardElementIdSelector, formValidationSettings } from './components/constants.js';


const initialCardList = new Section({

  items: initialCards,
  renderer: ({ place, link }) => {

    const newCard = new Card(
      { place, link },
      {
        handleCardClick: () => {
          const cardReviewPopupClass = new PopupWithImage({ place, link }, cardReviewPopupSelector);
          cardReviewPopupClass.setEventListeners();
          cardReviewPopupClass.open();
        }
      },
      cardElementIdSelector
    );
    const newCardElement = newCard.generateCard();

    initialCardList.addItem(newCardElement);
  }
}, cardsListSelector);

initialCardList.renderItems();

const userInfo = new UserInfo({
  userNameSelector: profileNameSelector,
  userJobSelector: profileJobSelector
});


const userInfoRenderer = new Section({
  items: [userInfo.getUserInfo()],
  renderer: ({ name, job }) => {

    inputName.value = name.textContent;
    inputJob.value = job.textContent;
  }
})

const profilePopupClass = new PopupWithForm(
  profilePopupSelector,
  {
    handleFormSubmit: ({ name, job }) => {

      userInfo.setUserInfo({ name, job });
      profilePopupClass.close();
    }
  }
);

const addPlacePopupClass = new PopupWithForm(
  addPlacePopupSelector,
  {
    handleFormSubmit: ({ place, link }) => {

      const newCard = new Card(
        { place, link },
        {
          handleCardClick: () => {

            const cardReviewPopupClass = new PopupWithImage({ place, link }, cardReviewPopupSelector);
            cardReviewPopupClass.setEventListeners();
            cardReviewPopupClass.open();
          }
        },
        cardElementIdSelector
      );

      const newCardElement = newCard.generateCard();
      cardsList.prepend(newCardElement);

      addPlacePopupClass.close();
    }
  }
);

editButton.addEventListener('click', () => {
  profilePopupClass.open();
  userInfoRenderer.renderItems();
});

addButton.addEventListener('click', () => {
  addPlacePopupClass.open();
})

profilePopupClass.setEventListeners();
addPlacePopupClass.setEventListeners();

forms.forEach(form => {

  const formElement = (form === profileFormElement)
    ? new FormValidator(formValidationSettings, profileFormId)
    : new FormValidator(formValidationSettings, addPlaceFormId);

  formElement.enableValidation();
});


