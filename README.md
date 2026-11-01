# Procesverslag

> Dit is een sjabloon in dezelfde opbouw als je vorige procesverslag. De technische uitleg is ingevuld; alles wat over **jouw** proces, tests en gesprekken gaat moet je zelf invullen. Verwijder dit blokje als je klaar bent.

## Jij

### Auteur:
(naam)

#### Je startniveau:
(invullen)

#### Je focus:
Surface plane + responsive voor grotere devices

## Je website

### Je opdracht:
Nabouwen van twee pagina's van JINC (homepage en "Onze missie") op basis van mijn breakdown.

#### Screenshots (small screen):
(voeg je eigen screenshots toe in een map `readme-images/`)

## Toegankelijkheidstest 1/2 (week 1)

(invullen: bevindingen per onderdeel: screenreader, muis en toetsenbord, motoriek, visueel, en wat je ervan verbetert)

## Breakdownschets

(voeg je breakdown toe)

## Voortgang 1, 2 en 3

(invullen: wat ging goed, wat was lastig, agenda en verslag van de meeting)

## Toegankelijkheidstest 2/2

(invullen: bevindingen van je testpartner en wat je daarna hebt verbeterd)

## Eindgesprek (week 5)

### Je uitkomst - karakteristiek screenshots:

<img src="readme-images/uitkomst-desktop.png" width="375px" alt="homepage op een groot scherm">
<img src="readme-images/uitkomst-telefoon.png" width="375px" alt="homepage, zoekveld en open menu op een telefoon">
<img src="readme-images/uitkomst-menu.png" width="375px" alt="paars uitklapmenu op de missiepagina">

### Dit ging goed/Heb ik geleerd:
(invullen)

### Dit was lastig/Is niet gelukt:
(invullen)

## Uitleg van de code (voor het eindgesprek)

Zo is de site opgebouwd. Oefen dit hardop, je moet het kunnen uitleggen én aanpassen.

- **Mappen (zelfde opbouw als mijn Vue-site):** `index.html` en `missie.html`, `styles/` (algemeen `styles.css`, plus `home.css` en `missie.css` per pagina), `scripts/script.js`, `images/`, `readme-images/`.
- **Header (zoals mijn Vue-site):** op de homepage staat het logo in de `h1` en is het geen link (je bent al op de homepage); op de missiepagina is het logo een link naar home. Daarnaast de uitklapmenu's met `<details>` en `<summary>`, een zoekknop, de thema-knop en de hamburgerknop met een sluitknop in de `nav`.
- **Custom properties** (bovenaan `styles.css`): alle kleuren, lettertypes en de uitklaptijd staan op één plek. De donkere modus overschrijft alleen die variabelen via de class `.donker-modus`.
- **Thema-knop:** zet de class `donker-modus` op `body` en onthoudt de keuze in `localStorage` (met `try/catch`, omdat opslag geblokkeerd kan zijn).
- **Hamburgermenu:** de class `menuopenklappen` schuift de `nav` in beeld; `aria-expanded` houdt de screenreader op de hoogte. Bij openen gaat de focus naar de sluitknop en wordt de rest van de pagina `inert`, zodat je met Tab in het menu blijft. Sluitknop of Escape sluit het menu en zet de focus terug op de hamburger. Wordt het scherm breder dan 54em (telefoon draaien), dan sluit het menu vanzelf en staan de menukopjes gewoon in de header.
- **Pop-up nieuwsbrief:** het ingebouwde `<dialog>`-element. `showModal()` opent hem met donkere achtergrond en houdt de focus erbinnen; sluiten kan met de knop, Escape of een klik ernaast.
- **Cijfers die oplopen (micro-interactie):** `IntersectionObserver` merkt dat een getal in beeld komt, daarna telt `requestAnimationFrame` in 1,5 seconde op met een easing. Wie minder beweging wil (`prefers-reduced-motion`) ziet meteen het eindgetal.
- **Paarse uitklapmenu's (Ons werk, Doe mee, Over JINC):** `<details>` met `<summary>`, net als in mijn Vue-site. Openen en sluiten (ook met Enter en spatie) doet de browser zelf. JS regelt de extra's: maar één lijst tegelijk open (`toggle`-event), Escape sluit hem en zet de focus terug op het kopje, en een klik ernaast of met Tab eruit gaan (`focusout`, groot scherm) sluit hem ook.
- **Zoeken:** de vergrootglas-knop klapt het zoekveld uit (class `open`, `aria-expanded`), net als de zoekbalk op mijn Vue-site. Het formulier zoekt op jinc.nl via Google (`as_sitesearch`). Escape of een klik ernaast klapt het weer in.
- **Hero-foto:** loopt van rand tot rand. `aspect-ratio` maakt hem 3:2 op de telefoon, 2:1 op een tablet en 3:1 op een groot scherm (zoals de brede banner op jinc.nl); `object-fit: cover` en `object-position` houden de gezichten in beeld. De kop ligt er met `position: absolute` bovenop.
- **Springende plaatjes:** `@keyframes spring` laat de drie illustraties omhoog hoppen; JS zet eenmalig de class `springt` als ze in beeld komen (na elkaar door `--vertraging`), en `:hover` laat ze opnieuw springen.
- **Topbalk:** donkergrijze balk boven de header met service-links (JINC-podcast, Vacatures, Contact, Registreren) en de thema-knop.
- **Surface plane:** het stippenpatroon op de achtergrond van `body` (`radial-gradient`), dat meekleurt in de donkere modus.
- **Responsive:** mobile first. Vanaf 48em krijgen kaarten, nieuws, partners en cijfers meerdere kolommen; vanaf 54em staat het menu in de header en heeft de footer vier kolommen; vanaf 75em wordt de hero-foto een brede banner.
- **Kleurcontrast:** tekst op de teal vlakken is wit op `#00796f` (5.3:1) en linkkleur `#a84d00`, beide boven de 4.5:1 van WCAG AA. Ook de hoverkleur en de huidige pagina in het paarse menu halen 4.5:1, in licht én donker thema.

## Bronnenlijst

Bronnen voor de technieken in de code (voeg je eigen bronnen toe en vul aan wat je zelf hebt gebruikt):

1. https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
2. https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
3. https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
4. https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details
5. https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Using_CSS_custom_properties
6. https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
7. https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
8. https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert
9. https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame
10. https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes
11. https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient
12. https://www.a11yproject.com/posts/how-to-hide-content/
13. https://easings.net/#easeOutCubic
14. https://webaim.org/resources/contrastchecker/
15. https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio
16. https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries

De bronnen staan ook als `/* bron: ... */` in de code, bij het stuk waar ze gebruikt zijn.

Foto's, illustraties en logo's zijn van JINC (jinc.nl) en alleen gebruikt voor deze schoolopdracht.

> Let op: schrijf in je procesverslag eerlijk op welke hulp je hebt gebruikt, ook AI-hulp, en volg daarvoor de regels van je opleiding.
