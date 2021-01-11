import './styles.scss';

const messageError = document.querySelector(".message");
const messageText = document.querySelector(".message__text");
const closeMessage = document.querySelector(".close");
const spinnerLoader = document.querySelector("#spinner");
const modal = document.querySelectorAll(".modal");

const mainWrapper = document.querySelector(".main-wrapper");
const slideContainer = document.querySelector(".slideshow-container");
const exitBtn = document.querySelector(".remove-button");




exitBtn.addEventListener("click", exitSlider);

// closeMessage.addEventListener("click", closeAlert);

// message error if the button ok is pressed the box disappear
// function closeAlert () {
//   messageError.style.display = "none";
// }

const inputImage = document.querySelector("#images-upload");
const modalGallery = document.querySelector(".load-images-gallery__modal");
const imageSelected = document.querySelector(".load-images-gallery__container");
const loadImageSquare = document.querySelector(".load-images-gallery__upload");
const upload = document.querySelector(".load-images-gallery__submit");

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    loadImageSquare.addEventListener(eventName, preventDefaults, false)
  })
  
  function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
  }


  loadImageSquare.addEventListener('drop', handleDrop, false)

function handleDrop(e) {
  let dt = e.dataTransfer
  let files = dt.files

  handleFiles(files)
}

function previewFile(file) {
    let reader = new FileReader()
    reader.readAsDataURL(file);

    reader.onloadend = function() {
    let dragImage = this.result;
    loadImage(dragImage);
    }
  }

  function handleFiles(files) {
    files = [...files]
    files.forEach(previewFile)
  }

let newImage;
let errorFormat;

(function init() {
    inputImage.addEventListener("change", selectImage);
})();


function selectImage() {
    if(errorFormat !== undefined) {
        errorFormat.innerText = "";
    }
    const image = Array.from(this.files);
  image.forEach(function(element) {
      if(element.type == "image/jpeg" || element.type == "image/png") {
        const reader = new FileReader();
        reader.addEventListener("load", loadImage);
        reader.readAsDataURL(element);
      } else {
          errorFormat = document.createElement("p");
          errorFormat.innerText = "The format of the file is invalid";
          loadImageSquare.appendChild(errorFormat);
      }
  });
}
        
function loadImage(src) {
  console.log(src);
    let imageLoaded = this;
    const imageBox = document.createElement("div");
    const imageContainer = document.createElement("div");
    const removeBtn = document.createElement("p");

    imageBox.classList.add("imageSelected");
    imageContainer.classList.add("imageContainer");
    removeBtn.classList.add("removeImage");
    removeBtn.innerHTML = "X"
    newImage = new Image();
    newImage.classList.add("readyImage");
    newImage.style.maxWidth = "100%";
    newImage.style.maxHeight = "400px";
    if(imageLoaded == undefined) {
      newImage.src = src;
    } else {
      newImage.src = this.result;
    }
    imageBox.appendChild(imageContainer);
    imageContainer.appendChild(newImage);
    imageBox.appendChild(removeBtn);
    loadImageSquare.appendChild(imageBox);

    Array.from(loadImageSquare.children).forEach(function(element) {
        element.querySelector(".removeImage").addEventListener("click", function(e) {
            e.preventDefault();
            if(loadImageSquare.children.length >= 1 ) {
                element.remove();
            }
            
        });
    });
  }
         
       
  upload.addEventListener("click", createSlide);
        
    function createSlide(e){
        e.preventDefault();
          /* if there are more than 0 slides already in the slider (maybe because i uploaded images before)
          it will remove them*/
        if(document.querySelectorAll(".slides-image-container").length > 0) {
            document.querySelectorAll(".slides-image-container").forEach(function(element) {
              element.parentNode.removeChild(element);
        })}
        modal[1].style.display = "block";
        mainWrapper.style.display = "block";
        let im = document.querySelectorAll(".readyImage");
          
        im.forEach(function(element,i) {
          const slides = document.createElement("div");
          slides.classList.add("slides-image-container");
        if(i == 0) {
          slides.style.display = "block";
        } 
        console.log(slides);
        const image = new Image();
        const result = document.createElement("div");
        result.classList.add("result-wrapper");

        image.classList.add("image");
        image.src = element.src;

        slides.appendChild(image);
        slides.appendChild(result);
        slides.children[0].style.display = "block";
        slideContainer.appendChild(slides);
      })
    }


/* Here I create the slides that composed the slideshow, i assigned the dataURL to the src,
based on the slider built by Manuel I give to the first slide the display block (index 0)
function createSlide(imageSrc, index) {
    e.preventDefault();
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
*/
// button to exit from the slider when the modal appear


function exitSlider () {
  mainWrapper.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == mainWrapper) {
    mainWrapper.style.display = "none";
  }
}

/* Default slide index is 1*/ 
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

  /* Increase slide index when you press the button next and decrease it when you press the button previous*/ 
  showSlides(slideIndex += n);
}

/* Thumbnail image controls */ 
 function currentSlide(n) {
   showSlides(slideIndex = n);
}

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

  





