// form.js — модуль, который работает с формой объявления.
'use strict';
(function () {
  // Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»
  var MAIN_PIN_START_TOP = 375;
  var MAIN_PIN_START_LEFT = 50;

  var typeOfHouseSelector = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  var MIN_PRICES = {
    flat: 1000,
    bungalo: 0,
    house: 5000,
    palace: 10000
  };


  // Установки мин. цены за ночь в зависимости от типа жилья
  var onTypeOfHouseSelectorChange = function (evt) {
    var houseType = evt.target.value;
    typeOfHouseSelector.value = houseType;
    priceInput.setAttribute('min', MIN_PRICES[houseType]);
    priceInput.setAttribute('placeholder', MIN_PRICES[houseType]);
  };

  typeOfHouseSelector.addEventListener('change', onTypeOfHouseSelectorChange);

  // Валидация. Установка соответствия количества гостей (спальных мест) с количеством комнат.
  var roomsNumberSelector = document.querySelector('#room_number');
  var capacitySelector = document.querySelector('#capacity');

  function validateRoomNumbers() {
    var roomsNumber = roomsNumberSelector.value;
    var capacity = capacitySelector.value;

    if (roomsNumber === '100' && capacity !== '0') {
      roomsNumberSelector.setCustomValidity('Не для гостей');
    } else if (roomsNumber !== '100' && capacity === '0') {
      roomsNumberSelector.setCustomValidity('Не для гостей подходит только вариант "100 комнат"');
    } else if (roomsNumber < capacity) {
      roomsNumberSelector.setCustomValidity('Количество комнат не может быть меньше количества гостей');
    } else {
      // input is fine -- reset the error message
      roomsNumberSelector.setCustomValidity('');
    }
  }


  // Функция очистки формы и карты

  var adForm = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');

  var returnInitialPageState = function () {
    window.adForm.formReset();
    validateRoomNumbers();
    window.map.addFormDisabled();
    // window.popup.close();
    mapPinMain.style.top = MAIN_PIN_START_TOP + 'px';
    mapPinMain.style.left = MAIN_PIN_START_LEFT + '%';
    window.map.disactivateMap();
    // removeFormPhotos();

    var mapPins = document.querySelector('.map__pins');
    var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var map = document.querySelector('.map');
    map.classList.add('map--faded');

    for (var k = 0; k < mapPin.length; k++) {
      var elem = mapPin[k];
      mapPins.removeChild(elem);
    }
  };

  var formReset = document.querySelector('.ad-form__reset');
  formReset.addEventListener('click', function (evt) {
    // Добавьте обработчик кнопке очистки формы.
    evt.preventDefault();
    returnInitialPageState();
  });

  adForm.addEventListener('submit', function (evt) {
    validateRoomNumbers();
    evt.preventDefault();
    window.backend.upload(new FormData(adForm), window.map.errorHandler);
    returnInitialPageState();
  });

  /**
  * Функция удаления изображений из формы
  */
  // var removeFormPhotos = function () {
  //   document.querySelector('.ad-form-header__preview img').src = 'img/muffin-grey.svg';
  //   var formPhotos = document.querySelectorAll('.form__photo-container img');

  //   for (var i = 0; i < formPhotos.length; i++) {
  //     formPhotos[i].remove();
  //   }
  // };

  roomsNumberSelector.addEventListener('change', validateRoomNumbers);
  capacitySelector.addEventListener('change', validateRoomNumbers);

  window.form = {
    returnInitialPageState: returnInitialPageState,
  };
})();
