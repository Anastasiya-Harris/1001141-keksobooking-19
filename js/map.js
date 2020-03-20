'use strict';
// map.js — модуль, который управляет карточками объявлений и метками: добавляет на страницу нужную карточку, отрисовывает метки и осуществляет взаимодействие карточки и метки на карте;

(function () {
  var MAIN_PIN_HEIGHT = 156;
  var MAIN_PIN_WIDTH = 156;
  var PIN_HEIGHT = 50;
  var PIN_WIDTH = 70;
  var buttonClose = document.querySelector('.popup__close');
  // var MAX_ADS_COUNT = 5;

  // Неактивное состояние.
  var fieldsets = document.querySelectorAll('fieldset');
  var mapFilters = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var adFormResetButton = adForm.querySelector('.ad-form__reset');

  var loadedAdvertisings = [];

  var onChangeFilter = function () {
    window.filter.onSortPins(loadedAdvertisings);

    // buttonClose.addEventListener('click', function (evt) {
    //   window.popup.closePopup();
    //   evt.currentTarget.classList.add('map__pin--active');
    // });
    // onCardEscKeyDown();
    // закрывать открытую карточку объявления
    // window.popup.closePopup();
  };


  var debounceOnSortPins = window.debounce.debounce(onChangeFilter);

  var startFilter = function () {
    mapFilters.addEventListener('change', debounceOnSortPins);
  };

  var stopFilter = function () {
    mapFilters.removeEventListener('change', debounceOnSortPins);
  };


  var addFormDisabled = function () {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].setAttribute('disabled', 'disabled');
    }
  };

  var addMapDisabled = function () {
    for (var i = 0; i < mapFilters.length; i++) {
      mapFilters[i].setAttribute('disabled', 'disabled');
    }
  };

  var mapPinMain = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');

  // Блокирует формы
  var disactivateMap = function () {
    addFormDisabled();
    addMapDisabled();
    setInitialAddress(mapPinMain);
  };


  // Переводит страницу в активный режим.
  var removeFormDisabled = function () {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = false;
    }
  };

  var removeMapDisabled = function () {
    for (var i = 0; i < mapFilters.length; i++) {
      mapFilters[i].disabled = false;
    }
  };

  var removeDisabled = function () {
    adForm.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
    removeFormDisabled();
    removeMapDisabled();
  };

  var onSuccess = function (ads) {
    loadedAdvertisings = ads;
    window.filter.onSortPins(loadedAdvertisings);
    startFilter();
  };

  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  // Деактивирует страницу
  var disactivatePage = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.pin.removePins();
    addFormDisabled();
    disactivateMap();
    successMessage(successTemplate);
    stopFilter();
  };

  var onError = function (errorMessage) {
    renderErrorMessage(errorMessage);
  };

  var renderErrorMessage = function (errorMessage) {
    var main = document.querySelector('main');
    var templateError = document.querySelector('#error').cloneNode(true).content;
    var errorText = templateError.querySelector('.error__message');
    var errorButton = templateError.querySelector('.error__button');

    errorText.textContent = errorMessage;
    main.appendChild(templateError);
    document.addEventListener('keydown', onMessageKeydown, {once: true});
    errorButton.addEventListener('click', onCloseErrorBtnClick, {once: true});
  };

  var onMessageKeydown = function (evt) {
    onEscDown(evt, closeError);
  };

  var closeError = function () {
    var errorMessage = document.querySelector('.error');
    errorMessage.remove();
  };

  var onCloseErrorBtnClick = function () {
    closeError();
    adForm.reset();
    disactivateMap();
  };

  // Универсальная функция закрытия окна//////
  var ESC_KEYCODE = 'Escape';

  var onEscDown = function (evt, func) {
    if (evt.code === ESC_KEYCODE) {
      func();
    }
  };

  var main = document.querySelector('main');

  var successMessage = function (messageTemplate) {
    var messageElement = messageTemplate.cloneNode(true);
    main.appendChild(messageElement);
    document.addEventListener('keydown', onMessageClick);

    var onSuccesMessageKeydown = function (evt) {
      if (evt.key === 'Escape') {
        main.removeChild(messageElement);
        document.removeEventListener('keydown', onSuccesMessageKeydown);
      }
    };
    // var onMessageClick = function (evt) {
    //   if (evt.target.closest('div')) {
    //     main.remove(messageElement);
    //     document.removeEventListener('keydown', onMessageClick);
    //   }
    // };
    document.addEventListener('keydown', onSuccesMessageKeydown);
    document.addEventListener('click', onMessageClick);
  };

  var onMessageClick = function (evt) {
    var success = document.querySelector('.success');
    if (evt.target !== successMessage) {
      success.classList.add('hidden');
      document.removeEventListener('keydown', onMessageClick);
    }
  };

  // Сбрасывает форму
  var formReset = function (evt) {
    window.backend.upload(new FormData(adForm), function () {
      adForm.reset();
      disactivatePage();
    }, onError);

    evt.preventDefault();
    mapPinMain.addEventListener('click', onMainPinMousedown, {once: true});
  };

  adForm.addEventListener('submit', formReset);

  // обработчик кнопки сброса
  var onResetButtonClick = function (evt) {
    evt.preventDefault();
    disactivatePage();
  };


  adFormResetButton.addEventListener('click', onResetButtonClick);


  var activateMap = function () {
    window.backend.load(onSuccess, onError);
    removeDisabled();
  };

  disactivateMap();

  // Заполнение поля адреса при mousedown на mapPinMain
  function updateAddress(x, y) {
    addressInput.value = x + ', ' + y;
  }

  // Ловит позицию метки и передаёт в инпут адрес
  function setInitialAddress(pin) {
    var x = pin.offsetLeft + PIN_WIDTH / 2;
    var y = pin.offsetTop + PIN_HEIGHT;
    updateAddress(x, y);
  }

  // Координаты дефолтной метки по указателю
  function setCurrentAddress(pin) {
    var x = pin.offsetLeft + MAIN_PIN_WIDTH / 2;
    var y = pin.offsetTop + MAIN_PIN_HEIGHT / 2;
    updateAddress(x, y);
  }


  // map.js Активация карты
  var onMainPinMousedown = function (evt) {
    if (evt.button === 0) {
      activateMap();
      setCurrentAddress(mapPinMain);
    }
  };
  // Третий аргумент говорит что событие должно произойти 1 раз, затем обработкик удалится
  mapPinMain.addEventListener('click', onMainPinMousedown, {once: true});


  window.map = {
    PIN_HEIGHT: PIN_HEIGHT,
    PIN_WIDTH: PIN_WIDTH,
    setCurrentAddress: setCurrentAddress,
    onEscDown: onEscDown,
    disactivateMap: disactivateMap,
    addMapDisabled: addMapDisabled,

  };
})();
