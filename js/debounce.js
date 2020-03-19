'use strict';

(function () {
  // var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 300;

  // var onEscDown = function (evt, func) {
  //   if (evt.keyCode === ESC_KEYCODE) {
  //     func();
  //   }
  // };

  // var renderErrorMessage = function (errorMessage) {
  //   var message = document.createElement('div');
  //   message.classList.add('error-message');
  //   message.textContent = errorMessage;
  //   document.body.insertAdjacentElement('afterbegin', message);
  // };

  // var debounce = function (fun) {
  //   var lastTimeout = null;

  //   return function () {
  //     var parameters = arguments;
  //     // console.log(parameters);
  //     if (lastTimeout) {
  //       window.clearTimeout(lastTimeout);
  //     }
  //     lastTimeout = window.setTimeout(function () {
  //       fun.apply(null, parameters);
  //     }, DEBOUNCE_INTERVAL);
  //   };
  // };

  window.debounce = function (fun) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;

      // console.log(parameters);
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        // фунцкция которая пришла в аргументах функции debounce
        // вызываеться на null и принимает значения parametrs равные аргументам функции которая пришла в аргументах debounce.
        // как то так
        fun.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  // window.debounce = {
  //   // onEscDown: onEscDown,
  //   // renderErrorMessage: renderErrorMessage,
  //   debounce: debounce
  // };
})();

