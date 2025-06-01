export function closeModal(popup) {
  popup.classList.toggle("popup_is-opened");
  document.removeEventListener("keydown", closeEscPop);
}

export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEscPop);
}

function closeEscPop(evt) {
  if (evt.key === "Escape") {
    const escTarget = document.querySelector(".popup_is-opened");
    closeModal(escTarget);
  }
}
