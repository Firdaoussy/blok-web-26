// JavaScript Document

/*algemeen*/
/* alle onderdelen worden eerst opgezocht; bestaat een onderdeel niet op de pagina, dan doet dat stukje niets */

let body = document.querySelector("body");

/*donker en licht thema*/

let themaKnop = document.querySelector(".themaknop");

// onthoud de keuze van de bezoeker (try/catch voor als opslag geblokkeerd is)
// bron: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
try {
	if (localStorage.getItem("thema") === "donker") {
		body.classList.add("donker-modus");
		themaKnop.textContent = "Licht";
	}
} catch (fout) {
	console.log("Opslag niet beschikbaar", fout);
}

themaKnop.addEventListener("click", wisselThema);

function wisselThema() {
	let isDonker = body.classList.toggle("donker-modus");
	themaKnop.textContent = isDonker ? "Licht" : "Donker";

	try {
		localStorage.setItem("thema", isDonker ? "donker" : "licht");
	} catch (fout) {
		console.log("Opslag niet beschikbaar", fout);
	}
}

/*hamburgermenu (telefoon)*/
// const omdat deze items niet veranderen 
const hamburgerKnop = document.querySelector(".hamburger");
const nav = document.querySelector("header nav");
const sluitKnop = document.querySelector(".sluitknop");

// hamburgerknop die luisterd of erop geklinkt wordt omdat er click
//  staat en als er dan op gelkikt wordt dan gaat de klap menu open
hamburgerKnop.addEventListener("click", klapMenuOpen);

sluitKnop.addEventListener("click", function () {
	klapMenuDicht();
	hamburgerKnop.focus(); // focus terug naar de knop waarmee je het menu opende
});
// het verschil tussen regel 46 en regel 70 is dat 46 het sluitknopje (menu) sluit
// en 70 focust zich op waar je op hebt geklikt. 


function menuIsOpen() {
	return nav.classList.contains("menuopenklappen");
}

function klapMenuOpen() {
	nav.classList.add("menuopenklappen");
	hamburgerKnop.setAttribute("aria-expanded", "true");
	// sluitknop.focus zorgt ervoor dat je met je tab er langs kunt
	sluitKnop.focus();
}

function klapMenuDicht() {
	sluitSubmenus();
	nav.classList.remove("menuopenklappen");
	hamburgerKnop.setAttribute("aria-expanded", "false");
}

// kies je een link in het menu, dan klapt het menu weer dicht
nav.querySelectorAll("a").forEach(function (link) {
	link.addEventListener("click", klapMenuDicht);
});

// wordt het scherm breed (telefoon draaien, venster groter), dan is het hamburgermenu niet meer nodig
let grootScherm = window.matchMedia("(min-width: 54em)");

grootScherm.addEventListener("change", function () {
	if (grootScherm.matches && menuIsOpen()) {
		klapMenuDicht();
	}
});

/*uitklaplijsten in het menu (details en summary, het paarse paneel)*/
/*details klapt zelf open en dicht, ook met Enter en spatie; JS regelt alleen de extra's*/

let menuLijsten = document.querySelectorAll("header nav details");

menuLijsten.forEach(function (lijst) {
	// maar één lijst tegelijk open
	lijst.addEventListener("toggle", function () {
		if (lijst.open) {
			menuLijsten.forEach(function (andereLijst) {
				if (andereLijst !== lijst) {
					andereLijst.open = false;
				}
			});
		}
	});

	// groot scherm: ga je met Tab uit de lijst, dan klapt hij dicht
	// (op de telefoon staat de lijst gewoon in het menu; dichtklappen zou het menu laten verspringen)
	lijst.addEventListener("focusout", function (event) {
		if (grootScherm.matches && event.relatedTarget && !lijst.contains(event.relatedTarget)) {
			lijst.open = false;
		}
	});
});

function sluitSubmenus() {
	menuLijsten.forEach(function (lijst) {
		lijst.open = false;
	});
}

/*zoeken: de knop klapt het zoekveld uit (net als de zoekbalk op mijn Vue-site)*/

let zoekFormulier = document.querySelector(".zoeken");
let zoekKnop = document.querySelector(".zoekknop");
let zoekVeld = document.querySelector("#zoekveld");

zoekKnop.addEventListener("click", function () {
	let isOpen = zoekFormulier.classList.toggle("open");
	zoekKnop.setAttribute("aria-expanded", isOpen);

	if (isOpen) {
		zoekVeld.focus();
	}
});

function sluitZoeken() {
	zoekFormulier.classList.remove("open");
	zoekKnop.setAttribute("aria-expanded", "false");
}

// klik ergens anders op de pagina: open uitklaplijst en zoekveld gaan dicht
document.addEventListener("click", function (event) {
	if (!event.target.closest("header nav details")) {
		sluitSubmenus();
	}

	if (!event.target.closest(".zoeken")) {
		sluitZoeken();
	}
});

/*Escape: eerst een open uitklaplijst of zoekveld dicht, anders het hamburgermenu*/

document.addEventListener("keydown", function (event) {
	if (event.key !== "Escape") {
		return;
	}

	let openLijst = document.querySelector("header nav details[open]");

	if (openLijst) {
		openLijst.open = false;
		openLijst.querySelector("summary").focus(); // focus niet kwijtraken in de verborgen lijst
	} else if (zoekFormulier.classList.contains("open")) {
		sluitZoeken();
		zoekKnop.focus();
	} else if (menuIsOpen()) {
		klapMenuDicht();
		hamburgerKnop.focus();
	}
});

/*pop-up nieuwsbrief (dialog)*/
/*bron: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog*/

let popup = document.querySelector("#nieuwsbrief-popup");
let popupMelding = popup.querySelector(".popup-melding");
let popupMail = popup.querySelector("input");
let doeMeeKnoppen = document.querySelectorAll(".doemee-knop");

let popupOpener; // de knop waarmee de pop-up geopend is

doeMeeKnoppen.forEach(function (knop) {
	knop.addEventListener("click", function () {
		popupOpener = knop;
		klapMenuDicht();
		popupMelding.textContent = "";
		popup.showModal();
		popupMail.focus();
	});
});

popup.querySelector(".popup-sluit").addEventListener("click", function () {
	popup.close();
});

// stond de knop in het menu (dat nu dicht is), zet de focus dan terug op een zichtbare plek
popup.addEventListener("close", function () {
	let lijst = popupOpener ? popupOpener.closest("header nav details") : null;

	if (!lijst) {
		return; // knop staat gewoon op de pagina: de browser zet de focus zelf terug
	}

	if (grootScherm.matches) {
		lijst.querySelector("summary").focus();
	} else {
		hamburgerKnop.focus();
	}
});

// klik naast de pop-up (op de achtergrond) sluit hem ook
popup.addEventListener("click", function (event) {
	if (event.target === popup) {
		popup.close();
	}
});

// bevestiging tonen in plaats van de pop-up meteen te sluiten
popup.querySelector("form").addEventListener("submit", function (event) {
	event.preventDefault();
	popupMelding.textContent = "Bedankt! Je ontvangt binnenkort onze nieuwsbrief op " + popupMail.value + ".";
	popupMail.value = "";
});

/*cijfers die oplopen (alleen op de missiepagina)*/
/*bron: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API*/
// Dat is voor het in de buurt scrollen, zodat de animatie gaat starten
/*bron: https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame*/
/*bron easing: https://easings.net/#easeOutCubic*/

// Inspiratie
// https://www.geeksforgeeks.org/html/how-to-make-animated-counter-using-javascript/
// https://dev.to/codingcss/responsive-number-counting-animation-with-javascript-project-with-source-code-2m5
// https://medium.com/@phornphatch/create-a-scroll-triggered-counting-number-animation-from-0-to-css-js-0e1937a02359

let statGetallen = document.querySelectorAll(".stat-getal");
let wilGeenBeweging = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (statGetallen.length > 0 && !wilGeenBeweging) {
	// start pas met tellen als het getal in beeld komt
	// dit heb ik met ai geimplementeerd
	let waarnemer = new IntersectionObserver(function (items) {
		items.forEach(function (item) {
			if (item.isIntersecting) {
				telOp(item.target);
				waarnemer.unobserve(item.target);
			}
		});
	}, { threshold: 0.6 });

	statGetallen.forEach(function (getal) {
		waarnemer.observe(getal);
	});
}

function telOp(element) {
	let eind = Number(element.dataset.eind);
	let duur = 1500;
	let start = performance.now();

	function stap(nu) {
		let voortgang = Math.min((nu - start) / duur, 1);
		let vertraagd = 1 - Math.pow(1 - voortgang, 3); // easing: snel beginnen, rustig eindigen
		element.textContent = Math.round(eind * vertraagd).toLocaleString("nl-NL");

		if (voortgang < 1) {
			requestAnimationFrame(stap);
		}
	}

	requestAnimationFrame(stap);
}

/*plaatjes die springen (alleen op de homepage)*/

let groeitKaarten = document.querySelectorAll(".groeit li");

// geen springen voor wie minder beweging wil (de CSS zet de animatie dan ook al uit)
if (groeitKaarten.length > 0 && !wilGeenBeweging) {
	// zodra een kaart in beeld komt, springt het plaatje een keer
	let springWaarnemer = new IntersectionObserver(function (items) {
		items.forEach(function (item) {
			if (item.isIntersecting) {
				item.target.classList.add("springt");
				springWaarnemer.unobserve(item.target);
			}
		});
	}, { threshold: 0.6 });

	groeitKaarten.forEach(function (kaart, nummer) {
		kaart.style.setProperty("--vertraging", nummer * 0.15 + "s"); // de drie springen na elkaar
		springWaarnemer.observe(kaart);

		// class weer weghalen, dan kan hover opnieuw laten springen
		kaart.addEventListener("animationend", function () {
			kaart.classList.remove("springt");
		});
	});
}
