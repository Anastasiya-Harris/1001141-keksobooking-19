'use strict';
// Popup.js — модуль, который работает с формой.

var ESC_KEY = 'Escape';

var templateError = document.querySelector('#error').cloneNode(true).content;

var onError = function (errorMessage) {
  var errorElement = templateError.querySelector('.error');
  errorElement.querySelector('.error__message').textContent = window.errorMessage;
  document.body.appendChild(errorElement);
  var messageClickHandler = function () {
    message.remove();
  };
  message.addEventListener('click', messageClickHandler);
};

// Popup успеха/////////////////////////////////
var submitButton = document.querySelector('.ad-form__submit');

var successMessage = function() {
  var templateSuccess = document.querySelector('#success').cloneNode(true)
  .content
  .querySelector('.success__message').cloneNode(true);
  document.body.appendChild(templateSuccess);
};

submitButton.addEventListener('click', successMessage);

var ESC_KEYCODE = 27;

var closePopUp = function () {
  var card = document.querySelector('.map__card');
  if (card) {
    map.removeChild(card);
    document.removeEventListener('keydown', onPopupEscPress);
    map.removeEventListener('keydown', onPopupEscPress);
  }
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopUp();
  }
};





// Нажатие на элемент .setup-open удаляет класс hidden
// у блока setup. Нажатие на элемент .setup-close, расположенный
// внутри блока setup возвращает ему класс hidden.

// var successPopup = document.querySelector('.success');
// var setupOpen = document.querySelector('.setup-open');
// var setupClose = setup.querySelector('.setup-close');
// var onPopupEscPress = function (evt) {
//   if (evt.key === ESC_KEY) {
//     closePopup();
//   }
// };

// var openPopup = function () {
//   successPopup.classList.remove('hidden');
//   document.addEventListener('keydown', onPopupEscPress);
// };

// var closePopup = function () {
//   successPopup.classList.add('hidden');
//   document.removeEventListener('keydown', onPopupEscPress);
// };

// setupOpen.addEventListener('click', function () {
//   openPopup();
// });

// setupOpen.addEventListener('keydown', function (evt) {
//   if (evt.key === ENTER_KEY) {
//     openPopup();
//   }
// });

// setupClose.addEventListener('click', function () {
//   closePopup();
// });

// setupClose.addEventListener('keydown', function (evt) {
//   if (evt.key === ENTER_KEY) {
//     closePopup();
//   }
// });

// var onError = function (errorMessage) {
//   var errorElement = templateError.querySelector('.error');
//   errorElement.querySelector('.error__message').textContent = window.errorMessage;
//   document.body.appendChild(errorElement);
//   var messageClickHandler = function () {
//     message.remove();
//   };
//   message.addEventListener('click', messageClickHandler);
// };
