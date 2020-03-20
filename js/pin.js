'use strict';
// pin.js — модуль, который отвечает за создание меткок на карте;
(function () {

  var template = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (ad) {
    var pinElement = template.cloneNode(true);
    pinElement.style.left = (ad.location.x - window.map.PIN_WIDTH / 2) + 'px';
    pinElement.style.top = (ad.location.y - window.map.PIN_HEIGHT) + 'px';
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;

    pinElement.addEventListener('click', function (evt) {
      window.filter.closePopup();
      window.popup.renderPopup(ad);

      evt.currentTarget.classList.add('map__pin--active');
    });

    return pinElement;
  };

  var renderPins = function (ads) {

    var map = document.querySelector('.map');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < ads.length; i++) {
      fragment.appendChild(renderPin(ads[i]));
    }
    // Вставляем фрагмент в .map__pins
    map.appendChild(fragment);

  };

  var removePins = function () {
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    mapPins.forEach(function (pin) {
      pin.remove();
    });
  };

  window.pin = {
    renderPins: renderPins,
    removePins: removePins,
  };
})();
