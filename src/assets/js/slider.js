/* Slider */

import slideImage from "./src/assets/images/slider-img.png";
import slideImageTwo from "./src/assets/images/open-graph-preview.png";

const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
var slideIndex = 1;
showSlides(slideIndex);

prevButton.addEventListener("click", plusSlides(slideIndex-2));
nextButton.addEventListener("click", plusSlides(slideIndex));

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slides-image-container");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}
