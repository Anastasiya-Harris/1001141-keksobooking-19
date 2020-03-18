'use strict';

(function () {
  var MAX_ADS_COUNT = 5;

  var PriceRange = {
    LOW: {
      MIN: 0,
      MAX: 10000
    },
    MIDDLE: {
      MIN: 10000,
      MAX: 50000
    },
    HIGH: {
      MIN: 50000,
      MAX: Infinity
    }
  };

  var filter = document.querySelector('.map__filters');
  var filterItems = filter.querySelectorAll('select, input');
  var typeOFHouse = filter.querySelector('#housing-type');
  var priceSelect = filter.querySelector('#housing-price');
  var quantityOfRooms = filter.querySelector('#housing-rooms');
  var quantityOfGuests = filter.querySelector('#housing-guests');
  var features = filter.querySelector('#housing-features');
  var data = [];
  var filteredData = [];

  var filtrationItem = function (it, item, key) {
    return it.value === 'any' ? true : it.value === item[key].toString();
  };

  var filtrationByType = function (item) {
    return filtrationItem(typeOFHouse, item.offer, 'type');
  };

  var filtrationByPrice = function (item) {
    var filteringPrice = PriceRange[priceSelect.value.toUpperCase()];
    return filteringPrice ? item.offer.price >= filteringPrice.MIN && item.offer.price <= filteringPrice.MAX : true;
  };

  var filtrationByRooms = function (item) {
    return filtrationItem(quantityOfRooms, item.offer, 'rooms');
  };

  var filtrationByGuests = function (item) {
    return filtrationItem(quantityOfGuests, item.offer, 'guests');
  };

  var filtrationByFeatures = function (item) {
    var checkedFeaturesItems = features.querySelectorAll('input:checked');
    return Array.from(checkedFeaturesItems).every(function (element) {
      return item.offer.features.includes(element.value);
    });
  };

  var onFilterChange = window.debounce.debounce(function () {
    debugger;
    filteredData = data.slice(0);
    filteredData = filteredData.filter(filtrationByType).filter(filtrationByPrice).filter(filtrationByRooms).filter(filtrationByGuests).filter(filtrationByFeatures);
    window.pin.removePins();
    window.popup.closePopup();
    // window.map.renderPinsMarkup(filteredData.slice(0, MAX_ADS_COUNT));
  });

  // Дизейбл для форм
  var activateFilter = function () {
    filterItems.forEach(function (it) {
      it.disabled = false;
    });
    onFilterChange();
    filter.addEventListener('change', onFilterChange);
  };

  var resetFilter = function () {
    filterItems.forEach(function (it) {
      it.value = 'any';
    });
    var featuresItems = features.querySelectorAll('input');
    featuresItems.forEach(function (feature) {
      feature.checked = false;
    });
  };

  var deactivateFilter = function () {
    filterItems.forEach(function (it) {
      it.disabled = true;
    });
    resetFilter();
    filter.removeEventListener('change', onFilterChange);
  };

  var activateFiltration = function (adData) {
    data = adData.slice(0);
    activateFilter();
    return adData.slice(0, MAX_ADS_COUNT);
  };

  var deactivateFiltration = function () {
    deactivateFilter();
  };

  window.filter = {
    activate: activateFiltration,
    deactivate: deactivateFiltration
  };
})();
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
