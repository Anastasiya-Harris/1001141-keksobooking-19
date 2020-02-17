// form.js — модуль, который работает с формой объявления.
'use strict';
(function () {
  // Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»:
  var typeOfHouseSelector = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  var MIN_PRICES = {
    flat: 1000,
    bungalo: 0,
    house: 5000,
    palace: 10000
  };


  // Возвращает selected option, вызывает функцию установки мин. цены
  var onTypeOfHouseSelectorChange = function (evt) {
    typeOfHouseSelector.value = evt.target.value;
    var houseType = evt.target.value;
    setMinPrice(houseType);
  };

  // Функция установки мин. цены
  var setMinPrice = function (houseType) {
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

  roomsNumberSelector.addEventListener('change', validateRoomNumbers);
  capacitySelector.addEventListener('change', validateRoomNumbers);
})();
