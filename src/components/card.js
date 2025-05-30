export function addCard(item, deleteCard, likeCard, popupImage, newCards,  currentUser) {
    const newPlacesItem = newCards.querySelector(".places__item").cloneNode(true);
    const imgCard = newPlacesItem.querySelector(".card__image");
    const likes = newPlacesItem.querySelector('.card__like-total');
    const deleteButton = newPlacesItem.querySelector(".card__delete-button");
    const likeButton = newPlacesItem.querySelector('.card__like-button');
    const nameCard = item.name;
    const linkCard = item.link;
    imgCard.src = linkCard;
    imgCard.alt = nameCard;
    likes.textContent=item.likes.length;

    newPlacesItem.querySelector(".card__title").textContent = nameCard;
    newPlacesItem.dataset.cardId = item._id;
  
     if (item.likes.some(like => like._id === currentUser )) {
    likeButton.classList.add('card__like-button_is-active');
  }

    if (item.owner._id !== currentUser) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", function () {
      deleteCard(newPlacesItem, item._id);
    });
  } 
 
      newPlacesItem.querySelector('.card__like-button').addEventListener('click', likeCard);
      imgCard.addEventListener('click', () => popupImage({ nameCard, linkCard }));
  
    return newPlacesItem;
  }


export function likeCardFactory(addLikeServer, removeLikeServer) {
  return function likeCard(evt) {
    const likeButton = evt.target;
    const cardElement = likeButton.closest('.places__item');
    const cardId = cardElement.dataset.cardId;
    const likeCounter = cardElement.querySelector('.card__like-total');
    const isLiked = likeButton.classList.contains('card__like-button_is-active');

    const likeAction = isLiked ? removeLikeServer : addLikeServer;

    likeAction(cardId)
      .then(updatedCard => {
        likeButton.classList.toggle('card__like-button_is-active', !isLiked);
        likeCounter.textContent = updatedCard.likes.length;
      })
      .catch(err => {
        alert(`Ошибка при изменении лайка: ${err}`);
      });
  };
}



  
  