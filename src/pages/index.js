import './index.css';
import '../images/avatar.jpg';

import Card from '../components/card.js';
import FormValidator from '../components/form-validator.js';
import Section from '../components/section.js';
import PopupWithImage from '../components/popup-with-image.js';
import PopupWithForm from '../components/popup-with-form.js';
import PopupWithFormSubmit from '../components/popup-with-form-submit.js';
import UserInfo from '../components/user-info.js';
import Api from '../components/api.js'
import { defaultFormConfig, popupConfig, profileConfig, cardsConfig } from '../utils/constants.js';
import { renderLoading } from "../utils/utils.js";

const openEditFormButton = document.querySelector('.profile__edit-button');
const openCardFormButton = document.querySelector('.profile__add-button');
const openAvatarFormButton = document.querySelector('.profile__image');
const titleInputValue = document.querySelector('.popup__input_type_name');
const descriptionInputValue = document.querySelector('.popup__input_type_description');

const userInfo = new UserInfo({
  userNameSelector: profileConfig.profileTitle,
  userDescriptionSelector: profileConfig.profileDescription,
  userAvatarSelector: profileConfig.profileAvatar
});

const api = new Api({
  address: 'https://nomoreparties.co',
  groupId: `cohort0`,
  token: `80a75492-21c5-4330-a02f-308029e94b63`,
});

let userId = null;

const imagePopup = new PopupWithImage(popupConfig.imageModalWindow);
imagePopup.setEventListeners();

const cardInfoSubmit = new PopupWithFormSubmit(popupConfig.removeCardModalWindow);
cardInfoSubmit.setEventListeners();

const editFormValidator = new FormValidator(defaultFormConfig, popupConfig.editFormModalWindow);
editFormValidator.enableValidation();

const cardFormValidator = new FormValidator(defaultFormConfig, popupConfig.cardFormModalWindow);
cardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(defaultFormConfig, popupConfig.changeAvatarModalWindow);
avatarFormValidator.enableValidation();


const createCard = (cardData) => {
  const card = new Card({
    data: { ...cardData, currentUserId: userId },
    handleCardClick: () => {
      imagePopup.open(cardData);
    },
    handleLikeClick: (card) => {
      api.changeLikeCardStatus(card.id(), !card.isLiked())
        .then(data => {
          card.setLikesInfo({ ...data });
        })
        .catch(err => console.log(`Ошибка изменения статуса лайка: ${err}`))
    },
    handleDeleteIconClick: (card) => {
      cardInfoSubmit.open();
      cardInfoSubmit.setSubmitAction(() => {
        api.removeCard(card.id())
          .then(() => {
            card.removeCard();
            cardInfoSubmit.close();
          })
          .catch(err => console.log(`При удалении карточки: ${err}`))
      });
    },
  }, cardsConfig.cardSelector);

  return card.getView();
}

const cardList = new Section({
    renderer: (data) => {
      cardList.addItem(createCard(data));
    }
  }, cardsConfig.placesWrap
);

const newCardPopup = new PopupWithForm({
  popupSelector: popupConfig.cardFormModalWindow,
  handleFormSubmit: (data) => {
    renderLoading(true);

    api.addCard(data)
      .then((cardData) => {
        cardList.addItem(createCard(cardData));
      })
      .catch(err => console.log(`Ошибка добавление карточки: ${err}`))
      .finally(() => {
        renderLoading();
        newCardPopup.close();
      });
  }
});
newCardPopup.setEventListeners();

const userInfoPopup = new PopupWithForm({
  popupSelector: popupConfig.editFormModalWindow,
  handleFormSubmit: (data) => {
    renderLoading(true);
    api.setUserInfo({
      name: data.userName,
      about: data.userDescription
    })
      .then((info) => {
        userInfo.setUserInfo({
          userName: info.name,
          userDescription: info.about,
        })
      })
      .catch(err => console.log(`Ошибка при обновлении информации о пользователе: ${err}`))
      .finally(() => {
        renderLoading();
        userInfoPopup.close();
      });
  }
});
userInfoPopup.setEventListeners();

const changeAvatarPopup = new PopupWithForm({
  popupSelector: popupConfig.changeAvatarModalWindow,
  handleFormSubmit: (data) => {
    renderLoading(true);

    api.setUserAvatar({
      avatar: data.avatar
    })
      .then((info) => {
        userInfo.setUserInfo({
          userAvatar: info.avatar,
        });
      })
      .catch(err => console.log(`При изменении аватара пользователя: ${err}`))
      .finally(() => {
        renderLoading();
        changeAvatarPopup.close();
      });
  }
});
changeAvatarPopup.setEventListeners();

openEditFormButton.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo();
  titleInputValue.value = currentUserInfo.userName;
  descriptionInputValue.value = currentUserInfo.userDescription;
  userInfoPopup.open();
});

openCardFormButton.addEventListener('click', () => {
  newCardPopup.open();
});

openAvatarFormButton.addEventListener('click', () => {
  changeAvatarPopup.open();
});

api.getAppInfo()
  .then(([ cardsArray, userData ]) => {
    userId = userData._id;

    userInfo.setUserInfo({
      userName: userData.name,
      userDescription: userData.about,
      userAvatar: userData.avatar
    });

    cardList.renderItems(cardsArray);
  })
  .catch(err => console.log(`Ошибка загрузки данных: ${err}`))

