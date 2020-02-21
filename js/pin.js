'use strict';
// pin.js — модуль, который отвечает за создание меткок на карте;
(function () {
  var MAX_ADS_COUNT = 8;

  var map = document.querySelector('.map');
  var template = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPins = function (ad) {
    var pinElement = template.cloneNode(true);

    pinElement.style.left = (ad.location.x - window.map.PIN_WIDTH / 2) + 'px';
    pinElement.style.top = (ad.location.y - window.map.assignedSlotPIN_HEIGHT) + 'px';
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;
    return pinElement;
  };

  var successHandler = function (ads) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < MAX_ADS_COUNT; i++) {
      fragment.appendChild(renderPins(ads[i]));
    }

    // Вставляем фрагмент в .map__pins
    map.appendChild(fragment);

    // Показывает карту
    map.classList.remove('map--faded');
  };

  var errorHandler = function (errorMessage) {
    var errorAlert = document.querySelector('#error').content.querySelector('.error');

    errorAlert.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorAlert);
  };

  window.load(successHandler, errorHandler);
  window.pin = {
    renderPins: renderPins,
  };
})();
