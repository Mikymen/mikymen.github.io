let box = document.getElementById("box");
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let drops,
  maxSpeed = 10.6,
  spacing = 300,
  xPosition,
  n;

function init() {
  canvas.width = box.clientWidth * 1.3;
  canvas.height = box.clientHeight * 1.3;

  drops = [];
  xPosition = 0;
  yPosition = 0;
  n = canvas.width / spacing;

  for (let i = 0; i < n; i++) {
    xPosition += spacing;
    yPosition = Math.round(Math.random() * canvas.height);
    _height = getRandom(20, 150);
    drops.push({
      x: xPosition,
      y: yPosition,
      width: 2.0,
      height: _height,
      speed: (_height / canvas.height) * maxSpeed,
      anguloR: 26 * (Math.PI / 180),
    });
  }
}

function cometas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < n; i++) {
    largo = drops[i].height / Math.tan(drops[i].anguloR);
    var my_gradient = context.createLinearGradient(
      drops[i].x,
      drops[i].y,
      drops[i].x - largo,
      drops[i].y + drops[i].height
    );

    my_gradient.addColorStop(0.1, "#ffffff00");
    my_gradient.addColorStop(0.95, "white");

    context.fillStyle = my_gradient;
    context.strokeStyle = my_gradient;
    context.lineWidth = drops[i].width;
    context.beginPath();
    context.moveTo(drops[i].x, drops[i].y);
    context.lineTo(drops[i].x - largo, drops[i].y + drops[i].height);
    context.stroke();
    drops[i].y += drops[i].speed;
    drops[i].x -= drops[i].speed * 2;

    if (drops[i].y > canvas.height || drops[i].x < 0) {
      drops[i].y = 0 - drops[i].height;
      drops[i].x = getRandom(0, n + 6) * spacing;
    }
  }
  requestAnimationFrame(cometas);
}
function stars() {
  let box = document.getElementById("stars");
  let canvas = document.getElementById("starfield"),
    context = canvas.getContext("2d"),
    stars = 120;
  canvas.width = box.clientWidth;
  canvas.height = box.clientHeight - 1.3;
  colorrange = [0, 60, 240];
  for (let i = 0; i < stars; i++) {
    //starSize = (Math.random() *2)+0.2;
    radius = Math.random() * 2.1;
    x = Math.random() * canvas.width;
    y = Math.random() * canvas.height;
    (hue = colorrange[getRandom(0, colorrange.length - 1)]),
      (sat = getRandom(50, 100));
    alpha = getRandom(20, 100);
    context.beginPath();
    context.arc(x, y, radius, 0, 360);
    context.fillStyle = "hsl(" + hue + ", " + sat + "%, 88%," + alpha + "%)";
    context.fill();
  }
}
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
function ctg(x) {
  return 1 / Math.tan(x);
}

function paralax() {
  let scrollTop = window.scrollY;
  let docHeight = document.body.offsetHeight;
  let winHeight = window.innerHeight;
  let scrollPercent = scrollTop / (docHeight - winHeight);
  let scrollPercentRounded = Math.round(scrollPercent * 100);
  var adiv = document.getElementById("bk");
  adiv.style.bottom = scrollPercentRounded - 100 + "%";
  adiv.style.transitionProperty = "all";
}

function main() {
  init();
  cometas();
  stars();
}

window.addEventListener("load", main, false);
//window.addEventListener('scroll',(paralax), false);
//window.addEventListener('resize', init, false);

/*--------language switch---------*/
function updateContent(langData) {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    console.log(element.tagName);
    if(element.tagName === "A"){      
      element.href = langData[key];
    }else{
      element.textContent = langData[key];
    }
  });
}

//let currentlanguage = navigator.language;

async function fetchLanguageData(lang) {
  const response = await fetch(`data/${lang}.json`);
  return response.json();
}

async function changeLanguage(lang) {
  //await setLanguagePreference(lang);

  const langData = await fetchLanguageData(lang);
  updateContent(langData);
  //toggleArabicStylesheet(lang); // Toggle Arabic stylesheet
}
window.addEventListener("DOMContentLoaded", async () => {
  //const userPreferredLanguage = localStorage.getItem('language') || 'en';
  const userPreferredLanguage = navigator.language;
  const langData = await fetchLanguageData(userPreferredLanguage);
  updateContent(langData);
  //toggleArabicStylesheet(userPreferredLanguage);
});
