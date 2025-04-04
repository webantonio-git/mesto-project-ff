// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const newCards = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

function addCard(item, deleteCard) {
  const newPlacesItem = newCards.querySelector(".places__item").cloneNode(true);
  const imgCard = newPlacesItem.querySelector(".card__image");
  imgCard.src = item.link;
  imgCard.alt = item.name;
  newPlacesItem.querySelector(".card__title").textContent = item.name;

  newPlacesItem
    .querySelector(".card__delete-button")
    .addEventListener("click", function (evt) {
      deleteCard(newPlacesItem);
    });

  return newPlacesItem;
}

function deleteCard(card) {
  card.remove();
}

initialCards.forEach((item) => {
  const cardElement = addCard(item, deleteCard);
  placesList.append(cardElement);
});
