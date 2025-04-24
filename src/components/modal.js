const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");

const popImage = document.querySelector(".popup_type_image");
const popupImageElement = document.querySelector(".popup__image");
const popupCaptionElement = document.querySelector(".popup__caption");

export function openModal(popup) {
  popup.classList.add("popup_is-animated");
  setTimeout(() => {
    popup.classList.add("popup_is-opened");
  }, 10);
  document.addEventListener("keydown", escClosePopup);
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escClosePopup);
}

export function escClosePopup(evt) {
  if (evt.key === "Escape") {
    const escTarget = document.querySelector(".popup_is-opened");
    closeModal(escTarget);
  }
}

export function popupImage(evt) {
  const img = evt.target;
  popupImageElement.src = img.src;
  popupImageElement.alt = img.alt;
  popupCaptionElement.textContent = img.alt;
  openModal(popImage);
}

export function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export function handleFormSubmit(evt, popup) {
  evt.preventDefault();

  const newName = nameInput.value;
  const newDescription = jobInput.value;
  const titleName = document.querySelector(".profile__title");
  const titleDescription = document.querySelector(".profile__description");
  titleName.textContent = newName;
  titleDescription.textContent = newDescription;
  closeModal(popup);
}
