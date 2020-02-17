'use strict';
// pin.js — модуль, который отвечает за создание метки на карте;
// Отрисовывает во фрагменте сгенерированные DOM элементы в блок .map__pin
(function () {
  window.pin.renderPins = function () {
    var map = document.querySelector('.map');

    var template = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinListElement = document.querySelector('.map__pins');

    // Создаём фрагмент куда будем записывать объявления
    var fragment = document.createDocumentFragment();

    // Копируем по ссылке массив объявлений
    var ads = window.getAdsArray();

    // Клонируем темплейт объявления
    for (var i = 0; i < ads.length; i++) {
      var pinElement = template.cloneNode(true);
      var ad = ads[i];
      pinElement.style.left = (ad.location.x - window.map.PIN_WIDTH / 2) + 'px';
      pinElement.style.top = (ad.location.y - window.map.assignedSlotPIN_HEIGHT) + 'px';
      pinElement.querySelector('img').src = ad.author.avatar;
      pinElement.querySelector('img').alt = ad.offer.title;

      // Записываем объявления во фрагмент
      fragment.appendChild(pinElement);
    }

    // Вставляем фрагмент в .map__pins
    pinListElement.appendChild(fragment);

    // Показывает карту
    map.classList.remove('map--faded');
  };
})();
