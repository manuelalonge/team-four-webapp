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

/* Slider */

var slideIndex = 1;
showSlides(slideIndex);

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
  dots[slideIndex-1].className += " active";
}