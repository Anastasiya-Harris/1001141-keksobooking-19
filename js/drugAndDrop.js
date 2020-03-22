'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');

  var DrugLimit = {
    X: {
      MIN: 0,
      MAX: 1200
    },
    Y: {
      MIN: 130,
      MAX: 630
    }
  };

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

      var mapPinMainPosition = {
        x: mapPinMain.offsetLeft - shift.x,
        y: mapPinMain.offsetTop - shift.y
      };

      var Border = {
        TOP: DrugLimit.Y.MIN - mapPinMain.offsetHeight - window.map.PIN_TAIL_HEIGHT,
        BOTTOM: DrugLimit.Y.MAX - mapPinMain.offsetHeight - window.map.PIN_TAIL_HEIGHT,
        LEFT: DrugLimit.X.MIN - window.map.PIN_WIDTH / 2,
        RIGHT: DrugLimit.X.MAX - mapPinMain.offsetWidth + window.map.PIN_WIDTH / 2
      };

      if (mapPinMainPosition.x >= Border.LEFT && mapPinMainPosition.x <= Border.RIGHT) {
        mapPinMain.style.left = mapPinMainPosition.x + 'px';
      }
      if (mapPinMainPosition.y >= Border.TOP && mapPinMainPosition.y <= Border.BOTTOM) {
        mapPinMain.style.top = mapPinMainPosition.y + 'px';
      }

      window.map.setCurrentAddress(mapPinMain);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.map.setCurrentAddress(mapPinMain);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
