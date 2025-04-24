export function closeModal(popup) {
    popup.classList.toggle('popup_is-opened');
    document.removeEventListener('keydown', escClosePopup);
}

export function openModal(popup) {

      popup.classList.add('popup_is-opened');  
    document.addEventListener('keydown', escClosePopup);
  
  }

  function escClosePopup(evt) {
    if(evt.key === 'Escape') {
  const escTarget = document.querySelector('.popup_is-opened');
  closeModal(escTarget);
    } 
  }
  

