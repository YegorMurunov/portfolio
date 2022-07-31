const parallaxContainers = document.querySelectorAll('.parallax');

window.addEventListener('resize', checkParallax);
checkParallax();

function checkParallax() {
	if ( isMobile.any() || window.innerWidth <= 1000 ) {
		body.classList.add('_no-parallax');
	} else {
		body.classList.contains('_no-parallax') ? body.classList.remove('_no-parallax') : '';
		if ( parallaxContainers.length > 0 ) {
			parallaxContainers.forEach(parallaxContainer => {
				const options = {
					root: null,
					threshold: 1.0,
				};

				const parallaxItems = parallaxContainer.querySelectorAll('.parallax__item');

				parallaxContainer.onmousemove = (e) => {
					const x = e.clientX / parallaxContainer.offsetWidth;
					const y = e.clientY / parallaxContainer.offsetHeight;

					for ( let i = 0; i < parallaxItems.length; i++ ) {
						parallaxItems[i].style.transform = `translate(-${x * 60}px, -${y * 60}px)`;
					};
				}

			});
		}
	}
}
