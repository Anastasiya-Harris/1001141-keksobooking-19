'use strict';
// Popup.js — модуль, который работает с формой.

(function () {

  var houseType = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var template = document.querySelector('#card').content.querySelector('.map__card');
  var map = document.querySelector('.map');

  // Создаёт DOM-элемент карточки объявления на карте
  var renderPopup = function (pin) {
    var popupElement = template.cloneNode(true);
    var onClosePopup = window.filter.closePopup;
    popupElement.querySelector('img').src = pin.author.avatar;

    popupElement.querySelector('.popup__title').textContent = pin.offer.title;
    popupElement.querySelector('.popup__text--address').textContent = pin.offer.address;
    popupElement.querySelector('.popup__text--price').textContent = pin.offer.price;
    popupElement.querySelector('.popup__description').textContent = pin.offer.description;
    popupElement.querySelector('.popup__type').textContent = houseType[pin.offer.type];
    popupElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
    popupElement.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';

    // Получает список удобств, готовит шаблон удобств, удаляет список
    var features = popupElement.querySelectorAll('.popup__feature');

    // если в объявлении есть удобства, добавляем их в зачищенный список, иначе удаляем их из разметки
    for (var i = 0; i < features.length; i++) {
      if (pin.offer.features.indexOf(features[i].classList[1].replace('popup__feature--', '')) === -1) {
        features[i].remove();
      }
    }

    var photo = popupElement.querySelector('.popup__photos');
    photo.innerHTML = '';

    for (i = 0; i < pin.offer.photos.length; i++) {
      var img = document.createElement('img');
      img.src = pin.offer.photos[i];
      img.alt = 'Фотография жилья';
      img.width = 45;
      img.height = 40;
      img.classList.add('popup__photo');

      photo.appendChild(img);
    }

    var buttonClose = popupElement.querySelector('.popup__close');


    var ESC_KEYCODE = 'Escape';

    var onEscDown = function (evt, func) {
      if (evt.code === ESC_KEYCODE) {
        func();
      }
    };

    var onPopupEscPress = function (evt) {
      if (evt.key === ESC_KEYCODE) {
        onClosePopup();
      }
    };

    var onCardEscKeyDown = function (evt) {
      onEscDown(evt, onClosePopup);
    };

    var filterContainer = map.querySelector('.map__filters-container');

    filterContainer.before(popupElement);

    document.addEventListener('keydown', onCardEscKeyDown, {once: true});
    buttonClose.addEventListener('click', onClosePopup, {once: true});
    document.addEventListener('keydown', onPopupEscPress, {once: true});
  };

  window.popup = {
    render: renderPopup,
  };
})();

