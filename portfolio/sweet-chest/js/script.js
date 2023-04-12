"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

document.addEventListener('DOMContentLoaded', function (e) {
  var body = document.body;
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
    document.body.classList.add('_touch'); // viberMobLinks();
  } else {
    document.body.classList.add('_pc'); // viberPcLinks();
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
  } // viber links

  /*function viberMobLinks() {
  	const viberLinks = document.querySelectorAll('a.viber');
  	viberLinks.forEach(viberLink => {
  		viberLink.setAttribute('href', 'viber://add?number=380956954921');
  	});
  }
  function viberPcLinks() {
  	const viberLinks = document.querySelectorAll('a.viber');
  	viberLinks.forEach(viberLink => {
  		viberLink.setAttribute('href', 'viber://chat?number=+380956954921');
  	});
  }*/


  ; // dynamic-adapt
  // HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
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

  /*let hash = window.location.hash;
  if ( hash !== '' ) {
  	let id = hash.substring(1);
  	let el = document.getElementById(id);
  	if ( el ) {
  		if ( el.classList.contains('popup') ) {
  			el.classList.add('_open');
  		}
  	}
  }*/


  ; // scroll to section

  var anchorLinks = document.querySelectorAll('.anchor-link');
  anchorLinks.forEach(function (anchorLink) {
    anchorLink.addEventListener('click', function (e) {
      e.preventDefault();
      var id = this.getAttribute('href').substring(1);
      var scrollTarget = document.getElementById(id);
      var topOffset = scrollTarget.getBoundingClientRect().top + pageYOffset; // Если шапка фиксированная ( - header.offsetHeight )

      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
    });
  });
  ; // parallax

  var parallaxContainers = document.querySelectorAll('.parallax');
  window.addEventListener('resize', checkParallax);
  checkParallax();

  function checkParallax() {
    if (isMobile.any() || window.innerWidth <= 1000) {
      body.classList.add('_no-parallax');
    } else {
      body.classList.contains('_no-parallax') ? body.classList.remove('_no-parallax') : '';

      if (parallaxContainers.length > 0) {
        parallaxContainers.forEach(function (parallaxContainer) {
          var options = {
            root: null,
            threshold: 1.0
          };
          var parallaxItems = parallaxContainer.querySelectorAll('.parallax__item');

          parallaxContainer.onmousemove = function (e) {
            var x = e.clientX / parallaxContainer.offsetWidth;
            var y = e.clientY / parallaxContainer.offsetHeight;

            for (var _i5 = 0; _i5 < parallaxItems.length; _i5++) {
              parallaxItems[_i5].style.transform = "translate(-".concat(x * 60, "px, -").concat(y * 60, "px)");
            }

            ;
          };
        });
      }
    }
  }

  ; // burger

  var burgerBtn = document.querySelector('.header__menu-btn'),
      header = document.querySelector('header.header');
  burgerBtn.addEventListener('click', function (e) {
    burgerBtn.classList.toggle('_active');
    header.classList.toggle('_open');
    body.classList.toggle('_lock');
  });
  var preloader = document.getElementById('preloader');
  setTimeout(function () {
    // прелоадер уберёться через 1 секунду после загрузки страницы
    if (!preloader.classList.contains('_done')) {
      // проверка на наличие класса done
      preloader.style.opacity = '0';
      document.body.classList.remove('_lock');
      setTimeout(function () {
        preloader.classList.add('_done');
      }, 1000);
    }
  }, 1000); // lazy load ==================================

  var lazyImages = document.querySelectorAll('.lazy-load');
  var loadedImg = []; // options

  var options = {
    root: null,
    // Элемент который используется в качестве области просмотра для проверки видимости элемента
    rootMargin: '0px',
    // Отступы вокруг root
    threshold: 0.1 // Число, указывающие, при каком проценте видимости целевого элемента должен сработать callback

  }; // function handleImg

  function handleImg(images, observer) {
    images.forEach(function (img) {
      if (img.intersectionRatio > 0) {
        return loadImg(img.target);
      }
    });
  } // function loadImg


  function loadImg(img) {
    var src = img.dataset.src;

    if (loadedImg.indexOf(src) == -1) {
      img.src = src;
      loadedImg.push(src); // for webp

      if (img.previousElementSibling && img.previousElementSibling.tagName == 'SOURCE') {
        var webp = img.previousElementSibling;
        webp.setAttribute('srcset', webp.dataset['srcset']);
      }
    }

    return img;
  } // observer


  var observer = new IntersectionObserver(handleImg, options); // запускаем observer

  lazyImages.forEach(function (img) {
    observer.observe(img);
  }); // ================
  // upload file img

  var formImage = document.getElementById('formImage'),
      formPreview = document.getElementById('formPreview');
  formImage.addEventListener('change', function () {
    uploadFile(formImage.files[0]);
  });

  function uploadFile(file) {
    // Проверка на тип файла
    if (!['image/png', 'image/jpeg', 'image/gif', 'image/webp'].includes(file.type)) {
      alert('Разрешены только изображения!');
      formImage.value = '';
      return;
    } // размер файла
    else if (file.size > 5 * Math.pow(1024, 2)) {
      // не больше 10 мб
      alert('Файл должен быть меньше 5 мб!');
      return;
    } // Если все хорошо делайем превью


    var reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function () {
      var fileName = file.name;
      var limit = 8;
      var dot = fileName.indexOf('.');
      var fileEnd = fileName.slice(dot - 2, fileName.length);

      if (fileName.length > limit) {
        fileName = "".concat(fileName.slice(0, limit), "...").concat(fileEnd);
      }

      formPreview.innerHTML = fileName;
    };

    reader.onerror = function () {
      alert('Ошибочка! Перезагрузите страницу и попробуйте еще раз.');
    };
  } // Работа с озывами, если есть доп. текст то добовляем кнопку


  var fbBlocks = document.querySelectorAll('.feedback-slider__item');

  var _iterator = _createForOfIteratorHelper(fbBlocks),
      _step;

  try {
    var _loop2 = function _loop2() {
      var block = _step.value;
      var textWrapper = block.querySelector('.slider-item__text');

      if (textWrapper.querySelector('#secondary-text')) {
        var secondText = block.querySelector('#secondary-text');
        secondText.hidden = true;
        var readMoreBtn = document.createElement('a');
        textWrapper.appendChild(readMoreBtn);
        readMoreBtn.setAttribute('href', '#');
        readMoreBtn.setAttribute('id', 'read-more-link');
        readMoreBtn.innerHTML = 'Читать отзыв полностью';

        readMoreBtn.onclick = function (e) {
          e.preventDefault();
          textWrapper = e.target.parentNode;
          var secondText = textWrapper.querySelector('#secondary-text');

          if (secondText.hidden) {
            readMoreBtn.innerHTML = 'Скрыть';
            secondText.hidden = false;
          } else {
            readMoreBtn.innerHTML = 'Читать отзыв полностью';
            secondText.hidden = true;
          }
        };
      }
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop2();
    } // Решение проблемы с fslightbox

  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var lightboxLinks = document.querySelectorAll('[data-fslightbox]');

  if (lightboxLinks.length > 0) {
    var offsetTop = 0;

    window.onscroll = function () {
      offsetTop = window.pageYOffset;

      fsLightboxInstances['portfolio-gallery'].props.onOpen = function () {
        window.pageYOffset = offsetTop;
      };

      fsLightboxInstances['portfolio-gallery'].props.onClose = function () {
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      };
    };
  }
});