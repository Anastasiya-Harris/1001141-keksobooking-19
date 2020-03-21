'use strict';

(function () {
  var MAX_ADS_COUNT = 5;

  var Price = {
    LOW: 10000,
    MIDDLE: 50000,
    HIGH: 50000
  };

  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingQuests = mapFilters.querySelector('#housing-guests');
  var housingFeatures = mapFilters.querySelector('#housing-features');

  var filterType = function (data) {
    // возращает true если
    return data.offer.type === housingType.value || housingType.value === 'any';
  };

  // Сортирует по цене
  var filterPriceMiddle = function (data) {
    var it = housingPrice.value;
    var count = +data.offer.price;
    switch (it) {
      case 'low':
        return count < Price.LOW;
      case 'high':
        return count >= Price.HIGH;
      case 'middle':
        return count < Price.HIGH && count > Price.LOW;
      default:
        return true;
    }
  };

  // Сортирует по кол-ву комнат
  var filterRooms = function (data) {
    var it = +housingRooms.value;
    var count = +data.offer.rooms;
    return it === count || housingRooms.value === 'any';
  };

  // Сортирует по кол-ву гостей
  var filterGuest = function (data) {
    var it = +housingQuests.value;
    var count = +data.offer.guests;
    return it === count || housingQuests.value === 'any';
  };

  // Сортирует по удобствам
  var filterFeatures = function (data) {
    // преобразованный массив удобств из псевдо масива
    // на псевдо массиве не работает every и т.п.

    var inputFeatures = Array.from(housingFeatures.querySelectorAll('input:checked'));

    // массив с удобствами
    var sumFeatures = data.offer.features;

    return inputFeatures.every(function (inputElement) {
      return sumFeatures.some(function (featuresElement) {
        return featuresElement === inputElement.value;
      });
    });

  };


  var closePopup = function () {
    var popup = document.querySelector('.popup');

    if (popup) {
      popup.remove();
    }
  };

  var deletePin = function () {
    var Pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    Pins.forEach(function (pin) {
      pin.remove();
    });
  };


  // Фильтрует данные
  var onSortPins = function (data) {
    window.pin.removePins();

    deletePin();

    var i = 0;
    var filtredAdvertisings = [];

    while (i < data.length && filtredAdvertisings.length < MAX_ADS_COUNT) {
      var advertising = data[i];
      if (filterType(advertising) && filterPriceMiddle(advertising) && filterRooms(advertising) && filterGuest(advertising) && filterFeatures(advertising)) {
        filtredAdvertisings.push(advertising);
      }
      i++;
    }
    closePopup();
    // отрисовываем массив
    window.pin.renderPins(filtredAdvertisings);
  };

  window.filter = {
    onSortPins: onSortPins,
    closePopup: closePopup,
  };
})();
