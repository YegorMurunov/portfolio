"use strict";

var body = document.body;

// header
// код чтобы понять что это точно тач скрин
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

// sub list
var subLinks = document.querySelectorAll('.sub-link');
if (!isMobile.any()) {
  // если это не тач
  if (subLinks.length > 0) {
    subLinks.forEach(function (subLink) {
      subLink.addEventListener('click', function (e) {
        e.preventDefault(); // делаем не рабочую ссылку
      });
    });
  }
} else {
  if (subLinks.length > 0) {
    subLinks.forEach(function (subLink) {
      subLink.parentNode.setAttribute('disable', ''); // убираем hover у li
      subLink.addEventListener('click', function (e) {
        e.preventDefault();
        // console.log(e.target.path);
        var li = e.target.parentNode;
        li.classList.toggle('active');
      });
    });
    body.addEventListener('click', function (e) {
      // при клике не на li закрываем список
      if (!e.target.closest('.sub-li')) {
        subLinks.forEach(function (subLink) {
          if (subLink.parentNode.classList.contains('active')) {
            subLink.parentNode.classList.remove('active');
          }
        });
      }
    });
  }
}

// menu burger
var menuBtn = document.querySelector('.header__menu');
var header = document.querySelector('header.header');
menuBtn.addEventListener('click', function (e) {
  menuBtn.classList.toggle('active');
  body.classList.toggle('lock');
  header.classList.toggle('active');
});

// content
// section hero input
var heroInput = document.querySelector('.hero-search__input'),
  heroLabel = document.querySelector('.hero-search__label');
heroInput.addEventListener('focus', function (e) {
  // при фокусе добавляем класс active
  heroLabel.classList.add('active');
});
heroInput.addEventListener('blur', function (e) {
  // при расфокусе убираем класс active
  heroLabel.classList.remove('active');
});

// testomonial
// slider

var slider = document.querySelector('.slider'),
  sliderLine = document.querySelector('.slider__line'),
  sliderItems = document.querySelectorAll('.slider__item'),
  arrowRight = document.querySelector('.slider__arrow.right'),
  arrowLeft = document.querySelector('.slider__arrow.left'),
  sliderDots = document.querySelectorAll('.slider__dot');
var count = 0,
  width,
  timer;
if (sliderItems.length > 0) {
  var init = function init() {
    // главная функция для адаптива
    width = slider.offsetWidth;
    sliderLine.style.width = width * sliderItems.length + 'px';
    sliderItems.forEach(function (item) {
      item.style.flex = "0 0 ".concat(width, "px");
      item.style.height = 'auto';
    });
    rollSlider();
  };
  // при каждом изменении размера запускаем функцию init
  var autoSlider = function autoSlider() {
    // перелистывание слайдера по таймеру
    timer = setTimeout(function () {
      count++;
      if (count >= sliderItems.length) {
        count = 0;
        clearTimeout(timer);
      }
      rollSlider();
      autoSlider();
    }, 10000);
  };
  var rollSlider = function rollSlider() {
    // функция перелистывания слайдера
    if (count < 0) {
      count = sliderItems.length - 1;
    }
    if (count > sliderItems.length - 1) {
      count = 0;
    }
    sliderLine.style.transform = 'translate(-' + count * width + 'px)';
    sliderDots.forEach(function (dot) {
      dot.classList.remove('active');
      sliderDots[count].classList.add('active');
    });
  }; // controls for touch screen
  // if (isMobile.any()) {
  // 	sliderLine.addEventListener('touchstart', handleTouchStart);
  // 	sliderLine.addEventListener('touchmove', handleTouchMove);
  // 	let x1 = null;
  // 	function handleTouchStart(event) {
  // 		const firstTouch = event.touches[0];
  // 		x1 = firstTouch.clientX;
  // 	}
  // 	function handleTouchMove(event) {
  // 		if (!x1) return false; // check swipe
  // 		let x2 = event.touches[0].clientX;
  // 		let xDiff = x2 - x1;
  // 		// swipe left or right
  // 		if (xDiff > 0) {
  // 			count--;
  // 			clearTimeout(timer);
  // 			autoSlider();
  // 			if (count <= 0) {
  // 				count = sliderItems.length - 1;
  // 				clearTimeout(timer);
  // 				autoSlider();
  // 			}
  // 			rollSlider();
  // 		} else {
  // 			count++;
  // 			clearTimeout(timer);
  // 			autoSlider();
  // 			if (count >= sliderItems.length) {
  // 				count = 0;
  // 				clearTimeout(timer);
  // 				autoSlider();
  // 			}
  // 			rollSlider();
  // 		}
  // 		x1 = null;
  // 	}
  // }
  window.addEventListener('resize', init);
  arrowRight.addEventListener('click', function (e) {
    // перелистывание слайдера по клику на стрелку
    count++;
    rollSlider();
    clearTimeout(timer);
  });
  arrowLeft.addEventListener('click', function (e) {
    // перелистывание слайдера по клику на стрелку
    count--;
    rollSlider();
    clearTimeout(timer);
  });
  for (var i = 0; i < sliderDots.length; i++) {
    // перелистывание слайдера по клику на линию под слайдером
    sliderDots[i].addEventListener('click', function (e) {
      for (var _i = 0; _i < sliderDots.length + 1; _i++) {
        if (e.target == sliderDots[_i - 1]) {
          count = _i - 1;
          rollSlider();
          clearTimeout(timer);
        }
      }
    });
  }
  init();
  autoSlider();
}

// join
var joinInput = document.querySelector('.section-join__input'),
  joinLabel = document.querySelector('.section-join__label');
joinInput.addEventListener('focus', function (e) {
  // при фокусе добавляем класс active
  joinLabel.classList.add('active');
});
joinInput.addEventListener('blur', function (e) {
  // при расфокусе убираем класс active
  joinLabel.classList.remove('active');
});