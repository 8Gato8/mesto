import './index.css';

import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupConfirmation } from '../components/PopupConfirmation.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';

import { editButton, addButton, updateAvatarButton, profileNameSelector, profileJobSelector, profileAvatarSelector, profileFormId, addPlaceFormId, updateAvatarFormId, inputName, inputJob, profilePopupSelector, addPlacePopupSelector, confirmationPopupSelector, updateProfileSelector, cardReviewPopupSelector, cardsList, cardsListSelector, cardElementIdSelector, formValidationSettings } from '../utils/constants.js';

/* Класс Api для взаимодействия с сервером */

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: 'ca43c8e8-a5c6-4257-ad6d-b3b634fe42f7',
    'Content-Type': 'application/json'
  }
});

/* Глобальные переменные */

let userObj;
let initialCard;

/* Рендер карточек и информации о пользователе */

Promise.all([api.getBackendUserInfo(), api.getInitialCards()])

  .then((data) => {

    const user = data[0];
    const card = data[1];

    const { name, job, avatar } = userInfo.getUserInfo();

    name.textContent = user.name;
    job.textContent = user.about;
    avatar.src = user.avatar;


    userObj = user;

    const initialCardList = new Section({
      items: card,

      renderer: ({ name, link, likes, owner, _id }) => {

        const newCard = createCard({ name, link, likes, owner, _id });
        const newCardElement = newCard.generateCard();

        if (newCard.checkLikeStatus()) {
          newCard.toggleLikeButton();
        }
        initialCardList.addItem(newCardElement);
      }
    },

      cardsListSelector
    )
    initialCardList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

/* Классы */

const userInfo = new UserInfo({

  userNameSelector: profileNameSelector,
  userJobSelector: profileJobSelector,
  userAvatarSelector: profileAvatarSelector
});

const popupImage = new PopupWithImage(cardReviewPopupSelector);

const popupEditProfile = new PopupWithForm(

  profilePopupSelector,
  {
    handleFormSubmit: ({ name, job }) => {

      popupEditProfile.submitButton.textContent = 'Сохранение...';

      userInfo.setUserInfo({ name, job });

      api.editUserInfo(name, job)
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupEditProfile.submitButton.textContent = 'Сохранить';
        });

      popupEditProfile.close();
    }
  }
);

const popupAddCard = new PopupWithForm(

  addPlacePopupSelector,
  {
    handleFormSubmit: ({ name, link }) => {

      popupAddCard.submitButton.textContent = 'Сохранение...';

      const newCard = createCard({ name, link, likes: [], owner: userObj });
      const newCardElement = newCard.generateCard();

      api.postNewCard({ name, link })
        .then((data) => {
          newCard._id = data._id;
        })
        .then(() => {
          cardsList.prepend(newCardElement);
          popupAddCard.close();
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          popupAddCard.submitButton.textContent = 'Создать';
        });
    }
  }
);

const popupConfirmation = new PopupConfirmation(

  confirmationPopupSelector,
  {
    handleFormSubmit: () => {

      const cardId = initialCard._id;

      api.deleteCard(cardId)
        .then(() => {
          initialCard.removePlaceElement();
          popupConfirmation.close();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
);

const popupUpdateAvatar = new PopupWithForm(

  updateProfileSelector,
  {
    handleFormSubmit: ({ avatar }) => {

      popupUpdateAvatar.submitButton.textContent = 'Сохранение...';

      api.updateAvatar(avatar)

        .then((data) => {
          userInfo.setUserAvatar(data.avatar);
          popupUpdateAvatar.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupUpdateAvatar.submitButton.textContent = 'Сохранить';
        });
    }
  }
);

/* Функции для классов */

const createCard = ({ name, link, likes, owner, _id }) => {

  return new Card(
    { name, link, likes, owner, _id },

    userObj,

    {
      handleCardClick: () => {

        popupImage.open({ name, link });
      },

      handleTrashButtonClick: (cardObj) => {

        initialCard = cardObj;
        popupConfirmation.open();
      },

      handleLikeClick: (cardObj) => {

        if (cardObj.checkLikeStatus()) {
          api.deleteLike(cardObj._id)
            .then((data) => {
              cardObj._likes = data.likes;
            })
            .catch((err) => {
              console.log(err);
            })
            .then(() => {
              cardObj.setLikeCounter();
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          api.likeCard(cardObj._id)
            .then((data) => {
              cardObj._likes = data.likes;
            })
            .catch((err) => {
              console.log(err);
            })
            .then(() => {
              cardObj.setLikeCounter();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    },

    cardElementIdSelector
  );
}

/* Обработчики событий */

popupEditProfile.setEventListeners();

popupAddCard.setEventListeners();

popupConfirmation.setEventListeners();

popupImage.setEventListeners();

popupUpdateAvatar.setEventListeners();

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

updateAvatarButton.addEventListener('click', () => {

  validatorUpdateAvatar.checkFormValidity();
  popupUpdateAvatar.open();
})

/* Валидация форм */

const validatorEditProfile = new FormValidator(formValidationSettings, profileFormId);
validatorEditProfile.enableValidation();

const validatorAddCardProfile = new FormValidator(formValidationSettings, addPlaceFormId);
validatorAddCardProfile.enableValidation();

const validatorUpdateAvatar = new FormValidator(formValidationSettings, updateAvatarFormId);
validatorUpdateAvatar.enableValidation();
