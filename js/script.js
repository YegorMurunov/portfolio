"use strict";

document.addEventListener('DOMContentLoaded', function (e) {
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
    return Math.floor(min + Math.random() * (max + 1 - min));
  }

  function removeClass(arr) {
    var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "_active";

    for (var i = 0; i < arr.length; i++) {
      if (arr[i].classList.contains(className)) {
        arr[i].classList.remove(className);
      }
    }
  } // Учет плавающей панели на мобильных устройствах при 100vh


  function fullVHfix() {
    var fullScreens = document.querySelectorAll('[data-fullscreen]');

    if (fullScreens.length && isMobile.any()) {
      var fixHeight = function fixHeight() {
        var vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
      };

      window.addEventListener('resize', fixHeight);
      fixHeight();
    }
  }

  fullVHfix();

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

  ;
  var body = document.body; // dynamic-adapt
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
  }); // popups

  var popupLinks = document.querySelectorAll('.popup-link');
  var lockPadding = document.querySelectorAll('.lock-padding');
  var unlock = true; // чтобы не было 2-ных нажатий

  var timeout = 800; // 0.8 сукунды

  if (popupLinks.length > 0) {
    for (var i = 0; i < popupLinks.length; i++) {
      popupLinks[i].addEventListener('click', function (e) {
        e.preventDefault();
        var popupName = e.target.getAttribute('href').substring(1);
        var currentPopup = document.getElementById(popupName);
        popupOpen(currentPopup);

        if (headerNav.classList.contains('_active')) {
          headerToggle();
        }
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
          console.log(e.target.closest('.popup'));
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
  }

  ; // preloader

  var preloader = document.getElementById('preloader');
  setTimeout(function () {
    // прелоадер уберёться через 1 секунду после загрузки страницы
    if (!preloader.classList.contains('_done')) {
      // проверка на наличие класса done
      preloader.classList.add('_done');
      document.body.classList.remove('_lock'); // for start animation

      setTimeout(function () {
        sectionHomeContent.classList.add('_ready');
      }, 1000);
    }
  }, 1000); // header

  var header = document.querySelector('header.header'),
      burgerBtn = document.querySelector('.header__menu'),
      headerNav = document.querySelector('.header__nav'),
      anchorLinks = document.querySelectorAll('.anchor-link'),
      headerLang = document.querySelector('.header-lang'); // Header
  // burger menu

  burgerBtn.addEventListener('click', headerToggle);

  function headerToggle() {
    burgerBtn.classList.toggle('_active');
    headerNav.classList.toggle('_active');
    header.classList.toggle('_active');
    body.classList.toggle('_lock');
  }

  document.addEventListener('scroll', function (e) {
    // fixed
    if (pageYOffset > header.offsetHeight) {
      if (!header.classList.contains('_fixed')) {
        header.classList.add('_fixed');
      }
    }

    if (pageYOffset === 0) {
      if (header.classList.contains('_fixed')) {
        header.classList.remove('_fixed');
      }
    } // активный пункт меню


    var TopOffset = window.scrollY;
    document.querySelectorAll('section.section').forEach(function (e, i) {
      var link = anchorLinks[i]; // console.log(e.getBoundingClientRect().top)

      var condition = e.offsetTop - header.offsetHeight <= TopOffset + header.offsetHeight; // условие

      if (condition) {
        anchorLinks.forEach(function (e) {
          if (e.classList.contains('_active')) {
            e.classList.remove('_active');
          }
        });
        link.classList.add('_active');
      }
    });
  }); // header navigation ( anchor links )

  if (anchorLinks.length > 0) {
    anchorLinks.forEach(function (anchorLink) {
      anchorLink.addEventListener('click', function (e) {
        e.preventDefault();

        if (headerNav.classList.contains('_active')) {
          headerToggle();
        }

        var href = anchorLink.getAttribute('href').substring(1);
        var scrollTarget = document.getElementById(href);
        var topOffset = scrollTarget.getBoundingClientRect().top + pageYOffset - header.offsetHeight; // точные координаты

        window.scrollTo({
          top: topOffset,
          behavior: 'smooth'
        });
      });
    });
  }

  ;

  if (pageYOffset > header.offsetHeight) {
    // чтобы если пользователь перезагрузил страницу шапка появилась
    if (!header.classList.contains('_fixed')) {
      header.classList.add('_fixed');
    }
  } // content


  var sectionHomeContent = document.querySelector('.section-home__wrapper');
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
  }; // filter


  var filterLi = document.querySelectorAll('.portfolio-nav__li'),
      projectsWrapper = document.querySelector('.section-portfolio__blocks'),
      projectsBlocks = document.querySelectorAll('.portfolio-block');
  filterLi.forEach(function (li) {
    li.addEventListener('click', function (e) {
      if (projectsWrapper.classList.contains('_active')) {
        return;
      } else {
        removeClass(filterLi, '_active');
        e.target.classList.add('_active');
        var filter = e.target.dataset['filter'];
        projectsWrapper.classList.add('_active');
        filterBlocks(filter);
      }
    });
  });

  function filterBlocks(filter) {
    setTimeout(function () {
      removeClass(projectsBlocks, '_hide');
      projectsBlocks.forEach(function (project) {
        if (!project.classList.contains(filter) && filter !== 'all') {
          project.classList.add('_hide');
        }
      });
    }, 1000);
    setTimeout(function () {
      projectsWrapper.classList.remove('_active');
    }, 2000);
  } // Работы с информацией к каждой работе


  projectsBlocks.forEach(function (projectBlock) {
    var projectInfo = projectBlock.querySelector('.block-info');
    projectBlock.addEventListener('mouseover', function (e) {
      var height = projectInfo.clientHeight;
      projectInfo.style.top = "-".concat(height - 15, "px");
    });
    projectBlock.addEventListener('mouseout', function (e) {
      projectInfo.style.top = 0;
    });
  });
  ; // slider

  var slider = document.querySelector('.feedback-slider__wrapper'),
      sliderLine = document.querySelector('.feedback-slider__line'),
      sliderItems = document.querySelectorAll('.slider-item'),
      sliderDotsWrapper = document.querySelector('.feedback-slider__dots');
  var count = 0,
      width,
      timer;

  if (sliderItems.length > 0) {
    (function () {
      var init = function init() {
        width = slider.offsetWidth;
        sliderLine.style.width = width * sliderItems.length + 'px';
        sliderItems.forEach(function (item) {
          item.style.flex = "0 0 ".concat(width, "px");
        });
        rollSlider();
      };

      var autoSlider = function autoSlider() {
        // let timer;
        timer = setTimeout(function () {
          count++;

          if (count >= sliderItems.length) {
            count = 0;
          }

          rollSlider();
          autoSlider();
        }, 10000);
      }; // slider pagination


      var addDots = function addDots() {
        for (var _i5 = 0; _i5 < sliderItems.length; _i5++) {
          var span = document.createElement('span');
          sliderDotsWrapper.appendChild(span);
        }

        sliderDotsWrapper.style.width = "".concat(sliderItems.length * 15, "px");
      };

      var rollSlider = function rollSlider() {
        sliderLine.style.transform = "translate(-".concat(count * width, "px)");
        removeClass(sliderDots, '_active');
        sliderDots[count].classList.add('_active');
      }; // controls


      window.addEventListener('resize', init);
      addDots();
      var sliderDots = sliderDotsWrapper.querySelectorAll('span');

      var _loop2 = function _loop2(_i6) {
        sliderDots[_i6].addEventListener('click', function (e) {
          count = _i6;
          rollSlider();
          clearTimeout(timer);
        });
      };

      for (var _i6 = 0; _i6 < sliderDots.length; _i6++) {
        _loop2(_i6);
      }

      if (isMobile.any()) {
        var handleTouchStart = function handleTouchStart(event) {
          var firstTouch = event.touches[0];
          x1 = firstTouch.clientX;
        };

        var handleTouchMove = function handleTouchMove(event) {
          if (!x1) return false; // check swipe

          var x2 = event.touches[0].clientX;
          var xDiff = x2 - x1; // swipe left or right

          if (xDiff > 0) {
            count--;
            clearTimeout(timer);
            autoSlider();

            if (count <= 0) {
              count = sliderItems.length - 1;
              clearTimeout(timer);
              autoSlider();
            }

            rollSlider();
          } else {
            count++;
            clearTimeout(timer);
            autoSlider();

            if (count >= sliderItems.length) {
              count = 0;
              clearTimeout(timer);
              autoSlider();
            }

            rollSlider();
          }

          x1 = null;
        };

        slider.addEventListener('touchstart', handleTouchStart);
        slider.addEventListener('touchmove', handleTouchMove);
        var x1 = null;
      }

      init();
      autoSlider();
    })();
  }

  ;
});