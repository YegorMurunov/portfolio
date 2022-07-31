import Swiper from 'https://unpkg.com/swiper@8/swiper-bundle.esm.browser.min.js'

const swiper = new Swiper('.swiper', {

	// Optional parameters
	direction: 'horizontal',
	speed: 800,
	spaceBetween: 80,
	loop: false,
	slidesPerView: 1.25,
	centeredSlides: true,
	effect: "coverflow", // cards
	coverflowEffect: {
		rotate: 0,
		depth: 100,
		slideShadows: true,
	},
	allowTouchMove: true,
	grabCursor: true,
	autoHeight: false,

	breakpoints: {
		// when window width is >= 320px
		320: {
			slidesPerView: 1,
			spaceBetween: 20,
			stretch: 1,
		},
		// when window width is >= 480px
		480: {
			slidesPerView: 1.05,
			spaceBetween: 50,
			stretch: 1,
		},
		// when window width is >= 640px
		640: {
			slidesPerView: 1.25,
			spaceBetween: 80
		}
	},

	// navigation
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
		disabledClass: '--disabled',
	},
});