'use strict';
// map.js — модуль, который управляет карточками объявлений и метками: добавляет на страницу нужную карточку, отрисовывает метки и осуществляет взаимодействие карточки и метки на карте;
(function () {
  var MAIN_PIN_HEIGHT = 156;
  var MAIN_PIN_WIDTH = 156;
  var PIN_HEIGHT = 65;
  var PIN_WIDTH = 65;
  var PIN_TAIL_HEIGHT = 22;
  var ESC_KEYCODE = 'Escape';
  var MAIN_BUTTON_CODE = 0;

  var DEFAULT_MAIN_PIN_X = 600;
  var DEFAULT_MAIN_PIN_Y = 375;

  var main = document.querySelector('main');
  var fieldsets = main.querySelectorAll('fieldset');
  var mapFilters = main.querySelector('.map__filters');
  var adForm = main.querySelector('.ad-form');
  var map = main.querySelector('.map');
  var adFormResetButton = adForm.querySelector('.ad-form__reset');
  var mapPinMain = main.querySelector('.map__pin--main');
  var addressInput = main.querySelector('#address');


  var loadedAdvertisings = [];

  var onChangeFilter = function () {
    window.filter.onSortPins(loadedAdvertisings);
  };

  var onDebounceSortingPins = window.debounce.delay(onChangeFilter);

  // Неактивное состояние.
  var startFilter = function () {
    mapFilters.addEventListener('change', onDebounceSortingPins);
  };

  var stopFilter = function () {
    mapFilters.removeEventListener('change', onDebounceSortingPins);
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

  // Блокирует формы
  var disactivateMap = function () {
    addFormDisabled();
    addMapDisabled();
    setInitialAddress(mapPinMain);
    mapPinMain.style.top = DEFAULT_MAIN_PIN_Y + 'px';
    mapPinMain.style.left = DEFAULT_MAIN_PIN_X + 'px';
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

  // Деактивирует страницу
  var disactivatePage = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.pin.remove();
    addFormDisabled();
    adForm.reset();
    window.filter.closePopup();
    mapFilters.reset();
    disactivateMap();
    stopFilter();
    // setInitialAddress(mapPinMain);
  };

  var onError = function (errorMessage) {
    renderErrorMessage(errorMessage);
  };

  var renderErrorMessage = function (errorMessage) {
    var templateError = document.querySelector('#error').cloneNode(true).content;
    var errorText = templateError.querySelector('.error__message');
    var errorButton = templateError.querySelector('.error__button');

    var onErrorMessageKeydown = function (evt) {
      onEscKeydown(evt, closeError);
    };

    var onCloseErrorBtnClick = function (evt) {
      onMainButtonClick(evt, closeError);
    };

    errorText.textContent = errorMessage;
    main.appendChild(templateError);
    document.addEventListener('keydown', onErrorMessageKeydown);
    errorButton.addEventListener('click', onCloseErrorBtnClick);

    var closeError = function () {
      var error = document.querySelector('.error');
      error.remove();
      disactivateMap();
      document.removeEventListener('keydown', onErrorMessageKeydown);
      errorButton.removeEventListener('click', onCloseErrorBtnClick);
    };
  };

  var onEscKeydown = function (evt, func) {
    if (evt.code === ESC_KEYCODE) {
      func();
    }
  };

  var onMainButtonClick = function (evt, func) {
    if (evt.button === MAIN_BUTTON_CODE) {
      func();
    }
  };

  var renderSuccessMessage = function () {
    var successTemplate = document.querySelector('#success').content;
    var messageElement = successTemplate.cloneNode(true);
    main.appendChild(messageElement);
    document.addEventListener('keydown', onSuccessMessageKeydown);
    document.addEventListener('click', onSuccessMessageClick);
  };

  var onSuccessMessageKeydown = function (evt) {
    onEscKeydown(evt, removeSuccessMessage);
  };

  var onSuccessMessageClick = function (evt) {
    onMainButtonClick(evt, removeSuccessMessage);
  };

  // Универсальная функция закрытия окна
  var removeSuccessMessage = function () {
    var success = document.querySelector('.success');
    success.remove();
    document.removeEventListener('keydown', onSuccessMessageKeydown);
    document.removeEventListener('click', onSuccessMessageClick);
  };

  // Отправляет содержимое формы на сервер
  var onSubmitForm = function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(adForm), function () {
      renderSuccessMessage();
      disactivateMap();
      disactivatePage();
    }, onError);

    mapPinMain.addEventListener('click', onMainPinMousedown, {once: true});
  };

  adForm.addEventListener('submit', onSubmitForm);

  // Обработчик кнопки сброса
  var onResetButtonClick = function (evt) {
    evt.preventDefault();
    window.filter.closePopup();
    disactivatePage();
    mapPinMain.addEventListener('click', onMainPinMousedown);
  };

  // Сбрасывает форму
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
    var x = pin.offsetLeft + Math.ceil(MAIN_PIN_WIDTH / 2);
    var y = pin.offsetTop + Math.ceil(MAIN_PIN_HEIGHT / 2);
    updateAddress(x, y);
  }

  // Координаты дефолтной метки по указателю
  function setCurrentAddress(pin) {
    var x = pin.offsetLeft + Math.ceil(PIN_WIDTH / 2);
    var y = pin.offsetTop + Math.ceil(PIN_HEIGHT + PIN_TAIL_HEIGHT);
    updateAddress(x, y);
  }


  // map.js Активация карты
  var onMainPinMousedown = function (evt) {
    if (evt.button === 0) {
      activateMap();
      setInitialAddress(mapPinMain);
    }
  };
  // Третий аргумент говорит что событие должно произойти 1 раз, затем обработкик удалится
  mapPinMain.addEventListener('click', onMainPinMousedown, {once: true});


  window.map = {
    PIN_HEIGHT: PIN_HEIGHT,
    PIN_WIDTH: PIN_WIDTH,
    PIN_TAIL_HEIGHT: PIN_TAIL_HEIGHT,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    setCurrentAddress: setCurrentAddress,
  };
})();
