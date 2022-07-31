const anchorLinks = document.querySelectorAll('.anchor-link');

anchorLinks.forEach(anchorLink => {
	anchorLink.addEventListener('click', function (e) {
		e.preventDefault();

		const id = this.getAttribute('href').substring(1);
		let scrollTarget = document.getElementById(id);
		let topOffset = scrollTarget.getBoundingClientRect().top + pageYOffset; // Если шапка фиксированная ( - header.offsetHeight )

		window.scrollTo ({
			top: topOffset,
			behavior: 'smooth'
		});
	});
});