"use strict";AOS.init();var body=document.body,burgerMenu=document.querySelector(".header__menu"),header=document.querySelector("header.header");window.addEventListener("scroll",function(){pageYOffset>header.offsetHeight&&(header.classList.contains("_fixed")||header.classList.add("_fixed")),0===pageYOffset&&header.classList.contains("_fixed")&&header.classList.remove("_fixed")}),burgerMenu.addEventListener("click",function(){header.classList.toggle("active"),body.classList.toggle("lock"),burgerMenu.classList.toggle("active")});