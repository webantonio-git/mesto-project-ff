const showError = (formElement, inputElement,  enableObject) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(enableObject.inputErrorClass); 
    errorElement.textContent=inputElement.validationMessage;
     errorElement.classList.add(enableObject.errorClass);

}

const hideError = (formElement, inputElement, enableObject) => {
   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(enableObject.inputErrorClass);  
     errorElement.classList.remove(enableObject.errorClass);
     errorElement.textContent='';
}

const checkInputValidity = (formElement, inputElement, enableObject) => {
    if (inputElement.validity.patternMismatch) {
          inputElement.setCustomValidity(inputElement.dataset.errorMessage)
     
            
    }
    else {
         inputElement.setCustomValidity("");
    } 

    if(!inputElement.validity.valid)
    {
showError (formElement, inputElement,  enableObject);
    }

    else {
 hideError(formElement,inputElement, enableObject);
    }
    }

    
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, enableObject) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(enableObject.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(enableObject.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};



const setEventListeners = (formElement, enableObject) => {
const inputList = Array.from(formElement.querySelectorAll(enableObject.inputSelector));
 const buttonElement = formElement.querySelector(enableObject.submitButtonSelector);
inputList.forEach(inputElement=> {
inputElement.addEventListener('input', function() {
checkInputValidity(formElement, inputElement, enableObject);
 toggleButtonState(inputList, buttonElement, enableObject);
});
});
 toggleButtonState(inputList, buttonElement, enableObject);
};



export const enableValidation = (enableObject) => {
 const   formList = Array.from(document.querySelectorAll(enableObject.formSelector));
    formList.forEach(formElement => {
formElement.addEventListener('submit', function(evt) {
  evt.preventDefault();
});
setEventListeners(formElement, enableObject);
    });
}

export const clearValidation = (formElement, enableObject) => {
  const inputList = Array.from(formElement.querySelectorAll(enableObject.inputSelector));
  const buttonElement = formElement.querySelector(enableObject.submitButtonSelector);
  inputList.forEach(inputElement => {  
    hideError(formElement, inputElement, enableObject);
  });
 toggleButtonState(inputList, buttonElement, enableObject);
};

const enableObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}





