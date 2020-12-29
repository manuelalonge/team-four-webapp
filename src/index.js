import './styles.scss';

window.Dropzone = require('./assets/js/dropzone');


const messageError = document.querySelector(".message");
const messageText = document.querySelector(".message__text");
const closeMessage = document.querySelector(".close");
const spinnerLoader = document.querySelector("#spinner");
const modalLoader = document.querySelector(".modal");
closeMessage.addEventListener("click", closeAlert);
const mainWrapper = document.querySelector(".main-wrapper");
const slideContainer = document.querySelector(".slideshow-container");


function closeAlert (event) {
    messageError.style.display = "none";
}


/*DROPZONE CUSTOMIZE CONFIGURATION*/
Dropzone.options.myawesomedropzone = {
  init: function() {
    
      this.on('addedfile', function(file) {
        
          if(this.files.length > 10) {
              this.removeFile(this.files[10]);
              messageError.style.display = "inline-block";
              messageText.innerHTML = "no more than 10";
          } else {
              messageError.style.display = "none";
          }
       });
       this.on('removedfile', function(file) {
          if(this.files.length < 10) {
              messageError.style.display = "none";
          } else {
              messageError.style.display = "inline-block";
          }
       });
       let myDropzone = this;
       let c = false;
       document.querySelector("#button").addEventListener("click", function (e){
         //spinnerLoader.style.visibility = "visible";  
         //modalLoader.style.display ="block";
         myDropzone.files.forEach(function(element,i) {
              createSlide(element.dataURL, i)
         });
         mainWrapper.style.display = "block";
         /* e.preventDefault();
          myDropzone.processQueue();    
          */
        });
      },
}

function createSlide(imageSrc, index) {
    const slides = document.createElement("div");
    slides.classList.add("slides-image-container");
    if(index == 0) {
      slides.style.display = "block";
    } 
    const image = new Image();
    const result = document.createElement("div");
    result.classList.add("result-wrapper");

    image.classList.add("image");
    image.src = imageSrc;

    slides.appendChild(image);
    slides.appendChild(result);
    slides.children[0].style.display = "block";
    slideContainer.appendChild(slides);
}



/* Default slide index is 1 */
var slideIndex = 1;
var slides = document.getElementsByClassName("slides-image-container");
showSlides(slideIndex);
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

/* Callback for previous button */
prevButton.addEventListener("click", function(){
  plusSlides(-1);
});

/* Callback for next button */
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
  var arr = Array.from(slides);
      console.log(arr);
 console.log(slides);
    var i;

  
    if(slides.length >0) {
      
      if (n > slides.length) {slideIndex = 1}
  
      if (n < 1) {slideIndex = slides.length}
    
      /* Display none applied to the slide if it is not the one displayed on the screen*/
    
      for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
      }
    
      /* Display the slide using display block if it is the one we're seeing on the screen */
      console.log(slides);
      slides[slideIndex-1].style.display = "block";
    }
  
  }



/* Take a photo function 
(function () {
    if (
      !"mediaDevices" in navigator ||
      !"getUserMedia" in navigator.mediaDevices
    ) {
      alert("Camera API is not available in your browser");
      return;
    }
  
    // get page elements
    const video = document.querySelector(".video__mobile");
    const btnPlay = document.querySelector(".btn__Play");
    const btnPause = document.querySelector(".btn__Pause");
    const btnScreenshot = document.querySelector(".btn__Screenshot");
    const btnChangeCamera = document.querySelector(".btn__ChangeCamera");
    const screenshotsContainer = document.querySelector(".container__screenshots");
    const canvas = document.querySelector(".container__canvas");
    //const devicesSelect = document.querySelector(".devicesSelect");
    var removeClass = document.querySelector(".btn__circle");


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


/* Images Upload Functions (From Desktop) 
*/

