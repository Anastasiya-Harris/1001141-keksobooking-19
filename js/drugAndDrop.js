'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  // var addressInput = document.querySelector('#address');

  // var template = document.querySelector('#pin').content.querySelector('.map__pin');
  // window.map.setCurrentAddress / // Ловит позицию метки и передаёт в инпут адрес
  // window.map.setInitialAddress / // Координаты дефолтной метки по указателю


  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  });


  // window.drugAndDrop = {
  //   getCoordinate: getCoordinate,
  // };
})();
