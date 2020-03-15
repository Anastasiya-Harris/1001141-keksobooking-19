'use strict';
// backend.js — модуль, который загружает данные;
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

  var TIMEOUT_IN_MS = 10000;

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
          onError('Неверный запрос');
          break;
        case StatusCode.UNATHORIZED:
          onError('Вы не авторизованы');
          break;
        case StatusCode.FORBIDDEN:
          onError('Доступ запрещён');
          break;
        case StatusCode.NOT_FOUND:
          onError('Объекты не найдены');
          break;
        default:
          onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
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
  };
})();
