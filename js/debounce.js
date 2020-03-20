'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var debounce = function (fun) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        // фунцкция которая пришла в аргументах функции debounce
        // вызываеться на null и принимает значения parametrs равные аргументам функции которая пришла в аргументах debounce.
        fun.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.debounce = {
    debounce: debounce,
  };
})();

