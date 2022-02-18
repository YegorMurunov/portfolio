"use strict";

// HEADER
// burger
var header = document.querySelector('header.header'),
    burgerIcon = document.querySelector('.header__burger'),
    headerNav = document.querySelector('.header__nav'),
    body = document.body;
burgerIcon.addEventListener('click', function () {
  burgerIcon.classList.toggle('active');
  headerNav.classList.toggle('active');
  body.classList.toggle('lock');
}); // Intro

window.onload = function () {
  var intro = document.querySelector('.section__intro');
  var marginTop = 210;
  var width = body.clientWidth;

  if (width <= 1080) {
    intro.style.marginTop = "".concat(header.offsetHeight, "px");
  } else {
    intro.style.marginTop = "".concat(marginTop, "px");
  }

  window.addEventListener('resize', function () {
    var width = body.clientWidth;

    if (width <= 1080) {
      intro.style.marginTop = "".concat(header.offsetHeight, "px");
    } else {
      intro.style.marginTop = "".concat(marginTop, "px");
    }
  });
};