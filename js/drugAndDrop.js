'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  // var addressInput = document.querySelector('#address');

  // var template = document.querySelector('#pin').content.querySelector('.map__pin');
  // window.map.setCurrentAddress / // Ловит позицию метки и передаёт в инпут адрес
  // window.map.setInitialAddress / // Координаты дефолтной метки по указателю


  mapPinMain.addEventListener('mousedown', getCoordinate, {once: true});

  var getCoordinate = function (evt) {
    evt.preventDefault();
    window.addEventListener('mousemove', getCoordinate, {once: true});
    mapPinMain.addEventListener('mouseup');
  };


  window.drugAndDrop = {
    getCoordinate: getCoordinate,
  };
})();
