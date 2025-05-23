// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "./pages/index.css";
import logo from "./images/logo.svg";
import avatar from "./images/avatar.jpg";

import { openModal, closeModal} from "./components/modal.js";
import { deleteCard, addCard, likeCard } from "./components/card.js";
import { initialCards } from "./components/cards.js";

document.querySelector(".header__logo").src = logo;
document.querySelector(
  ".profile__image"
).style.backgroundImage = `url(${avatar})`;


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

const popArray = [popupEdit, cardAdd, popImage];

popArray.forEach(popup => {
  popup.classList.add('popup_is-animated');
  popup.addEventListener('mousedown', function(evt) {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
});


initialCards.forEach((item) => {
  const cardElement = addCard(item, deleteCard, likeCard, openPopImg, newCards);
  placesList.append(cardElement);
});

function openPopImg({nameCard, linkCard}) {
  popupImageElement.src = linkCard;
  popupImageElement.alt = nameCard;
  popupCaptionElement.textContent = nameCard;
  openModal(popImage);
}

function profileFormSubmit(evt) {
  evt.preventDefault(); 
  titleName.textContent = nameInput.value;;
  titleDescription.textContent = jobInput.value;
  closeModal(popupEdit);
}

document.querySelectorAll('.popup__close').forEach(btn => {
  btn.addEventListener('click', function(evt){
    const close = evt.target.closest('.popup');
    closeModal(close);
  })
  });
editProfileForm.addEventListener('submit', profileFormSubmit);
document.querySelector('.profile__add-button').addEventListener('click', function(evt) {
  openModal(cardAdd);
  });
  cardElement.addEventListener('submit', handleCardFormSubmit);

  function handleCardFormSubmit(evt) {
    evt.preventDefault();   
    const name = cardName.value;
    const link = cardLink.value; 
    const addNewCard = addCard({name, link}, deleteCard, likeCard, openPopImg, newCards);
    placesList.prepend(addNewCard);
    cardElement.reset();
    closeModal(cardAdd);
  }



  document.querySelector('.profile__edit-button').addEventListener('click', function(evt) {
    
    nameInput.value = titleName.textContent;
    jobInput.value = titleDescription.textContent;
    openModal(popupEdit);
  });
  
  


