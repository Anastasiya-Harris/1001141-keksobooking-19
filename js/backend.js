'use strict';
// load.js — модуль, который загружает данные;
(function () {
  var Url = {
    GET: 'https://js.dump.academy/keksobooking/data',
    POST: 'https://js.dump.academy/keksobooking'
  };

  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;
  var MAX_ADS_COUNT = 5;

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', Url.GET);

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        var ads = xhr.response.splice(0, MAX_ADS_COUNT);
        onSuccess(ads);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Ошибка, превышено время ожидания ответа ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.send();
  };

  var errorHandler = function (errorMessage) {
    var errorWindow = document.querySelector('#error').content.querySelector('.error');
    errorWindow.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorWindow);
  };


  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response); //
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError(errorHandler);
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('POST', Url.POST);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
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
