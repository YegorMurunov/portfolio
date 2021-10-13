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
}; // модальные окна


var popupLinks = document.querySelectorAll('.popup-link');
var body = document.body;
var lockPadding = document.querySelectorAll('.lock-padding'); // класс для фиксированных объектов

var unlock = true; // чтобы не было 2-ных нажатий

var timeout = 800; // 0.8 сукунды

if (popupLinks.length > 0) {
  var _loop = function _loop(i) {
    var popupLink = popupLinks[i];
    popupLink.addEventListener('click', function (e) {
      e.preventDefault();
      var popupName = popupLink.getAttribute('href').substring(1);
      var currentPopup = document.getElementById(popupName);
      popupOpen(currentPopup);
    });
  };

  for (var i = 0; i < popupLinks.length; i++) {
    _loop(i);
  }
}

function popupOpen(currentPopup) {
  if (currentPopup && unlock) {
    var popupActive = document.querySelector('.popup.open');

    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }

    currentPopup.classList.add('open');
    currentPopup.addEventListener('click', function (e) {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}

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
  var doUnlock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (unlock) {
    popupActive.classList.remove('open');

    if (doUnlock) {
      bodyUnlock();
    }
  }
}

function bodyLock() {
  var lockPaddingValue = window.innerWidth - document.querySelector('#wrapper').offsetWidth + 'px';

  if (lockPadding.length > 0) {
    for (var _i2 = 0; _i2 < lockPadding.length; _i2++) {
      var el = lockPadding[_i2];
      el.style.paddingRight = lockPaddingValue;
    }
  }

  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');
  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnlock() {
  if (lockPadding.length > 0) {
    setTimeout(function () {
      for (var _i3 = 0; _i3 < lockPadding.length; _i3++) {
        var el = lockPadding[_i3];
        el.style.paddingRight = '0px';
      }

      body.style.paddingRight = '0px';
      body.classList.remove('lock');
    }, timeout);
  }

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
} // закрытие модального окна по esc


document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    var popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
});
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