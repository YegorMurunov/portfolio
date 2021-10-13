const closeIcon = document.querySelector('.header__menu-icon');
const nav = document.querySelector('.header__nav');

if (closeIcon) {
	closeIcon.addEventListener('click', () => {
		if (closeIcon.classList.contains('active')) {
			closeIcon.classList.remove('active');
			nav.classList.remove('active');
			document.body.classList.remove('lock');
		} else {
			closeIcon.classList.add('active');
			nav.classList.add('active');
			document.body.classList.add('lock');
		}
	});
}