'use strict';
// Popup.js — модуль, который работает с формой.

(function () {
  var template = document.querySelector('#card').content.querySelector('.map__card');
  var map = document.querySelector('.map');

  var removeActiveClass = function () {
    var activePin = map.querySelector('.map__pin--active');

    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  var closePopup = function () {
    var popup = map.querySelector('.popup');

    if (popup) {
      popup.remove();
    }

    removeActiveClass();
  };

  // Создаёт DOM-элемент карточки объявления на карте
  var renderPopup = function (pin) {
    var popupElement = template.cloneNode(true);


    popupElement.querySelector('img').src = pin.author.avatar;

    popupElement.querySelector('.popup__title').textContent = pin.offer.title;
    popupElement.querySelector('.popup__text--address').textContent = pin.offer.address;
    popupElement.querySelector('.popup__text--price').textContent = pin.offer.price;
    popupElement.querySelector('.popup__description').textContent = pin.offer.description;
    popupElement.querySelector('.popup__type').textContent = pin.offer.type;
    popupElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
    popupElement.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';

    // Получает список удобств, готовит шаблон удобств, удаляет список
    var features = popupElement.querySelectorAll('.popup__feature');

    // если в объявлении есть удобства, добавляем их в зачищенный список,
    // иначе удаляем его из разметки
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
    buttonClose.addEventListener('click', closePopup, {once: true});


    var onCardEscKeyDown = function (evt) {
      window.map.onEscDown(evt, closePopup);
    };


    var filterContainer = map.querySelector('.map__filters-container');

    filterContainer.before(popupElement);
    // return popupElement;
    document.addEventListener('keydown', onCardEscKeyDown);
  };

  window.popup = {
    renderPopup: renderPopup,
    closePopup: closePopup,
  };
})();

// 1 Отрисуйте сгенерированные DOM-элементы в блок .map__pins.
// Для вставки элементов используйте DocumentFragment.

// 2 На основе первого по порядку элемента из сгенерированного массива и шаблона #card
// создайте DOM-элемент объявления (карточка объявления), заполните его данными из объекта:

// 3 Если данных для заполнения не хватает, соответствующий блок в карточке скрывается.

// Вставьте полученный DOM-элемент в блок .map перед блоком.map__filters-container.
