'use strict';
// map.js — модуль, который управляет карточками объявлений и метками: добавляет на страницу нужную карточку, отрисовывает метки и осуществляет взаимодействие карточки и метки на карте;

(function () {
  var MAIN_PIN_HEIGHT = 156;
  var MAIN_PIN_WIDTH = 156;
  var PIN_HEIGHT = 50;
  var PIN_WIDTH = 70;
  var MAX_ADS_COUNT = 5;

  // 1) Неактивное состояние.
  var fieldsets = document.querySelectorAll('fieldset');
  var mapFilters = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var adFormResetButton = adForm.querySelector('.ad-form__reset');


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


  // 2) Переводит страницу в активный режим.
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
    if (ads.length > MAX_ADS_COUNT) {
      var adsResalt = ads.splice(0, MAX_ADS_COUNT);
      window.pin.renderPins(adsResalt);
    }
  };

  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  // Деактивирует страницу
  var disactivatePage = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.pin.removePins();
    addFormDisabled();
    disactivateMap();
    // successMessage();
    window.popup.successMessage(successTemplate);
  };

  // Сбрасывает форму
  var formReset = function (evt) {
    window.backend.upload(new FormData(adForm), function (response) {
      adForm.reset();
      disactivatePage();
    });

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
    window.backend.load(onSuccess, window.backend.onError);
    removeDisabled();
  };

  disactivateMap();

  // 3) Заполнение поля адреса при mousedown на mapPinMain
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


  // 1 Доработайте обработчик отправки формы, так чтобы он отменял действие по умолчанию preventDefault
  // и отправлял данные формы на сервер посредством XHR https://js.dump.academy/keksobooking.

  // 2 После успешной передачи данных на сервер верните страницу в неактивное состояние и сбросьте форму.

  // 3 Если отправка данных прошла успешно, показывается сообщение #success внутри шаблона template.
  // Сообщение должно исчезать по Esc и по клику на произвольную область экрана.

  // 4 Если произошла ошибка запроса, покажите в main сообщение #error в шаблоне template,
  // Сообщение должно исчезать после нажатия на кнопку .error__button, по нажатию на клавишу Esc и по клику на произвольную область экрана.

  // 5 Добавьте обработчик кнопке очистки формы.
  window.map = {
    PIN_HEIGHT: PIN_HEIGHT,
    PIN_WIDTH: PIN_WIDTH,
    disactivateMap: disactivateMap,
    addMapDisabled: addMapDisabled,
    onSuccess: onSuccess,
    // onError: onError,
  };
})();
