"use strict";

document.addEventListener('DOMContentLoaded', (e) => {
	const body = document.body;

	@@include('./_includes/_functions.js');

	// dynamic-adapt
	@@include('./_includes/_dynamic-adapt.js');

	// popups
	@@include('./_includes/_popups.js');

	// scroll to section
	@@include('./_includes/_anchor-scroll.js');

	// parallax
	@@include('./_includes/_parallax.js');

	// burger
	const burgerBtn = document.querySelector('.header__menu-btn'),
	header          = document.querySelector('header.header');

	burgerBtn.addEventListener('click', e => {
		burgerBtn.classList.toggle('_active');
		header.classList.toggle('_open');
		body.classList.toggle('_lock');
	});

	let preloader = document.getElementById('preloader');
	setTimeout(function () { // прелоадер уберёться через 1 секунду после загрузки страницы
		if (!preloader.classList.contains('_done')) { // проверка на наличие класса done
			preloader.style.opacity = '0';
			document.body.classList.remove('_lock');
			setTimeout(function() {
				preloader.classList.add('_done');
			}, 1000);
		}
	}, 1000);

	// телефонная маска
	document.querySelectorAll('.phone-mask').forEach(phoneInput => {
		let phoneMask = IMask(phoneInput, {
			mask: '+{7}(000)000-00-00'
		});
		phoneMask.updateValue();
	});



	// lazy load ==================================
	const lazyImages = document.querySelectorAll('.lazy-load');

	// options
	const options = {
		root: null, // Элемент который используется в качестве области просмотра для проверки видимости элемента
		rootMargin: '0px', // Отступы вокруг root
		treshold: 0.1, // Число, указывающие, при каком проценте видимости целевого элемента должен сработать callback
	}

	// function handleImg
	function handleImg(images, observer) {
		images.forEach(img => {
			if ( img.intersectionRatio > 0 ) {
				return loadImg(img.target);
			}
		});
	}
	// function loadImg
	function loadImg(img) {
		img.src = img.dataset.src;
		// for webp
		if ( img.previousElementSibling && img.previousElementSibling.tagName == 'SOURCE' ) {
			let webp = img.previousElementSibling;
			webp.setAttribute('srcset', webp.dataset['srcset']);
		}
		return img;
	}

	// observer
	const observer = new IntersectionObserver(handleImg, options);

	// запускаем observer
	lazyImages.forEach(img => {
		observer.observe(img);
	});

	// ================


	// upload file img
	const formImage = document.getElementById('formImage'),
		formPreview = document.getElementById('formPreview');

	formImage.addEventListener('change', () => {
		uploadFile(formImage.files[0]);
	});

	function uploadFile(file) {
		// Проверка на тип файла
		if ( !['image/png', 'image/jpeg', 'image/gif', 'image/webp'].includes(file.type) ) {
			alert('Разрешены только изображения!');
			formImage.value = '';
			return
		}
		// размер файла
		else if (file.size > 5 * 1024**2) { // не больше 10 мб
			alert('Файл должен быть меньше 5 мб!');
			return;
		}

		// Если все хорошо делайем превью
		let reader = new FileReader();

		reader.readAsText(file);

		reader.onload = function() {
			let fileName = file.name;
			let limit = 8;
			let dot = fileName.indexOf('.');
			let fileEnd = fileName.slice(dot-2, fileName.length);
			if ( fileName.length > limit ) {
				fileName = `${fileName.slice(0, limit)}...${fileEnd}`;
			}
			formPreview.innerHTML = fileName;
		};

		reader.onerror = function() {
			alert('Ошибочка! Перезагрузите страницу и попробуйте еще раз.');
		}
	}


	// Работа с озывами, если есть доп. текст то добовляем кнопку
	const fbBlocks = document.querySelectorAll('.feedback-slider__item');

	for ( let block of fbBlocks ) {
		let textWrapper = block.querySelector('.slider-item__text');
		if ( textWrapper.querySelector('#secondary-text') ) {
			let secondText = block.querySelector('#secondary-text');
			secondText.hidden = true;

			let readMoreBtn = document.createElement('a');
			textWrapper.appendChild(readMoreBtn);
			readMoreBtn.setAttribute('href', '#');
			readMoreBtn.setAttribute('id', 'read-more-link');
			readMoreBtn.innerHTML = 'Читать отзыв полностью';

			readMoreBtn.onclick = (e) => {
				e.preventDefault();
				textWrapper = e.target.parentNode;
				let secondText = textWrapper.querySelector('#secondary-text');
				if ( secondText.hidden ) {
					readMoreBtn.innerHTML = 'Скрыть'
					secondText.hidden = false;
				} else {
					readMoreBtn.innerHTML = 'Читать отзыв полностью'
					secondText.hidden = true;
				}
			}
		}
	}

	// Решение проблемы с fslightbox
	const lightboxLinks = document.querySelectorAll('[data-fslightbox]');
	if ( lightboxLinks.length > 0 ) {
		let offsetTop = 0;
		window.onscroll = () => {
			offsetTop = window.pageYOffset;
			fsLightboxInstances['portfolio-gallery'].props.onOpen = () => {
				window.pageYOffset = offsetTop;
			}
			fsLightboxInstances['portfolio-gallery'].props.onClose = () => {
				window.scrollTo ({
					top: offsetTop,
					behavior: 'smooth'
				});
			}
		}
	}
});