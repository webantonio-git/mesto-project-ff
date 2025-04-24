// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "./pages/index.css";
import logo from "./images/logo.svg";
import avatar from "./images/avatar.jpg";

import { openModal, closeModal, handleFormSubmit } from "./components/modal.js";
import { cardFormSubmit } from "./components/card.js";

document.querySelector(".header__logo").src = logo;
document.querySelector(
  ".profile__image"
).style.backgroundImage = `url(${avatar})`;

const popupEdit = document.querySelector(".popup_type_edit");
const cardAdd = document.querySelector(".popup_type_new-card");

document.querySelectorAll(".popup__close").forEach((btn) => {
  btn.addEventListener("click", function (evt) {
    const close = evt.target.closest(".popup");
    closeModal(close);
  });
});

popupEdit.addEventListener("mousedown", function (evt) {
  if (evt.target === popupEdit) {
    closeModal(popupEdit);
  }
});

document.forms["edit-profile"].addEventListener("submit", (evt) =>
  handleFormSubmit(evt, popupEdit)
);

document
  .querySelector(".profile__edit-button")
  .addEventListener("click", function (evt) {
    const titleName = document.querySelector(".profile__title").textContent;
    const titleDescription = document.querySelector(
      ".profile__description"
    ).textContent;
    document.querySelector(".popup__input_type_name").value = titleName;
    document.querySelector(".popup__input_type_description").value =
      titleDescription;
    openModal(popupEdit);
  });

document
  .querySelector(".profile__add-button")
  .addEventListener("click", function (evt) {
    openModal(cardAdd);
  });

document.forms["new-place"].addEventListener("submit", cardFormSubmit);
