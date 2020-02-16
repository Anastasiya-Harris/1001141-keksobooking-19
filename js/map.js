'use strict';
// map.js — модуль, который управляет карточками объявлений и метками: добавляет на страницу нужную карточку, отрисовывает метки и осуществляет взаимодействие карточки и метки на карте;

(function () {
  var MAIN_PIN_HEIGHT = 156;
  var MAIN_PIN_WIDTH = 156;
  var PIN_HEIGHT = 50;
  var PIN_WIDTH = 70;

  // 1) Неактивное состояние.
  var fieldsets = document.querySelectorAll('fieldset');
  var mapFilters = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');

  var addFormDisabled = function () {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].setAttribute('disabled', 'disabled');
    }
  };

  var addMapDisabled = function () {
    for (var i = 0; i < mapFilters.length; i++) {
      mapFilters[i].setAttribute('disabled', 'disabled');
    }
  };

  var mapPinMain = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');

  // Блокирует формы
  var disactivateMap = function () {
    addFormDisabled();
    addMapDisabled();
    setInitialAddress(mapPinMain);
  };

  // 2) Переводит страницу в активный режим.
  var removeFormDisabled = function () {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = false;
    }
  };

  var removeMapDisabled = function () {
    for (var i = 0; i < mapFilters.length; i++) {
      mapFilters[i].disabled = false;
    }
  };

  var removeDisabled = function () {
    adForm.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
    removeFormDisabled();
    removeMapDisabled();
  };

  var activateMap = function () {
    removeDisabled();
    window.pin.renderPins();
  };

  disactivateMap();

  // 3) Заполнение поля адреса при mousedown на mapPinMain
  function updateAddress(x, y) {
    addressInput.value = x + ', ' + y;
  }

  // Ловит позицию метки и передаёт в инпут адрес
  function setInitialAddress(pin) {
    var x = pin.offsetLeft + PIN_WIDTH / 2;
    var y = pin.offsetTop + PIN_HEIGHT;
    updateAddress(x, y);
  }

  // Координаты дефолтной метки по указателю
  function setCurrentAddress(pin) {
    var x = pin.offsetLeft + MAIN_PIN_WIDTH / 2;
    var y = pin.offsetTop + MAIN_PIN_HEIGHT / 2;
    updateAddress(x, y);
  }


  // map.js Активация карты
  var onMainPinMousedown = function (evt) {
    if (evt.button === 0) {
      activateMap();
      setCurrentAddress(mapPinMain);
    }
  };
  // Третий аргумент говорит что событие должно произойти 1 раз, затем обработкик удалится
  mapPinMain.addEventListener('click', onMainPinMousedown, {once: true});

  window.map = {
    PIN_HEIGHT: PIN_HEIGHT,
    PIN_WIDTH: PIN_WIDTH,
  };
})();
