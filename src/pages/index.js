import './index.css';

import { Card } from '../components/Card.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';

import { initialCards, editButton, addButton, profileNameSelector, profileJobSelector, profileFormId, addPlaceFormId, inputName, inputJob, profilePopupSelector, addPlacePopupSelector, cardReviewPopupSelector, cardsList, cardsListSelector, cardElementIdSelector, formValidationSettings } from '../utils/constants.js';


/* Создание классов */

const initialCardList = new Section({

  items: initialCards,

  renderer: ({ place, link }) => {

    const newCard = createCard({ place, link });
    const newCardElement = newCard.generateCard();

    initialCardList.addItem(newCardElement);
  }
},

  cardsListSelector
);

const userInfo = new UserInfo({

  userNameSelector: profileNameSelector,
  userJobSelector: profileJobSelector
});

const popupImage = new PopupWithImage(cardReviewPopupSelector);

const popupEditProfile = new PopupWithForm(

  profilePopupSelector,
  {
    handleFormSubmit: ({ name, job }) => {

      userInfo.setUserInfo({ name, job });
      popupEditProfile.close();
    }
  }
);

const popupAddCard = new PopupWithForm(

  addPlacePopupSelector,
  {
    handleFormSubmit: ({ place, link }) => {

      const newCard = createCard({ place, link });

      const newCardElement = newCard.generateCard();
      cardsList.prepend(newCardElement);

      popupAddCard.close();
    }
  }
);

/* Функции для классов */

const createCard = ({ place, link }) => {

  return new Card(
    { place, link },

    {
      handleCardClick: () => {
        popupImage.open({ place, link });
      }
    },

    cardElementIdSelector
  );
}

/* Обработчики событий */

popupEditProfile.setEventListeners();

popupAddCard.setEventListeners();

popupImage.setEventListeners();

editButton.addEventListener('click', () => {

  const { name, job } = userInfo.getUserInfo();
  inputName.value = name.textContent;
  inputJob.value = job.textContent;

  validatorEditProfile.checkFormValidity();

  popupEditProfile.open();
});

addButton.addEventListener('click', () => {

  validatorAddCardProfile.checkFormValidity();
  popupAddCard.open();
})

/* Рендер карточек */

initialCardList.renderItems();

/* Валидация форм */

const validatorEditProfile = new FormValidator(formValidationSettings, profileFormId);
validatorEditProfile.enableValidation();

const validatorAddCardProfile = new FormValidator(formValidationSettings, addPlaceFormId);
validatorAddCardProfile.enableValidation();

