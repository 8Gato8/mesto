export const showInputError = function (formElement, inputElement, errorMessage, validationSettings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(validationSettings.inputErrorClass);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSettings.errorClass);
}

export const hideInputError = function (formElement, inputElement, validationSettings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(validationSettings.inputErrorClass);

  errorElement.classList.remove(validationSettings.errorClass);
  errorElement.textContent = '';
}

export const checkInputValidity = function (formElement, inputElement, validationSettings) {
  if (!(inputElement.validity.valid)) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings);
  } else {
    hideInputError(formElement, inputElement, validationSettings);
  }
}

export const setEventListeners = function (formElement, validationSettings) {

  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, validationSettings);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, validationSettings);
      toggleButtonState(inputList, buttonElement, validationSettings);
    });

  });
};

export const enableValidation = function (validationSettings) {

  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, validationSettings);

  });
};

export const hasInvalidInput = function (inputList) {
  return inputList.some(inputElement => {
    if (!(inputElement.validity.valid)) return true;
  });
};

export const disableButtonElement = function (buttonElement, validationSettings) {
  buttonElement.classList.add(validationSettings.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
};

export const activateButtonElement = function (buttonElement, validationSettings) {
  buttonElement.classList.remove(validationSettings.inactiveButtonClass);
  buttonElement.removeAttribute('disabled', true);
};

export const toggleButtonState = function (inputList, buttonElement, validationSettings) {

  if (hasInvalidInput(inputList)) {
    disableButtonElement(buttonElement, validationSettings);
  } else {
    activateButtonElement(buttonElement, validationSettings);
  }
};

export const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_visible'
};
