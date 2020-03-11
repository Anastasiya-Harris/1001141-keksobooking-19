'use strict';
// Popup.js — модуль, который работает с формой.

// Показ объявления
var createPinMarkup = function (pinData) {
  var pinItem = mapPinTemplate.cloneNode(true);
  pinItem.querySelector('img').src = pinData.author.avatar;
  pinItem.style.left = pinData.location.x + 'px';
  pinItem.style.top = pinData.location.y + 'px';
  pinItem.querySelector('img').alt = pinData.offer.title;
  var onPinItemClick = function () {
    var mapCardRemovable = map.querySelector('.map__card');
    if (mapCardRemovable) {
      mapCardRemovable.remove();
    }
    createAd(pinData);
  };
  pinItem.addEventListener('click', onPinItemClick);
  return pinItem;
};

var renderPinsMarkup = function (pinsData) {
  var mapPinsFragment = document.createDocumentFragment();
  pinsData.forEach(function (it) {
    mapPinsFragment.appendChild(createPinMarkup(it));
  });
  mapPins.appendChild(mapPinsFragment);
};


window.popup = {
  // successMessage: successMessage,
  // // onError: onError,
};
