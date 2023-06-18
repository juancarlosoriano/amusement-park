// Image links
const CAROUSEL_IMAGES = [
  "./images/epona_coaster.jpg",
  "./images/ganon_coaster.jpg",
  "./images/gerudo_gokart.jpg",
];

const CAROUSEL_TITLES = [
  "Epona's Wild Ride",
  "The Temple of Time",
  "Gerudo Valley Go-Karts",
];

const CAROUSEL_DESCRIPTIONS = [
  "Experience the exhilaration of riding with Link's loyal steed, Epona, in this high-speed wooden roller coaster. Gallop through the fields of Hyrule at breakneck speeds, with twists, turns, and jumps that mimic Epona's agile movements.",
  "Step into the mystical Temple of Time and unlock the secrets of the Triforce. Brace yourself for a mind-bending adventure as you navigate through ancient chambers, solve puzzles, and manipulate time itself. Feel the thrill of discovery as you uncover hidden treasures and face the challenges that await within the temple. Will you have the wisdom, courage, and power to emerge victorious?",
  "Race against your friends in this thrilling go-kart track that winds through the sandy dunes and rocky cliffs of Gerudo Valley. Feel the wind in your hair as you drift around corners and speed down straightaways. Will you be the first to cross the finish line?",
];

let carouselImage;
let carouselTitle;
let carouselText;
let carouselButton;
let carouselIndex = 0;

window.onload = () => {
  // Set up
  setCarouselButtons();
  setCarousel();
};

const setCarouselButtons = () => {
  for (let i = 0; i < CAROUSEL_TITLES.length; i++) {
    carouselButton = document.getElementById("carousel-btn-" + i);
    carouselButton.addEventListener("click", (e) => {
      carouselIndex = i;
      setCarousel();
    });
  }
};

const setCarousel = () => {
  carouselImage = document.getElementById("carousel-img");
  carouselImage.src = CAROUSEL_IMAGES[carouselIndex];

  carouselTitle = document.getElementById("carousel-desc-title");
  carouselTitle.innerHTML = CAROUSEL_TITLES[carouselIndex];

  carouselText = document.getElementById("carousel-desc-text");
  carouselText.innerHTML = CAROUSEL_DESCRIPTIONS[carouselIndex];

  for (let i = 0; i < CAROUSEL_TITLES.length; i++) {
    carouselButton = document.getElementById("carousel-btn-" + i);

    if (i == carouselIndex) {
      carouselButton.className = "carousel-btn carousel-btn-active";
    } else {
      carouselButton.className = "carousel-btn";
    }

    console.log("hello!");
  }
};
