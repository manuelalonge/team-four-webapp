import "./styles.scss";

/* Images Upload Functions */

const inputImage = document.querySelector(".images-upload");
const imagesContainer = document.querySelector(".load-images-gallery__images-container");

(function init() {
    inputImage.addEventListener("change", selectImage);
})();


function selectImage() {
    const image = this.files[0];
    if(image) {
        const reader = new FileReader();
        reader.addEventListener("load", loadImage);
        reader.readAsDataURL(image);
    }
}
        
function loadImage() {
    if(imagesContainer.children.length < 10) {
        const newImage = new Image();
        newImage.src = this.result;
        imagesContainer.appendChild(newImage);
    } else {
        console.log("error");
    }
    
}

/* Slider Functions*/

const buttons = document.querySelectorAll(".icons");
const imageWrapper = document.querySelectorAll(".image-wrapper");
const imageBiggerWrapper = document.querySelector(".image-bigger-wrapper");
const totalImageWrapper = imageWrapper.length;

let current = 0;
let vw;
let startX;
let resizeTimeout;

(function init() {
    setSlider();

    window.onresize = function(){
        clearTimeout(resizeTimeout);
        resizeTimeout= setTimeout (handleResize, 100);
    } 

    for(i=0; i < imageWrapper.length; i++) {
        imageWrapper[i].style.width = vw + "px";
    }

    for(i=0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", changeSlide)
        window.addEventListener("keydown", changeSlideKey)
        document.addEventListener('touchstart', Swipe);
        document.addEventListener('touchend', endSwipe, false);
    }
})();

function setSlider() {
    vw = window.innerWidth;
    sliderWidth = vw * totalImageWrapper;
    imageBiggerWrapper.style.width = sliderWidth + "px";
    for(i=0; i < imageWrapper.length; i++) {
        imageWrapper[i].style.width = vw + "px";
    }
}

function handleResize() {
    setSlider();
}

// Change slide with mouse click 
function changeSlide() {
   
    let action = this.getAttribute("data-action");
    if(action == "p") {
        next();
        goSlide(current);
    } 
    else if(action == "n") {
        prev();
        goSlide(current);
    }
   
  
}

// Change slide with keyboard click
function changeSlideKey(event) {
    if(event.keyCode == 37) {
       
        next();
        goSlide(current);
    } 
    else if(event.keyCode == 39) {
        prev();
        goSlide(current);
    }
}


// Change slide with touch
function Swipe(event) {
    var touch = event.touches[0];
    startX = touch.pageX;
}

function endSwipe(event) {
    var touch = event.changedTouches[0];
    dist = touch.pageX - startX;
    if(dist > 50 && dist < 300 ) {
        next();
        goSlide(current);
    } else if(dist < -50 && dist > -300) {
        prev();
        goSlide(current);
    }
     return false;
}

// Choosing next or prev slide
function next() {
    if(current > 0) {
        current--;
    } else {
        current = totalImageWrapper -1;
    }
}

function prev () {
    if(current < totalImageWrapper-1) {
        current = totalImageWrapper -1;
    } else if (current >= totalImageWrapper-1) {   
        current--;  
    }
}

// Take current and go to the right slide
function goSlide(change) {    
    let newWidth = change * vw;
    imageBiggerWrapper.style.transform = "translate(" + -newWidth + "px)";
}

