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
  var onSortPins = function () {
    console.log(1)
    debugger;
    // скрываем открытую карточку обьявдения
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.classList.add('visually-hidden');
    }
    // чистим то что до этого нарисовали
    window.pin.removePins();

    // var deletePins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    // deletePins.forEach(function (pins) {
    //   pins.remove();
    // });
    var i = 0;
    var housingCopy = [];
    while (i < housing.length && housingCopy.length < 5) {
      var data = housing[i];
      if (filterType(data) && filterPriceMiddle(data) && filterRooms(data) && filterGuest(data) && filterFeatures(data)) {
        housingCopy.push(data);
      }
      i++;
    }

    // отрисовываем массив
    window.pin.renderPins(housingCopy);
  };

  mapFilters.addEventListener('change', window.debounce.debounce(onSortPins));

  // onSortPins();
  window.filter = {
    onSortPins: onSortPins,
    // onSortPins: onSortPins
  };
})();

// (function () {
//   var MAX_ADS_COUNT = 5;

//   var PriceRange = {
//     LOW: {
//       MIN: 0,
//       MAX: 10000
//     },
//     MIDDLE: {
//       MIN: 10000,
//       MAX: 50000
//     },
//     HIGH: {
//       MIN: 50000,
//       MAX: Infinity
//     }
//   };

//   var filter = document.querySelector('.map__filters');
//   var filterItems = filter.querySelectorAll('select, input');
//   var typeOFHouse = filter.querySelector('#housing-type');
//   var priceSelect = filter.querySelector('#housing-price');
//   var quantityOfRooms = filter.querySelector('#housing-rooms');
//   var quantityOfGuests = filter.querySelector('#housing-guests');
//   var features = filter.querySelector('#housing-features');
//   var data = [];
//   var filteredData = [];

//   var filtrationItem = function (it, item, key) {
//     return it.value === 'any' ? true : it.value === item[key].toString();
//   };

//   var filtrationByType = function (item) {
//     return filtrationItem(typeOFHouse, item.offer, 'type');
//   };

//   var filtrationByPrice = function (item) {
//     var filteringPrice = PriceRange[priceSelect.value.toUpperCase()];
//     return filteringPrice ? item.offer.price >= filteringPrice.MIN && item.offer.price <= filteringPrice.MAX : true;
//   };

//   var filtrationByRooms = function (item) {
//     return filtrationItem(quantityOfRooms, item.offer, 'rooms');
//   };

//   var filtrationByGuests = function (item) {
//     return filtrationItem(quantityOfGuests, item.offer, 'guests');
//   };

//   var filtrationByFeatures = function (item) {
//     var checkedFeaturesItems = features.querySelectorAll('input:checked');
//     return Array.from(checkedFeaturesItems).every(function (element) {
//       return item.offer.features.includes(element.value);
//     });
//   };

//   var onFilterChange = window.debounce.debounce(function () {
//     debugger;
//     filteredData = data.slice(0);
//     filteredData = filteredData.filter(filtrationByType).filter(filtrationByPrice).filter(filtrationByRooms).filter(filtrationByGuests).filter(filtrationByFeatures);
//     window.pin.removePins();
//     window.popup.closePopup();
//     // window.map.renderPinsMarkup(filteredData.slice(0, MAX_ADS_COUNT));
//   });

//   // Дизейбл для форм
//   var activateFilter = function () {
//     filterItems.forEach(function (it) {
//       it.disabled = false;
//     });
//     onFilterChange();
//     debugger;
//     filter.addEventListener('change', onFilterChange);
//   };

//   var resetFilter = function () {
//     filterItems.forEach(function (it) {
//       it.value = 'any';
//     });
//     var featuresItems = features.querySelectorAll('input');
//     featuresItems.forEach(function (feature) {
//       feature.checked = false;
//     });
//   };

//   var deactivateFilter = function () {
//     filterItems.forEach(function (it) {
//       it.disabled = true;
//     });
//     resetFilter();
//     filter.removeEventListener('change', onFilterChange);
//   };

//   var activateFiltration = function (adData) {
//     data = adData.slice(0);
//     activateFilter();
//     return adData.slice(0, MAX_ADS_COUNT);
//   };

//   var deactivateFiltration = function () {
//     deactivateFilter();
//   };

//   window.filter = {
//     activate: activateFiltration,
//     deactivate: deactivateFiltration
//   };
// })();


// 'use strict';

// (function () {
//   var filters = document.querySelector('.map__filters');
//   var typeOFHouse = filters.querySelector('#housing-type');
//   var adverts = [];
//   var advertsData = [];

//   var ontypeOFHouseChange = function () {
//     var getValue = typeOFHouse.value;
//     // console.log(getValue);
//     alert(getValue);
//   };

//   var valueToAnotherValue = {
//     'palace': 'palace',
//     'flat': 'flat',
//     'house': 'house',
//     'bungalo': 'bungalo',
//   };

//   var onSuccess = function (ads) {
//     advertsData = ads;
//     window.pins.render(getSortedArray(advertsData));
//   };

//   var getSortedArray = ads.filter(function (ads) {
//     return ads.offer.type === 'prop';
//   });

//   typeOFHouse.addEventListener('change', ontypeOFHouseChange);
