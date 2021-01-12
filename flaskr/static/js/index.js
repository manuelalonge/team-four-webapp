import './styles.scss';


const spinnerLoader = document.querySelector("#spinner");
const modal = document.querySelectorAll(".modal");

//slide variables
const mainWrapper = document.querySelector(".main-wrapper");
const slideContainer = document.querySelector(".slideshow-container");
const exitBtn = document.querySelector(".remove-button");


//upload dropzone variables
const inputImage = document.querySelector("#images-upload");
const modalGallery = document.querySelector(".load-images-gallery__modal");
const imageSelected = document.querySelector(".load-images-gallery__container");
const loadImageSquare = document.querySelector(".load-images-gallery__upload");
const upload = document.querySelector(".load-images-gallery__submit");

//error message
const messageError = document.querySelector(".message");
const messageText = document.querySelector(".message__text");
const closeMessage = document.querySelector(".close");

//drag and drop function: prevent the default behaviour for every event(the default is to not drop)
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    loadImageSquare.addEventListener(eventName, preventDefaults, false)
  })
  
  function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
  }

//drop event
  loadImageSquare.addEventListener('drop', handleDrop, false)

// take the files you drop from e.dataTransfer and call handle Files function
function handleDrop(e) {
  let dt = e.dataTransfer
  let files = dt.files
  handleFiles(files)
}

// transform the files in an array and call the previewFile function to display them
function handleFiles(files) {
  files = [...files]
  files.forEach(previewFile)
}

//the preview function the che fileReader object and search the dataURL of the file dropped
function previewFile(file) {
    let reader = new FileReader()
    reader.readAsDataURL(file);

    reader.onloadend = function() {
      // here I take the dataURL and assign it to a variable to pass it to loadImage function
    let dragImage = this.result;
    loadImage(dragImage);
    }
  }

  

let newImage;
let errorFormat;

(function init() {
    inputImage.addEventListener("change", selectImage);
    // message error if the button ok is pressed the box disappear
    closeMessage.addEventListener("click", function() {
      messageError.style.display = "none";
    });
    exitBtn.addEventListener("click", exitSlider);
})();


// image selection from gallery function
function selectImage() {
    if(errorFormat !== undefined) {
        errorFormat.innerText = "";
    }
    const image = Array.from(this.files);
  image.forEach(function(element) {
    // if the file is a jpeg or png take the dataURL andcall the loadImage function else return error 
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
    
//function to return the images on the square
function loadImage(src) {
    //I save the "this" into the variable because its value depends on the choose: drag and drop or selection from gallery
    let imageLoaded = this;
    const maxImages = 10;

    const imageBox = document.createElement("div");
    const imageContainer = document.createElement("div");
    const removeBtn = document.createElement("p");

    // here the error message if the images are more than 10
    if(loadImageSquare.children.length >= maxImages){
      //Array.from(loadImageSquare.children)[maxImages-1].remove();
      messageError.style.display = "inline-block";
      messageText.innerHTML = "no more than 10";
          } 
    else {
      messageError.style.display = "none";
    imageBox.classList.add("imageSelected");
   
    imageContainer.classList.add("imageContainer");
    removeBtn.classList.add("removeImage");
    removeBtn.innerHTML = "X"
    newImage = new Image();
    newImage.classList.add("readyImage");
    newImage.style.maxWidth = "100%";
    newImage.style.maxHeight = "400px";
    //if the "this" that comes from the selectImage function (from gallery) is undefined it means that I call the drag and drop so I assign the dataURL value to image
    if(imageLoaded == undefined) {
      newImage.src = src;
    } else {
      newImage.src = this.result;
    }
    imageBox.appendChild(imageContainer);
    imageContainer.appendChild(newImage);
    imageBox.appendChild(removeBtn);
    loadImageSquare.appendChild(imageBox);

    // here you can remove the image you want by clicking on X 
    Array.from(loadImageSquare.children).forEach(function(element) {
        element.querySelector(".removeImage").addEventListener("click", function(e) {
            e.preventDefault();
            element.remove();
        });
    });
  }
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
        // the modal with silder appear
        modal[1].style.display = "block";
        mainWrapper.style.display = "block";
        
        //here I took all the images loaded inside the dropzone and loop through them
        let readyImages = document.querySelectorAll(".readyImage");
        
        readyImages.forEach(function(element,i) {
          const slides = document.createElement("div");
          slides.classList.add("slides-image-container");
          // based on Manuel code for the slider I had to give to the first the display block style
        if(i == 0) {
          slides.style.display = "block";
        } 

        const image = new Image();
        const result = document.createElement("div");
        result.classList.add("result-wrapper");

        image.classList.add("image");
        // here I give to the image on the slider the same src that comes from the images on dropzone
        image.src = element.src;

        slides.appendChild(image);
        slides.appendChild(result);
        slides.children[0].style.display = "block";
        slideContainer.appendChild(slides);
      })
    }

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

  





