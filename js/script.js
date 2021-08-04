"use strict";

document.body.onload = function () {
  setTimeout(function () {
    // прелоадер уберёться через 1 секунду после загрузки страницы
    var preloader = document.querySelector('#preloader');

    if (!preloader.classList.contains('done')) {
      // проверка на наличие класса done
      preloader.classList.add('done');
      document.body.classList.remove('lock');
    }
  }, 1000);
};

var popupLinks = document.querySelectorAll('.popup-link');
var body = document.body;
var unlock = true;

if (popupLinks.length > 0) {
  var _loop = function _loop(i) {
    var popupLink = popupLinks[i];
    popupLink.addEventListener('click', function (e) {
      e.preventDefault();
      var popupName = popupLink.getAttribute('href').substring(1);
      var popupTarget = document.getElementById(popupName);
      popupOpen(popupTarget);
    });
  };

  for (var i = 0; popupLinks.length > i; i++) {
    _loop(i);
  }
} // open popup


function popupOpen(popupTarget) {
  if (popupTarget) {
    popupTarget.classList.add('open');
    body.classList.add('lock');
    popupTarget.addEventListener('click', function (e) {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
} // close popup


var popupCloseIcon = document.querySelectorAll('.close-popup');

if (popupCloseIcon.length > 0) {
  var _loop2 = function _loop2(_i) {
    var el = popupCloseIcon[_i];
    el.addEventListener('click', function (e) {
      e.preventDefault();
      popupClose(el.closest('.popup'));
    });
  };

  for (var _i = 0; _i < popupCloseIcon.length; _i++) {
    _loop2(_i);
  }
}

function popupClose(popupActive) {
  if (unlock) {
    popupActive.classList.remove('open');
    body.classList.remove('lock');
  }
}

; // проверка телефон это или нет

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
var viberLinks = document.querySelectorAll('a.viber');
viberLinks.forEach(function (viberLink) {
  if (isMobile.any()) {
    // document.body.classList.add('_touch-screen');
    viberLink.setAttribute('href', 'viber://add?number=380956954921');
  } else {
    // document.body.classList.add('_pc');
    viberLink.setAttribute('href', 'viber://chat?number=+380956954921');
  }
}); // Проверка поддерживает ли браузер webp

function checkWebP(callback) {
  var webP = new Image();

  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };

  webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}

checkWebP(function (support) {
  if (support) {
    document.body.classList.add('webp');
  } else {
    console.log('webp not work');
  }
}); // шапка

var header = document.querySelector('header');
window.addEventListener('scroll', function () {
  // фиксирование шапки
  if (pageYOffset > header.offsetHeight) {
    header.classList.add('header__fixed');
  } else {
    header.classList.remove('header__fixed');
  } // активный пункт меню


  var TopOffset = window.scrollY;
  document.querySelectorAll('.section').forEach(function (e, i) {
    if (e.offsetTop - document.querySelector('.header__nav').clientHeight <= TopOffset + header.offsetHeight) {
      document.querySelectorAll('.header__nav__link').forEach(function (e) {
        if (e.classList.contains('active')) {
          e.classList.remove('active');
        }
      });
      document.querySelectorAll('.header__nav li')[i].querySelector('a').classList.add('active');
    }
  });
}); // навигация

var anLinks = document.querySelectorAll('.anchor-link');

if (anLinks.length > 0) {
  // проверка
  anLinks.forEach(function (anLink) {
    // перебераем все ссылки
    anLink.addEventListener('click', function (e) {
      e.preventDefault();
      var anLink = e.target;
      var href = anLink.getAttribute('href').substring(1); // берем id из href без #

      var scrollTarget = document.getElementById(href);
      var TopOffset_Link = scrollTarget.getBoundingClientRect().top + pageYOffset - header.offsetHeight; // точное положение секции с учётом скролла
      // скроллим к блоку

      window.scrollTo({
        top: TopOffset_Link,
        behavior: 'smooth'
      });
    });
  });
} // footer copyright


var copyright = '© 2021 | Yegor Murunov';
document.getElementById('copyright').innerHTML = copyright;