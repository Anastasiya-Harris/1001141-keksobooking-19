'use strict';
// load.js — модуль, который загружает данные;
(function () {
  var Url = {
    GET: 'https://js.dump.academy/keksobooking/data/',
    POST: 'https://js.dump.academy/keksobooking/'
  };

  var StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    UNATHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
  };

  var TIMEOUT_IN_MS = 100;

  var errorMessage = '';
  var onError = '';


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


  var templateError = document.querySelector('#error').content.querySelector('.error');

  // var templateError = document.querySelector('#error').cloneNode(true).content;
  var errorButton = templateError.querySelector('.error__button');


  var renderErrorMessage = function (errorMessage) {
    var message = templateError.querySelector('.error__message');
    message.textContent = errorMessage;
    message.appendChild(errorMessage);
    var onMessageKeydown = function (evt) {
      if (evt.key === 'Escape') {
        message.removeChild(errorMessage);
        document.removeEventListener('keydown', onMessageKeydown);
      }
    };
  };

  var onError = function (errorMessage) {
    renderErrorMessage(errorMessage);
  };


  // Отправляет Ayax запросы
  var downloadAds = function (onSuccess, onError) {
    var xhr = setXhr(onSuccess, onError);

    xhr.open('GET', Url.GET);
    xhr.send();
  };

  var uploadForm = function (data, onSuccess, onError) {
    var xhr = setXhr(onSuccess, onError);

    xhr.open('POST', Url.POST);
    xhr.send(data);
  };


  window.backend = {
    load: downloadAds,
    upload: uploadForm,
    // onError: onError,
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
