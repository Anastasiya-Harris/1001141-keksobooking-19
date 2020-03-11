'use strict';
// Popup.js — модуль, который работает с формой.

var mapPins = document.querySelector('.map__pins');
var pins = document.querySelectorAll('.map__pin');
var template = document.querySelector('#card').content.querySelector('.map__card');

var renderPopup = function () {
  var popupElement = template.cloneNode(true);
  return popupElement;
};

// var createPinMarkup = function (pinData) {
//   var pinItem = mapPinTemplate.cloneNode(true);
//   pinItem.querySelector('img').src = pinData.author.avatar;
//   pinItem.style.left = pinData.location.x + 'px';
//   pinItem.style.top = pinData.location.y + 'px';
//   pinItem.querySelector('img').alt = pinData.offer.title;
//   var onPinItemClick = function () {
//     var mapCardRemovable = map.querySelector('.map__card');
//     if (mapCardRemovable) {
//       mapCardRemovable.remove();
//     }
//     createAd(pinData);
//   };
//   pinItem.addEventListener('click', onPinItemClick);
//   return pinItem;
// };

var renderPins = function () {
  var fragment = document.createDocumentFragment();
  mapPins.appendChild(fragment);
};

pins.addEventListener('click', renderPins);


// var renderPinsMarkup = function (pinsData) {
//   var mapPinsFragment = document.createDocumentFragment();
//   pinsData.forEach(function (it) {
//     mapPinsFragment.appendChild(createPinMarkup(it));
//   });
//   mapPins.appendChild(mapPinsFragment);
// };


window.popup = {
  // successMessage: successMessage,
  // // onError: onError,
};

// 1 Отрисуйте сгенерированные DOM-элементы в блок .map__pins.
// Для вставки элементов используйте DocumentFragment.

// 2 На основе первого по порядку элемента из сгенерированного массива и шаблона #card
// создайте DOM-элемент объявления (карточка объявления), заполните его данными из объекта:

// 3 Если данных для заполнения не хватает, соответствующий блок в карточке скрывается.

// Вставьте полученный DOM-элемент в блок .map перед блоком.map__filters-container.
