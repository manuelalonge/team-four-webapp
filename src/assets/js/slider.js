/* Slider */

import slideImage from "../images/slider-img.png";
import slideImageTwo from "../images/open-graph-preview.png";

const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
var slideIndex = 1;
showSlides(slideIndex);

prevButton.addEventListener("click", function(){
  plusSlides(-1);
});

nextButton.addEventListener("click", function(){
  plusSlides(1);
});

// Next/previous controls
function plusSlides(n) {
  console.log("plus slides is working");
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
