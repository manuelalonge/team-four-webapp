import './styles.scss';

/* Take a photo function */
(function () {
    if (
      !"mediaDevices" in navigator ||
      !"getUserMedia" in navigator.mediaDevices
    ) {
      alert("Camera API is not available in your browser");
      return;
    }
  
    // get page elements
    const video = document.querySelector("#video");
    const btnPlay = document.querySelector("#btnPlay");
    const btnPause = document.querySelector("#btnPause");
    const btnScreenshot = document.querySelector("#btnScreenshot");
    const btnChangeCamera = document.querySelector("#btnChangeCamera");
    const screenshotsContainer = document.querySelector("#screenshots");
    const canvas = document.querySelector("#canvas");
    const devicesSelect = document.querySelector("#devicesSelect");
    var removeClass = document.querySelector("#btn_circle");


    //btn visible 
    
    removeClass.addEventListener("click", function() {

      var element = document.getElementByClassName("section");
      element.classList.remove("section-visible");
    } )         
 


    // video constraints
    const constraints = {
      video: {
        width: {
          min: 1280, 
          ideal: 1920, 
          max: 2560,
        },
        height: {
          min: 720, 
          ideal: 1080, 
          max: 1440,
        },
      },
    };
  
    // use front face camera
    let useFrontCamera = true;
  
    // current video stream
    let videoStream;
  
    // handle events
    // play
    btnPlay.addEventListener("click", function () {
      video.play();
      btnPlay.classList.add("is-hidden");
      btnPause.classList.remove("is-hidden");
    });
  
    // pause
    btnPause.addEventListener("click", function () {
      video.pause();
      btnPause.classList.add("is-hidden");
      btnPlay.classList.remove("is-hidden");
    });
  
    // take screenshot
    btnScreenshot.addEventListener("click", function () {
      const img = document.createElement("img");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
      img.src = canvas.toDataURL("image/png");
      screenshotsContainer.prepend(img);
    });
  
    // switch camera
    btnChangeCamera.addEventListener("click", function () {
      useFrontCamera = !useFrontCamera;
  
      initializeCamera();
    });
  
    // stop video stream
    function stopVideoStream() {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    }
  
    // initialize
    async function initializeCamera() {
      stopVideoStream();
      constraints.video.facingMode = useFrontCamera ? "user" : "environment";
  
      try {
        videoStream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = videoStream;
      } catch (err) {
        alert("Could not access the camera");
      }
    }
  
    initializeCamera();
  })();


/* Images Upload Functions (From Desktop) */

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
const sliderWrapper = document.querySelector(".slider-wrapper");
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
    sliderWrapper.style.width = sliderWidth + "px";
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
    sliderWrapper.style.transform = "translate(" + -newWidth + "px)";
}


