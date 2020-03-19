'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingQuests = mapFilters.querySelector('#housing-guests');
  var housingFeatures = mapFilters.querySelector('#housing-features');

  var housing = [];

  var Price = {
    LOW: 10000,
    MIDDLE: 50000,
    HIGH: 50000
  };
  var filterType = function (data) {
    // возращает true если
    return data.offer.type === housingType.value || housingType.value === 'any';
  };

  // функция сортировке по цене

  var filterPriceMiddle = function (data) {
    var it = housingPrice.value;
    var count = +data.offer.price;
    switch (it) {
      case 'low':
        // if (it === 'low')
        return count < Price.LOW;
        // break не работает вместе с return;
      case 'high':
        return count >= Price.HIGH;
        // break;
      case 'middle':
        return count < Price.HIGH && count > Price.LOW;
        // break;
      default:
        return true;
        // break;
    }
  };

  // функция сортировке по кол-ву комнат

  var filterRooms = function (data) {
    debugger;
    var it = +housingRooms.value;
    var count = +data.offer.rooms;
    return it === count || housingRooms.value === 'any';
  };

  // функция сортировке по кол-ву гостей

  var filterGuest = function (data) {
    var it = +housingQuests.value;
    var count = +data.offer.guests;
    return it === count || housingQuests.value === 'any';
  };

  // сортировка по удобствам

  var filterFeatures = function (data) {
    debugger;
    // преобразованный массив удобств из псевдо масива
    // на псевдо массиве не работает every и т.п.

    var inputFeatures = Array.from(housingFeatures.querySelectorAll('input:checked'));

    // массив с удобствами
    var sumFeatures = data.offer.features;
    // возвращает те значения которые удовлетворяют следующим условиям: в data.offer.features (каждого обьекта в массиве data) есть хотя бы одно значения инпута из массива inputFeatures
    // сравниваем каждое значение элемента массива чекнутых инпутов inputFeatures
    // с каждым элементом массива удобств sumFeatures
    return inputFeatures.every(function (inputElement) {
      // every так как проверям ВСЕ ли элементы равны условиям функции(то есть возратят true после выполнения условий функции)
      return sumFeatures.some(function (featuresElement) {
        // some так как проверяем есть ли ОДНО такое значение в массиве значений = и если хоть одно есть то возвращает true

        return featuresElement === inputElement.value;

      });
    });

  };

  // Фильтр данных
  var onSortPins = function (data) {

    debugger;
    // скрываем открытую карточку обьявдения
    // var mapCard = document.querySelector('.map__card');
    // if (mapCard) {
    //   mapCard.classList.add('visually-hidden');
    // }
    // чистим то что до этого нарисовали
    window.pin.removePins();

    // var deletePins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    // deletePins.forEach(function (pins) {
    //   pins.remove();
    // });
    var i = 0;

    var housingCopy = [];
    while (i < housing.length && housingCopy.length < 5) {
      debugger;
      data = housing[i];
      if (filterType(data) && filterPriceMiddle(data) && filterRooms(data) && filterGuest(data) && filterFeatures(data)) {
        housingCopy.push(data);
      }
      i++;
    }

    // отрисовываем массив
    window.pin.renderPins(housingCopy);
  };

  var startFilter = function () {
    window.debounce.debounce(onSortPins);
  };

  mapFilters.addEventListener('change', startFilter());


  // var onFilterChange = window.debounce.debounce(function () {
  //   filteredData = data.slice(0);
  //   filteredData = filteredData.filter(filterType).filter(filterPriceMiddle).filter(filterRooms).filter(filterGuest).filter(filterFeatures);
  //   window.pin.removePins();
  //   window.popup.closePopup();
  //   // window.map.renderPinsMarkup(filteredData.slice(0, PINS_LIMIT));
  // });
  // mapFilters.addEventListener('change', onFilterChange);
  // onSortPins();


  // onSortPins();
  window.filter = {
    onSortPins: onSortPins,
    // onSortPins: onSortPins
  };
})();

