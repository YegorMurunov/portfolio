const isMobile = {
	Android: function() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function() {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function() {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};

if ( isMobile.any() ) {
	document.body.classList.add('_touch');
	// viberMobLinks();
} else {
	document.body.classList.add('_pc');
	// viberPcLinks();
}

function checkWebP(callback) {
	let webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}

checkWebP(function(support) {
	if(support) {
		body.classList.add('_webp');
	} else {
		console.log("webp doesn't work in your browser");
	}
});

function randomInt(min, max) {
	let rand = min - 0.5 + Math.random() * (max - min + 1);
	return Math.round(rand)
}

function removeClass(arr, className="_active") {
	for ( let i = 0; i < arr.length; i++ ) {
		if ( arr[i].classList.contains(className) ) {
			arr[i].classList.remove(className);
		}
	}
}

// viber links
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