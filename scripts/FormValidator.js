import { addButton, editButton, addPlaceFormElement } from './constants.js';

export class FormValidator {

  constructor(validationSettings, formSelector) {

    this._validationSettings = validationSettings;
    this._formSelector = formSelector;
    this._inputSelector = validationSettings.inputSelector;
    this._submitButtonSelector = validationSettings.submitButtonSelector;
    this._inactiveButtonClass = validationSettings.inactiveButtonClass;
    this._inputErrorClass = validationSettings.inputErrorClass;
    this._errorClass = validationSettings.errorClass;
  }

  enableValidation() {

    const formElement = document.querySelector(this._formSelector);

    this._setEventListeners(formElement);
  };

  _setEventListeners(formElement) {

    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);

    addButton.addEventListener('click', () => {

      this._checkFormValidity(formElement, inputList, buttonElement);
    });

    editButton.addEventListener('click', () => {

      this._checkFormValidity(formElement, inputList, buttonElement);
    });

    inputList.forEach(inputElement => {

      inputElement.addEventListener('input', () => {
        this._toggleInputErrorVisibility(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  _checkFormValidity(formElement, inputList, buttonElement) {

    if (formElement === addPlaceFormElement) {
      this._toggleButtonState(inputList, buttonElement);
      return;
    }

    if (!(this._hasInvalidInput(inputList))) {

      inputList.forEach(inputElement => {
        this._hideInputError(formElement, inputElement);
        this._activateButtonElement(buttonElement);
      });
    }
  }

  _toggleButtonState(inputList, buttonElement) {

    if (this._hasInvalidInput(inputList)) {
      this._disableButtonElement(buttonElement);
    } else {
      this._activateButtonElement(buttonElement);
    }
  }

  _toggleInputErrorVisibility(formElement, inputElement) {

    if (!(this._isInputValid(inputElement))) {

      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _hasInvalidInput(inputList) {

    return inputList.some(inputElement => {

      if (!(inputElement.validity.valid)) return true;
    });
  }

  _activateButtonElement(buttonElement) {

    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.removeAttribute('disabled', true);
  }

  _disableButtonElement(buttonElement) {

    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }

  _isInputValid(inputElement) {

    if (inputElement.validity.valid) {

      return true;
    }
    return false;
  }

  _showInputError(formElement, inputElement, errorMessage) {

    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(formElement, inputElement) {

    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);

    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }
}
