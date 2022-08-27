"use strict";

var isMobile = {
  Android: function Android() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function BlackBerry() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function iOS() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function Opera() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function Windows() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function any() {
    return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
  }
};
window.addEventListener('DOMContentLoaded', function () {
  var videoPlayerWrapper = document.querySelector('.page-bottom__player'),
      videoPlayerBlock = document.querySelector('.video-player'),
      videoPreview = document.querySelector('.video-preview'),
      ytLink = 'https://www.youtube.com/embed/douFmNCXzRc';

  videoPreview.onclick = function () {
    try {
      loadIframe();
    } catch (error) {
      alert('Произошла ошибка. Мы работаем над ее устранением!');
      console.log("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(error));
      return;
    }

    videoPlayerWrapper.classList.add('load');
  };

  function loadIframe() {
    videoPlayerBlock.innerHTML = "\n\t\t<iframe\n\t\tsrc=\"".concat(ytLink, "?autoplay=1\"\n\t\tstyle=\"border:none;\"\n\t\tframeborder=\"0\"\n\t\tallowfullscreen\n\t\tsandbox=\"allow-scripts allow-presentation allow-same-origin\"\n\t\tallow=\"autoplay; fullscreen; picture-in-picture; xr-spatial-tracking; clipboard-write\"></iframe>\n\t\t");
  } // if ( isMobile.any() ) {


  var cardsTime = document.querySelectorAll('.card__time');
  var opened = [];
  cardsTime.forEach(function (cardTime) {
    cardTime.onclick = function () {
      if (!cardTime.classList.contains('active')) {
        cardTime.classList.add('active');
        opened.push(cardTime);
      } else {
        cardTime.classList.remove('active');
      }
    };
  });

  document.onclick = function (e) {
    if (opened.length > 0) {
      var el = e.target;

      if (!el.closest('.card__time') || el.closest('.card__time') !== opened[0]) {
        opened[0].classList.remove('active');
        opened.shift();
      }
    }
  }; // }

});