'use strict';
// load.js — модуль, который загружает данные;
(function () {
  var Url = {
    GET: 'https://js.dump.academy/keksobooking/data/',
    POST: 'https://js.dump.academy/keksobooking'
  };

  var StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    UNATHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
  };

  var TIMEOUT_IN_MS = 1000;
  var MAX_ADS_COUNT = 5;

  var errorMessage = '';
  // var load = function (onSuccess, onError) {
  //   var xhr = new XMLHttpRequest();
  //   xhr.responseType = 'json';

  //   xhr.open('GET', Url.GET);

  //   xhr.addEventListener('load', function () {
  //     if (xhr.status === StatusCode.OK) {
  //       var ads = xhr.response.splice(0, MAX_ADS_COUNT);
  //       onSuccess(ads);
  //     } else {
  //       onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
  //     }
  //   });

  //   xhr.addEventListener('error', function () {
  //     onError('Произошла ошибка соединения');
  //   });

  //   xhr.addEventListener('timeout', function () {
  //     onError('Ошибка, превышено время ожидания ответа ' + xhr.timeout + 'мс');
  //   });

  //   xhr.timeout = TIMEOUT_IN_MS;

  //   xhr.send();
  // };


  // var errorHandler = function (errorMessage) {
  //   var errorWindow = document.querySelector('#error').content.querySelector('.error');
  //   errorWindow.textContent = errorMessage;
  //   document.body.insertAdjacentElement('afterbegin', errorWindow);
  // };

  // var onSuccess = function (ads) {
  //   window.pin.renderPins(ads);
  // };

  // var onError = function (errorMessage) {
  //   var errorAlert = document.querySelector('#error').content.querySelector('.error');

  //   errorAlert.textContent = errorMessage;
  //   document.body.insertAdjacentElement('afterbegin', errorAlert);
  // };


  var setXhr = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case StatusCode.OK:
          onSuccess(xhr.response);

          break;
        case StatusCode.BAD_REQUEST:
          errorMessage = 'Неверный запрос';
          break;
        case StatusCode.UNATHORIZED:
          errorMessage = 'Вы не авторизованы';
          break;
        case StatusCode.FORBIDDEN:
          errorMessage = 'Доступ запрещён';
          break;
        case StatusCode.NOT_FOUND:
          errorMessage = 'Объекты не найдены';
          break;
        default:
          errorMessage = 'Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }
      if (errorMessage > 0) {
        onError(errorMessage);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    return xhr;
  };
  //  };
  var templateError = document.querySelector('#error').cloneNode(true).content;

  var onError = function (errorMessage) {
    var errorElement = templateError.querySelector('.error');
    errorElement.querySelector('.error__message').textContent = window.errorMessage;
    document.body.appendChild(errorElement);
    var messageClickHandler = function () {
      message.remove();
    };
    message.addEventListener('click', messageClickHandler);
  };


  var reduceAds = function (onSuccess, ads, response) {
    response.splice(0, MAX_ADS_COUNT);
    onSuccess(ads);
  };

  var downloadAds = function (onSuccess, onError) {
    var xhr = setXhr(onSuccess, onError);

    xhr.open('GET', Url.GET);
    xhr.send();
    // reduceAds();
  };

  var uploadForm = function (data, onSuccess, onError) {
    var xhr = setXhr(onSuccess, onError);

    xhr.open('POST', Url.POST);
    xhr.send(data);
  };


  // var adForm = document.querySelector('.ad-form');
  // var submitButton = adForm.querySelector('.ad-form__submit');

  // adForm.addEventListener('submit', function (evt) {
  //   // submitButton.textContent = 'Данные отправляются...';
  //   uploadForm(new FormData(adForm), function
  //   (response) {
  //     window.map.disactivateMap();
  //     adForm.reset();
  //   });
  //   evt.preventDefault();
  //   adForm.reset();
  // });

  window.backend = {
    load: downloadAds,
    upload: uploadForm,
    errorMessage: errorMessage,
  };
})();

// Доработайте обработчик отправки формы, который вы делали в задании «Личный проект: доверяй, но проверяй»,
// так чтобы он отменял действие формы по умолчанию и отправлял данные формы
// на сервер посредством XHR https://js.dump.academy/keksobooking.

// После успешной передачи данных на сервер верните страницу в неактивное состояние и сбросьте форму.

// Если отправка данных прошла успешно, показывается соответствующее сообщение.
// Разметка сообщения находится блоке #success внутри шаблона template.
// Сообщение должно исчезать по нажатию на клавишу Esc и по клику на произвольную область экрана.

// Если при отправке данных произошла ошибка запроса, покажите соответствующее сообщение.
// Разметку сообщения, которая находится в блоке #error в шаблоне template, нужно разместить в main.
// Сообщение должно исчезать после нажатия на кнопку .error__button, по нажатию
// на клавишу Esc и по клику на произвольную область экрана.

// Добавьте обработчик кнопке очистки формы.
