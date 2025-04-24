const newCards = document.querySelector("#card-template").content;

export function addCard(item, deleteCard, likeCard, popupImage) {
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
  
      newPlacesItem.querySelector('.card__like-button').addEventListener('click', likeCard);
      newPlacesItem.querySelector('.card__image').addEventListener('click', popupImage);
  
    return newPlacesItem;
  }

 export function deleteCard(card) {
    card.remove();
  }

  export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
    }



  
  