'use strict';
// Popup.js — модуль, который работает с формой.

// var ESC_KEYCODE = 'Escape';


var templateError = document.querySelector('#error').content.querySelector('.error');

// var templateError = document.querySelector('#error').cloneNode(true).content;

var errorButton = templateError.querySelector('.error__button');
var onError = function (errorMessage) {
  var errorElement = templateError.querySelector('.error');
  errorElement.querySelector('.error__message').textContent = window.errorMessage;
  document.body.appendChild(errorElement);
  var messageClickHandler = function () {
    message.remove();
    // debugger;
    errorButton.addEventListener('click', messageClickHandler);
  };
};

// Popup успеха/////////////////////////////////
var submitButton = document.querySelector('.ad-form__submit');

var onEscDown = function (evt, func) {
  if (evt.keyCode === ESC_KEYCODE) {
    func();
  }
};

var main = document.querySelector('main');

var successMessage = function (messageTemplate) {
  var messageElement = messageTemplate.cloneNode(true);
  main.appendChild(messageElement);
  var messageKeydownHandler = function (evt) {
    if (evt.key === 'Escape') {
      main.removeChild(messageElement);
      document.removeEventListener('keydown', messageKeydownHandler);
    }
  };
  var messageClickHandler = function (evt) {
    if (evt.target.closest('div')) {
      main.removeChild(messageElement);
      document.removeEventListener('keydown', messageClickHandler);
    }
  };
  document.addEventListener('keydown', messageKeydownHandler);
  document.addEventListener('click', messageClickHandler);
};

window.popup = {
  successMessage: successMessage,
  onError: onError,
};
