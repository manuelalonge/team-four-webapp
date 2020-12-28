/* Slider */

<<<<<<< HEAD
import slideImage from "../images/slider-img.png";
import slideImageTwo from "../images/open-graph-preview.png";
=======
// import slideImage from "./src/assets/images/slider-img.png";
// import slideImageTwo from "./src/assets/images/open-graph-preview.png";
>>>>>>> develop

/* Default slide index is 1 */
var slideIndex = 1;
showSlides(slideIndex);
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

/* Callback for previous button */
prevButton.addEventListener("click", function(){
  plusSlides(-1);
});

/* Callback for previous button */
nextButton.addEventListener("click", function(){
  plusSlides(1);
});

/* Next / previous controls */
function plusSlides(n) {
  console.log("Slider buttons are working correctly");

  /* Increase slide index when you press the button next and decrease it when you press the button previous */
  showSlides(slideIndex += n);
}

/* Thumbnail image controls 
 function currentSlide(n) {
   showSlides(slideIndex = n);
}*/

function showSlides(n) {

  var i;

  var slides = document.getElementsByClassName("slides-image-container");

  if (n > slides.length) {slideIndex = 1}

  if (n < 1) {slideIndex = slides.length}

  /* Display none applied to the slide if it is not the one displayed on the screen*/

  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }

  /* Display the slide using display block if it is the one we're seeing on the screen */

  slides[slideIndex-1].style.display = "block";

}
