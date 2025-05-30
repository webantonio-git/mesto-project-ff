// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу



import "./pages/index.css";
import logo from "./images/logo.svg";
import avatar from "./images/avatar.jpg";
import { openModal, closeModal} from "./components/modal.js";
import {  addCard,  likeCardFactory } from "./components/card.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import { getUser, getInitialCards, editProfile, addServerCard, deleteCardServer, addLikeServer, removeLikeServer, updateAvatar  } from "./components/api.js";





const placesList = document.querySelector(".places__list");
const popupEdit = document.querySelector('.popup_type_edit');
const cardAdd = document.querySelector('.popup_type_new-card');
const editProfileForm = document.querySelector(".popup__form"); 
const nameInput = editProfileForm.querySelector(".popup__input_type_name"); 
const jobInput = editProfileForm.querySelector(".popup__input_type_description");
const popImage = document.querySelector(".popup_type_image");
const popupImageElement = document.querySelector(".popup__image"); 
const popupCaptionElement = document.querySelector(".popup__caption"); 
const cardElement = document.forms["new-place"];
const cardName = cardElement.elements["place-name"];
const cardLink = cardElement.elements["link"]; 
const titleName = document.querySelector('.profile__title');
const titleDescription = document.querySelector('.profile__description');
const newCards = document.querySelector("#card-template").content;
const popupConfirm = document.querySelector('.popup_type_confirm');
const confirmForm = popupConfirm.querySelector('.popup__form_confirm');
const popupAvatar = document.querySelector('.popup_type_avatar');
const avatarForm = document.querySelector('form[name="avatar-update"]');
const avatarUrlInput = avatarForm.querySelector('#avatarUrl');
const profileAvatar = document.querySelector('.profile__image');
let cardToDelete = null;
let cardIdToDelete = null;
let currentUserId = null;

const popArray = [popupEdit, cardAdd, popImage, popupAvatar, popupConfirm];

Promise.all([getUser(), getInitialCards()])
  .then(([userData, cards]) => {
  currentUserId = userData._id;
    titleName.textContent = userData.name;
    titleDescription.textContent = userData.about;
    document.querySelector(".header__logo").src = logo;
    document.querySelector(".profile__image").style.backgroundImage = `url(${userData.avatar})`;   
    cards.forEach(item => {
      
      const cardElement = addCard(
       item,
    deleteCard,
    likeCard,
    openPopImg,
    newCards,
    currentUserId
         
      );
      placesList.append(cardElement);
    });
  })
  .catch((error) => {
    alert('Не удалось загрузить данные. Попробуйте позже. ' + error);
  });

  profileAvatar.addEventListener('click', () => {
  avatarUrlInput.value = '';
  clearValidation(avatarForm, enableObject);
  openModal(popupAvatar);
});
avatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const submitButton = avatarForm.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
 
  if (!avatarForm.checkValidity()) return;

    toggleButtonState(submitButton, { isLoading: true, originalText });

  const url = avatarUrlInput.value.trim();

  updateAvatar(url)
    .then((data) => {
      profileAvatar.style.backgroundImage = `url(${data.avatar})`;
      closeModal(popupAvatar);
        toggleButtonState(submitButton, { isLoading: false, originalText });
    })
    .catch((err) => {      
      alert(`Ошибка обновления аватара: ${err}`);
        toggleButtonState(submitButton, { isLoading: false, originalText });
    })
      /*.finally(() => {
      toggleButtonState(submitButton, { isLoading: false, originalText });
    })*/;
});




popArray.forEach(popup => {
  popup.classList.add('popup_is-animated');
  popup.addEventListener('mousedown', function(evt) {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
});



function openPopImg({nameCard, linkCard}) {
  popupImageElement.src = linkCard;
  popupImageElement.alt = nameCard;
  popupCaptionElement.textContent = nameCard;
  openModal(popImage);
}

function profileFormSubmit(evt) {
  evt.preventDefault(); 
   const submitButton = editProfileForm.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;


toggleButtonState(submitButton, { isLoading: true, originalText });
 
  editProfile(nameInput.value, jobInput.value).then(res=>  {
    
    toggleButtonState(submitButton, { isLoading: true, originalText, customText: 'Сохранение' });
     titleName.textContent = nameInput.value;;
  titleDescription.textContent = jobInput.value;
 submitButton.classList.add('popup__button_disabled');
  toggleButtonState(submitButton, { isLoading: false, originalText });
     closeModal(popupEdit);
  })
   .catch(err => {
      toggleButtonState(submitButton, { isLoading: false, originalText });
      alert(`Ошибка обновления профиля: ${err}`);
    })
    /*.finally(() => {   
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    
    })*/;
 
}

document.querySelectorAll('.popup__close').forEach(btn => {
  btn.addEventListener('click', function(evt){
    const close = evt.target.closest('.popup');
    closeModal(close);
  })
  });
editProfileForm.addEventListener('submit', profileFormSubmit);
document.querySelector('.profile__add-button').addEventListener('click', function(evt) {
    clearValidation(cardAdd, enableObject); 
  openModal(cardAdd);

  });
  cardElement.addEventListener('submit', handleCardFormSubmit);

     function handleCardFormSubmit(evt) {
  evt.preventDefault();
   const submitButton = cardElement.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;

  toggleButtonState(submitButton, { isLoading: true, originalText });
  const name = cardName.value;
  const link = cardLink.value;

  addServerCard(name, link)
    .then(serverCard => {
      const newCard = addCard(
         serverCard,
      deleteCard,
      likeCard,
      openPopImg,
      newCards,
      currentUserId
      );
      placesList.prepend(newCard);
      cardElement.reset();
     
      closeModal(cardAdd);
         toggleButtonState(submitButton, { isLoading: false, originalText });
    })
    .catch(err => {
      alert(`Ошибка добавления карточки: ${err}`);
       toggleButtonState(submitButton, { isLoading: false, originalText });
    })
    /*.finally(() => {
      toggleButtonState(submitButton, { isLoading: false, originalText });
    })*/;
}



  document.querySelector('.profile__edit-button').addEventListener('click', function(evt) {
    
    nameInput.value = titleName.textContent;
    jobInput.value = titleDescription.textContent;
     clearValidation(editProfileForm, enableObject);
    openModal(popupEdit);
   
  });

function openConfirmPopup(cardElement, cardId) {
  cardToDelete = cardElement;
  cardIdToDelete = cardId;
  openModal(popupConfirm);
}

function deleteCard(cardElement, cardId) {
  openConfirmPopup(cardElement, cardId);
}

confirmForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  deleteCardServer(cardIdToDelete)
    .then(() => {
      cardToDelete.remove();
      closeModal(popupConfirm);
    })
    .catch(err => {
      alert(`Ошибка при удалении карточки: ${err}`);
    });
});
  
const enableObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const likeCard = likeCardFactory(addLikeServer, removeLikeServer);

  enableValidation(enableObject);

function toggleButtonState(button, { isLoading, originalText }) {
  if (isLoading) {
    button.textContent = 'Сохранение...';
    button.disabled = true;
    button.classList.remove('popup__button_disabled');

  } else {
    button.textContent = originalText;
    button.disabled = false;
    button.classList.add('popup__button_disabled');
    button.style.color = ''; 
  }
}


