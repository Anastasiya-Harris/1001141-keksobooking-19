'use strict';
// utils.js — модуль, который отвечает за создание служебных функций;
// Возвращает рандомное число в диапазоне между параметрами min и max включительно.
(function () {
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Возвращает один рандомный элемент из переданного массива.
  var getRandomFromArray = function (array) {
    var randomIndex = getRandomNumber(0, array.length - 1);
    return array[randomIndex];
  };

  // Возвращает массив случайной длинны от 1 до длинны массива включительно.
  var getRandomArrayFromArray = function (array) {
    var maxLength = getRandomNumber(1, array.length + 1);
    return array.slice(0, maxLength);
  };

  window.utils = {
    getRandomNumber: getRandomNumber,
    getRandomFromArray: getRandomFromArray,
    getRandomArrayFromArray: getRandomArrayFromArray,
  };
})();
