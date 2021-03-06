// form.js — модуль, который работает с формой объявления.
'use strict';
(function () {
  // Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»:
  var MIN_PRICES = {
    flat: 1000,
    bungalo: 0,
    house: 5000,
    palace: 10000
  };

  var typeOfHouseSelector = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  var roomsNumberSelector = document.querySelector('#room_number');
  var capacitySelector = document.querySelector('#capacity');
  var timeInSelector = document.querySelector('#timein');
  var timeOutSelector = document.querySelector('#timeout');

  // Устанавиливает зависимость времени заселения и выселения
  var onTimeInSelectorChange = function (evt) {
    timeOutSelector.value = evt.target.value;
  };

  var onTimeOutSelectorChange = function (evt) {
    timeInSelector.value = evt.target.value;
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
  function onRoomNumbersChange() {
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

  roomsNumberSelector.addEventListener('change', onRoomNumbersChange);
  capacitySelector.addEventListener('change', onRoomNumbersChange);
  timeInSelector.addEventListener('change', onTimeInSelectorChange);
  timeOutSelector.addEventListener('change', onTimeOutSelectorChange);
})();
