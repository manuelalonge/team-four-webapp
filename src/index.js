import './styles.scss';

window.Dropzone = require('./assets/js/dropzone');
import "./assets/js/slider";

const messageError = document.querySelector(".message");
const messageText = document.querySelector(".message__text");
const closeMessage = document.querySelector(".close");
const spinner = document.querySelector("#spinner");
const modal = document.querySelector(".modal");
closeMessage.addEventListener("click", closeAlert);
const mainSlider = document.querySelector(".main-wrapper");

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
       document.querySelector("#button").addEventListener("click", function (e){
         //spinner.style.visibility = "visible";  
         //modal.style.display ="block";
         console.log(myDropzone.files[0].dataURL)
         mainSlider.style.display = "block";
         /* e.preventDefault();
          myDropzone.processQueue();    
          */
        });
      },
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

