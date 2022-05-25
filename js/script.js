"use strict";

document.addEventListener('DOMContentLoaded', function (e) {
  var body = document.body;
  var header = document.querySelector('header.header');
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

  if (isMobile.any()) {
    document.body.classList.add('_touch');
    viberMobLinks();
  } else {
    document.body.classList.add('_pc');
    viberPcLinks();
  }

  function checkWebP(callback) {
    var webP = new Image();

    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };

    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }

  checkWebP(function (support) {
    if (support) {
      body.classList.add('_webp');
    } else {
      console.log("webp doesn't work in your browser");
    }
  });

  function randomInt(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

  function removeClass(arr) {
    var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "_active";

    for (var i = 0; i < arr.length; i++) {
      if (arr[i].classList.contains(className)) {
        arr[i].classList.remove(className);
      }
    }
  } // height: 100vh


  function setHeight() {
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
  }

  setHeight();
  window.addEventListener('resize', setHeight); // viber links

  function viberMobLinks() {
    var viberLinks = document.querySelectorAll('a.viber');
    viberLinks.forEach(function (viberLink) {
      viberLink.setAttribute('href', 'viber://add?number=380956954921');
    });
  }

  function viberPcLinks() {
    var viberLinks = document.querySelectorAll('a.viber');
    viberLinks.forEach(function (viberLink) {
      viberLink.setAttribute('href', 'viber://chat?number=+380956954921');
    });
  }

  ; // dynamic-adapt
  // // HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
  // e.x. data-da=".item,992,2"

  function DynamicAdapt(type) {
    this.type = type;
  }

  DynamicAdapt.prototype.init = function () {
    var _this2 = this;

    var _this = this; // массив объектов


    this.оbjects = [];
    this.daClassname = "_dynamic_adapt_"; // массив DOM-элементов

    this.nodes = document.querySelectorAll("[data-da]"); // наполнение оbjects объктами

    for (var i = 0; i < this.nodes.length; i++) {
      var node = this.nodes[i];
      var data = node.dataset.da.trim();
      var dataArray = data.split(",");
      var оbject = {};
      оbject.element = node;
      оbject.parent = node.parentNode;
      оbject.destination = document.querySelector(dataArray[0].trim());
      оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
      оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
      оbject.index = this.indexInParent(оbject.parent, оbject.element);
      this.оbjects.push(оbject);
    }

    this.arraySort(this.оbjects); // массив уникальных медиа-запросов

    this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
      return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
    }, this);
    this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
      return Array.prototype.indexOf.call(self, item) === index;
    }); // навешивание слушателя на медиа-запрос
    // и вызов обработчика при первом запуске

    var _loop = function _loop(_i) {
      var media = _this2.mediaQueries[_i];
      var mediaSplit = String.prototype.split.call(media, ',');
      var matchMedia = window.matchMedia(mediaSplit[0]);
      var mediaBreakpoint = mediaSplit[1]; // массив объектов с подходящим брейкпоинтом

      var оbjectsFilter = Array.prototype.filter.call(_this2.оbjects, function (item) {
        return item.breakpoint === mediaBreakpoint;
      });
      matchMedia.addListener(function () {
        _this.mediaHandler(matchMedia, оbjectsFilter);
      });

      _this2.mediaHandler(matchMedia, оbjectsFilter);
    };

    for (var _i = 0; _i < this.mediaQueries.length; _i++) {
      _loop(_i);
    }
  };

  DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
    if (matchMedia.matches) {
      for (var i = 0; i < оbjects.length; i++) {
        var оbject = оbjects[i];
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.moveTo(оbject.place, оbject.element, оbject.destination);
      }
    } else {
      //for (let i = 0; i < оbjects.length; i++) {
      for (var _i2 = оbjects.length - 1; _i2 >= 0; _i2--) {
        var _оbject = оbjects[_i2];

        if (_оbject.element.classList.contains(this.daClassname)) {
          this.moveBack(_оbject.parent, _оbject.element, _оbject.index);
        }
      }
    }
  }; // Функция перемещения


  DynamicAdapt.prototype.moveTo = function (place, element, destination) {
    element.classList.add(this.daClassname);

    if (place === 'last' || place >= destination.children.length) {
      destination.insertAdjacentElement('beforeend', element);
      return;
    }

    if (place === 'first') {
      destination.insertAdjacentElement('afterbegin', element);
      return;
    }

    destination.children[place].insertAdjacentElement('beforebegin', element);
  }; // Функция возврата


  DynamicAdapt.prototype.moveBack = function (parent, element, index) {
    element.classList.remove(this.daClassname);

    if (parent.children[index] !== undefined) {
      parent.children[index].insertAdjacentElement('beforebegin', element);
    } else {
      parent.insertAdjacentElement('beforeend', element);
    }
  }; // Функция получения индекса внутри родителя


  DynamicAdapt.prototype.indexInParent = function (parent, element) {
    var array = Array.prototype.slice.call(parent.children);
    return Array.prototype.indexOf.call(array, element);
  }; // Функция сортировки массива по breakpoint и place 
  // по возрастанию для this.type = min
  // по убыванию для this.type = max


  DynamicAdapt.prototype.arraySort = function (arr) {
    if (this.type === "min") {
      Array.prototype.sort.call(arr, function (a, b) {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }

          if (a.place === "first" || b.place === "last") {
            return -1;
          }

          if (a.place === "last" || b.place === "first") {
            return 1;
          }

          return a.place - b.place;
        }

        return a.breakpoint - b.breakpoint;
      });
    } else {
      Array.prototype.sort.call(arr, function (a, b) {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }

          if (a.place === "first" || b.place === "last") {
            return 1;
          }

          if (a.place === "last" || b.place === "first") {
            return -1;
          }

          return b.place - a.place;
        }

        return b.breakpoint - a.breakpoint;
      });
      return;
    }
  };

  var da = new DynamicAdapt("max");
  da.init();
  ; // popups
  // popups

  var popupLinks = document.querySelectorAll('.popup-link');
  var lockPadding = document.querySelectorAll('.lock-padding'); // для абсолютных элементов (шапка ...)

  var unlock = true; // чтобы не было 2-ных нажатий

  var timeout = 800; // 0.8 сукунды

  if (popupLinks.length > 0) {
    for (var i = 0; i < popupLinks.length; i++) {
      popupLinks[i].addEventListener('click', function (e) {
        e.preventDefault();
        var popupName = e.target.getAttribute('href').substring(1);
        var currentPopup = document.getElementById(popupName);
        popupOpen(currentPopup);
      });
    }
  }

  function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
      var popupActive = document.querySelector('.popup._open');

      if (popupActive) {
        popupClose(currentPopup, false);
      } else {
        bodyLock();
      }

      currentPopup.classList.add('_open');

      if (header.classList.contains('_open')) {
        headerToggle();
      }

      currentPopup.addEventListener('click', function (e) {
        if (!e.target.closest('.popup__content')) {
          popupClose(e.target.closest('.popup'));
        }
      });
      var closeIcon = currentPopup.querySelector('.popup__close');
      closeIcon.addEventListener('click', function (e) {
        popupClose(currentPopup);
      });
    }
  } // close the popup by pressing the esc key


  document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
      var popupActive = document.querySelector('.popup._open');
      popupActive ? popupClose(popupActive) : "";
    }
  });

  function popupClose(popupActive) {
    var doUnlock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (unlock) {
      popupActive.classList.remove('_open');

      if (doUnlock) {
        bodyUnlock();
      }
    }
  }

  function bodyLock() {
    var lockPaddingValue = window.innerWidth - document.querySelector('#wrapper').offsetWidth + 'px';

    if (lockPadding.length > 0) {
      for (var _i3 = 0; _i3 < lockPadding.length; _i3++) {
        var el = lockPadding[_i3];
        el.style.paddingRight = lockPaddingValue;
      }
    }

    body.style.paddingRight = lockPaddingValue;
    body.classList.add('_lock');
    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  function bodyUnlock() {
    setTimeout(function () {
      if (lockPadding.length > 0) {
        for (var _i4 = 0; _i4 < lockPadding.length; _i4++) {
          var el = lockPadding[_i4];
          el.style.paddingRight = '0px';
        }
      }

      body.style.paddingRight = '0px';
      body.classList.remove('_lock');
    }, timeout);
    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  } // функция для открытия popup по хешу в url


  var hash = window.location.hash;

  if (hash !== '') {
    var id = hash.substring(1);
    var el = document.getElementById(id);

    if (el) {
      if (el.classList.contains('popup')) {
        popupOpen(el);
      }
    }
  } // alert
  // clipboard message for gmail


  var gmailLinks = document.querySelectorAll('a.gmail');
  var alertWindow = document.querySelector('.alert-window');
  gmailLinks.forEach(function (gmailLink) {
    gmailLink.addEventListener('click', function (e) {
      navigator.clipboard.writeText('yegorfreelance@gmail.com').then(function () {
        alertWindow.classList.add('_active');
        setTimeout(function () {
          alertWindow.classList.remove('_active');
        }, 5000);
      })["catch"](function (error) {
        console.log('Something went wrong', error);
      });
    });
  });
  ; // scroll to section

  var anchorLinks = document.querySelectorAll('.anchor-link');

  if (anchorLinks.length > 0) {
    anchorLinks.forEach(function (anchorLink) {
      anchorLink.addEventListener('click', function (e) {
        e.preventDefault();
        var id = this.getAttribute('href').substring(1);
        var scrollTarget = document.getElementById(id);
        var topOffset = scrollTarget.getBoundingClientRect().top + pageYOffset - header.offsetHeight; // Если шапка фиксированная ( - header.offsetHeight )

        window.scrollTo({
          top: topOffset,
          behavior: 'smooth'
        });

        if (header.classList.contains('_open')) {
          headerToggle();
        }
      });
    });
  }

  ; // burger

  var burgerBtn = document.querySelector('.header__menu-btn');
  burgerBtn.addEventListener('click', headerToggle);

  function headerToggle() {
    burgerBtn.classList.toggle('_active');
    header.classList.toggle('_open');
    body.classList.toggle('_lock');
  } // header


  function checkHeader() {
    if (pageYOffset > header.offsetHeight) {
      if (!header.classList.contains('_fixed')) {
        header.classList.add('_fixed');
      }
    }

    if (pageYOffset === 0) {
      if (header.classList.contains('_fixed')) {
        header.classList.remove('_fixed');
      }
    }
  }

  checkHeader();
  window.addEventListener('scroll', function () {
    // фиксирование шапки
    checkHeader(); // активный пункт меню

    var TopOffset = window.scrollY;
    document.querySelectorAll('.section').forEach(function (e, i) {
      if (e.offsetTop - document.querySelector('.header-nav').clientHeight <= TopOffset + header.offsetHeight) {
        document.querySelectorAll('.header-nav__link.anchor-link').forEach(function (e) {
          if (e.classList.contains('_active')) {
            e.classList.remove('_active');
          }
        });
        document.querySelectorAll('.header-nav__link.anchor-link')[i].classList.add('_active');
      }
    });
  }); // section resume

  var accordions = document.querySelectorAll(".accordion-item");
  accordions.forEach(function (accordion) {
    var accordionTitle = accordion.querySelector(".accordion-item__title");
    var accordionBody = accordion.querySelector(".accordion-item__text");
    accordionTitle.addEventListener('click', function (e) {
      if (accordionBody.style.maxHeight) {
        closeAccordion(accordion);
      } else {
        accordions.forEach(function (accordion) {
          return closeAccordion(accordion);
        });
        openAccordion(accordion);
      }

      e.preventDefault();
    });
  });

  var openAccordion = function openAccordion(accordion) {
    var accordionBody = accordion.querySelector(".accordion-item__text");
    accordion.classList.add("_active");
    accordionBody.style.maxHeight = accordionBody.scrollHeight + 10 + "px";
  };

  var closeAccordion = function closeAccordion(accordion) {
    var accordionBody = accordion.querySelector(".accordion-item__text");
    accordion.classList.remove("_active");
    accordionBody.style.maxHeight = null;
  };

  var activeAccordion = document.querySelector('.accordion-item._active');

  window.onload = function (e) {
    if (activeAccordion) {
      openAccordion(activeAccordion);
    }
  }; // footer
  // copyright


  var copyright = document.getElementById('copyright');

  if (copyright) {
    var year = new Date().getFullYear();
    copyright.innerHTML = "\xA9 2021-".concat(year, " | Yegor Murunov");
  }
});