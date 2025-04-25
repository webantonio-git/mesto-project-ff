

export function addCard(item, deleteCard, likeCard, popupImage, newCards) {
    const newPlacesItem = newCards.querySelector(".places__item").cloneNode(true);
    const imgCard = newPlacesItem.querySelector(".card__image");
    const nameCard = item.name;
    const linkCard = item.link;
    imgCard.src = linkCard;
    imgCard.alt = nameCard;
    newPlacesItem.querySelector(".card__title").textContent = nameCard;
  
  
    newPlacesItem
      .querySelector(".card__delete-button")
      .addEventListener("click", function (evt) {
        deleteCard(newPlacesItem);
      });
  
      newPlacesItem.querySelector('.card__like-button').addEventListener('click', likeCard);
      imgCard.addEventListener('click', () => popupImage({ nameCard, linkCard }));
  
    return newPlacesItem;
  }

 export function deleteCard(card) {
    card.remove();
  }

  export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
    }



  
  