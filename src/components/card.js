import { initialCards } from "./cards.js";
import { likeCard, popupImage, closeModal } from "./modal.js";

const cardElement = document.forms["new-place"];
const cardName = cardElement.elements["place-name"];
const cardLink = cardElement.elements["link"];

const newCards = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

export function addCard(item, deleteCard) {
  const newPlacesItem = newCards.querySelector(".places__item").cloneNode(true);
  const imgCard = newPlacesItem.querySelector(".card__image");
  imgCard.src = item.link;
  imgCard.alt = item.name;
  newPlacesItem.querySelector(".card__title").textContent = item.name;

  newPlacesItem
    .querySelector(".card__delete-button")
    .addEventListener("click", function () {
      deleteCard(newPlacesItem);
    });

  newPlacesItem
    .querySelector(".card__like-button")
    .addEventListener("click", likeCard);
  newPlacesItem
    .querySelector(".card__image")
    .addEventListener("click", popupImage);

  return newPlacesItem;
}

export function deleteCard(card) {
  card.remove();
}

initialCards.forEach((item) => {
  const cardElement = addCard(item, deleteCard);
  placesList.append(cardElement);
});

export function cardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardName.value;
  const link = cardLink.value;
  const addNewCard = addCard({ name, link }, deleteCard);
  placesList.prepend(addNewCard);
  cardElement.reset();
  const cardAdd = document.querySelector(".popup_type_new-card");
  closeModal(cardAdd);
}
