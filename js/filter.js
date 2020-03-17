'use strict';

(function () {
  var filters = document.querySelector('.map__filters');
  var typeOFHouse = filters.querySelector('#housing-type');

  var ontypeOFHouseChange = function () {
    var getValue = typeOFHouse.value;
    // console.log(getValue);
    alert(getValue)
  };

  typeOFHouse.addEventListener('change', ontypeOFHouseChange);


  // var filterType = function (item) {
  //   var selectedType = typeOFHouse.options[typeOFHouse.selectedIndex].value;
  //   return selectedType === DEFAULT_FILTER_VALUE ? true : item.offer.type === selectedType;
  // };

  // var select = document.getElementById('agriculture');

  // select.addEventListener('change', function() {
  //   var getValue = this.value;
  //   // this в этом контексте - элемент, который запустил фукнцию. То же, что и select.value;
  //   console.log( getValue );
  // });

  // var filterData = function (data) {
  //   return data
  //     .filter(function (item) {
  //       return filterType(item) && filterByRooms(item) && filterByGuests(item);
  //     })
  //     .slice(0, MAX_PIN_COUNT);
  // }


  // var pinSuccessHandler = function () {
  //   window.pin.removePins();
  //   var fragment = document.createDocumentFragment();
  //   var elementCount = window.filter.filterData(window.DATA).length;
  //   for (var i = 0; i < elementCount; i++) {
  //     fragment.appendChild(renderAd(window.server.getAdByIndex(i), i));
  //   }
  //   window.map.mapSection.appendChild(fragment);
  // };



  // typeOFHouse.onchange
  // mapPins.filter
  // typeOFHouse.addEventListener("click", once);
  // var currentTypeOFHouse = typeOFHouse.textContent;
  // currentTypeOFHouse.house.filter
})();

// Запрограммировать фильтр «Тип жилья». Помните, независимо от того сколько объявлений
// соответствует фильтру «Тип жилья» на карте не должно отображаться больше 5 объявлений.
// При изменении любого фильтра скрывать открытую карточку объявления.
