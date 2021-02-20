/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/landing_page.js":
/*!*****************************!*\
  !*** ./src/landing_page.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.scss */ \"./src/styles.scss\");\n\n/* \r\nThe file makes the drag & drop work and creates the thumbnail of the picture when put inside the drsg & drop box.\r\n\r\nMoreover it puts the images into the slider once they're put inside the box \r\n*/\n// Landing Page JS\n\nconst spinnerLoader = document.querySelector(\"#spinner\");\nconst modal = document.querySelectorAll(\".modal\"); //slide variables\n\nconst mainWrapper = document.querySelector(\".main-wrapper\");\nconst slideContainer = document.querySelector(\".slideshow-container\");\nconst exitBtn = document.querySelector(\".remove-button\"); //History search variables\n\nconst searchHistoryWrapper = document.querySelector(\".history-search\");\nconst searchHistoryButton = document.querySelector(\".load-images-history__submit\");\nconst searchHistorySpan = document.querySelector(\".history-search--close\"); //upload dropzone variables\n\nconst loadImageSquare = document.querySelector(\".load-images-gallery__upload\"); //error message\n\nconst messageError = document.querySelector(\".message\");\nconst messageText = document.querySelector(\".message__text\");\nconst closeMessage = document.querySelector(\".close\");\nconst upload = document.querySelector(\".load-images-gallery__submit\");\nlet newImage;\nlet errorFormat;\n\n(function init() {\n  const inputImage = document.querySelector(\"#images-upload\");\n  inputImage.addEventListener(\"change\", selectImage); // message error if the button ok is pressed the box disappear\n\n  upload.addEventListener(\"click\", createSlide);\n  exitBtn.addEventListener(\"click\", exitSlider);\n})();\n\nconst historySearch = document.querySelector(\".history-search\"); // dragAndDrop initialize function\n\n(function dragAndDrop() {\n  //drag and drop function: prevent the default behaviour for every event(the default is to not drop)\n  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {\n    loadImageSquare.addEventListener(eventName, preventDefaults, false);\n  });\n\n  function preventDefaults(e) {\n    e.preventDefault();\n    e.stopPropagation();\n  } //drop event\n\n\n  loadImageSquare.addEventListener('drop', handleDrop, false); // take the files you drop from e.dataTransfer and call handle Files function\n\n  function handleDrop(e) {\n    let dt = e.dataTransfer;\n    let files = dt.files;\n    console.log(files);\n    handleFiles(files);\n  } // transform the files in an array and call the previewFile function to display them\n\n\n  function handleFiles(files) {\n    files = [...files];\n    files.forEach(previewFile);\n  } //the preview function the che fileReader object and search the dataURL of the file dropped\n\n\n  function previewFile(file) {\n    if (errorFormat !== undefined) {\n      errorFormat.remove();\n    }\n\n    let reader = new FileReader();\n    reader.readAsDataURL(file);\n\n    reader.onloadend = function () {\n      // here I take the dataURL and assign it to a variable to pass it to loadImage function if type is correct\n      if (file.type == \"image/jpeg\" || file.type == \"image/png\") {\n        let dragImage = this.result;\n        loadImage(dragImage);\n      } else {\n        errorType();\n      }\n    };\n  }\n})(); // image selection from gallery function\n\n\nfunction selectImage() {\n  if (errorFormat !== undefined) {\n    errorFormat.remove();\n  }\n\n  const image = Array.from(this.files);\n  image.forEach(function (element) {\n    // if the file is a jpeg or png take the dataURL and call the loadImage function else return error \n    if (element.type == \"image/jpeg\" || element.type == \"image/png\") {\n      const reader = new FileReader();\n      reader.addEventListener(\"load\", loadImage);\n      reader.readAsDataURL(element);\n    } else {\n      errorType();\n    }\n  });\n} // function called if the type of image is invalid\n\n\nfunction errorType() {\n  errorFormat = document.createElement(\"p\");\n  errorFormat.innerText = \"The format of the file is invalid\";\n  loadImageSquare.appendChild(errorFormat);\n} //function to return the images on the square\n\n\nfunction loadImage(src) {\n  //I save the \"this\" into the variable because its value depends on the choose: drag and drop or selection from gallery\n  let imageLoaded = this;\n  const maxImages = 10; // here the error message if the images are more than 10\n\n  if (loadImageSquare.children.length >= maxImages) {\n    //Array.from(loadImageSquare.children)[maxImages-1].remove();\n    messageError.style.display = \"inline-block\";\n    messageText.innerHTML = \"no more than 10\";\n  } else {\n    messageError.style.display = \"none\";\n    imageCreation(); //if the \"this\" that comes from the selectImage function (from gallery) is undefined it means that I call the drag and drop so I assign the dataURL value to image\n\n    if (imageLoaded == undefined) {\n      newImage.src = src;\n    } else {\n      newImage.src = this.result;\n    } // when the button is clicked and an image is uploaded the button result appear\n\n\n    upload.style.display = \"inline-block\"; // here you can remove the image you want by clicking on X \n\n    Array.from(loadImageSquare.children).forEach(function (element) {\n      element.querySelector(\".removeImage\").addEventListener(\"click\", function (e) {\n        e.preventDefault();\n        element.remove(); // when remove button is clicked and the container has 0 elements the result button has display none\n\n        if (loadImageSquare.children.length == 0) {\n          upload.style.display = \"none\";\n        }\n      });\n    });\n    closeMessage.addEventListener(\"click\", function () {\n      messageError.style.display = \"none\";\n    });\n  }\n}\n\nfunction imageCreation() {\n  const imageBox = document.createElement(\"div\");\n  const imageContainer = document.createElement(\"div\");\n  const removeBtn = document.createElement(\"p\");\n  imageBox.classList.add(\"load-images-gallery__selected\");\n  imageContainer.classList.add(\"load-images-gallery__img-container\");\n  removeBtn.classList.add(\"removeImage\");\n  removeBtn.innerHTML = \"X\";\n  newImage = new Image();\n  newImage.classList.add(\"load-images-gallery__ready-image\");\n  newImage.style.maxWidth = \"100%\";\n  newImage.style.maxHeight = \"400px\";\n  imageBox.appendChild(imageContainer);\n  imageContainer.appendChild(newImage);\n  imageBox.appendChild(removeBtn);\n  loadImageSquare.appendChild(imageBox);\n}\n\nfunction createSlide(e) {\n  e.preventDefault();\n  /* if there are more than 0 slides already in the slider (maybe because i uploaded images before)\r\n  it will remove them*/\n\n  if (document.querySelectorAll(\".slides-image-container\").length > 0) {\n    document.querySelectorAll(\".slides-image-container\").forEach(function (element) {\n      element.parentNode.removeChild(element);\n    });\n  } // the modal with silder appear\n\n\n  modal[1].style.display = \"block\";\n  mainWrapper.style.display = \"block\"; //here I took all the images loaded inside the dropzone and loop through them\n\n  let readyImages = document.querySelectorAll(\".load-images-gallery__ready-image\");\n  readyImages.forEach(function (element, i) {\n    const slides = document.createElement(\"div\");\n    slides.classList.add(\"slides-image-container\"); // based on Manuel code for the slider I had to give to the first the display block style\n\n    if (i == 0) {\n      slides.style.display = \"block\";\n    }\n\n    const image = new Image();\n    const result = document.createElement(\"div\");\n    result.classList.add(\"result-wrapper\");\n    image.classList.add(\"image\"); // here I give to the image on the slider the same src that comes from the images on dropzone\n\n    image.src = element.src;\n    slides.appendChild(image);\n    slides.appendChild(result);\n    slides.children[0].style.display = \"block\";\n    slideContainer.appendChild(slides);\n  });\n} // button to exit from the slider when the modal appear\n\n\nfunction exitSlider() {\n  mainWrapper.style.display = \"none\";\n} // When the user clicks anywhere outside of the modal, close it\n\n\nwindow.onclick = function (event) {\n  if (event.target == mainWrapper) {\n    mainWrapper.style.display = \"none\";\n  }\n}; // SLIDER SECTION\n// Default slide index is 1\n\n\nvar slideIndex = 1;\nvar slides = document.getElementsByClassName(\"slides-image-container\");\nshowSlides(slideIndex);\nconst prevButton = document.querySelector(\".prev\");\nconst nextButton = document.querySelector(\".next\"); // Callback for previous button\n\nprevButton.addEventListener(\"click\", function () {\n  plusSlides(-1);\n}); // Callback for next button \n\nnextButton.addEventListener(\"click\", function () {\n  plusSlides(1);\n}); // Next / previous controls\n\nfunction plusSlides(n) {\n  console.log(\"Slider buttons are working correctly\"); // Increase slide index when you press the button next and decrease it when you press the button previous\n\n  showSlides(slideIndex += n);\n} // Thumbnail image controls \n\n\nfunction currentSlide(n) {\n  showSlides(slideIndex = n);\n}\n\nfunction showSlides(n) {\n  var arr = Array.from(slides);\n  console.log(arr);\n  console.log(slides);\n  var i;\n\n  if (slides.length > 0) {\n    if (n > slides.length) {\n      slideIndex = 1;\n    }\n\n    if (n < 1) {\n      slideIndex = slides.length;\n    } // Display none applied to the slide if it is not the one displayed on the screen\n\n\n    for (i = 0; i < slides.length; i++) {\n      slides[i].style.display = \"none\";\n    } // Display the slide using display block if it is the one we're seeing on the screen\n\n\n    console.log(slides);\n    slides[slideIndex - 1].style.display = \"block\";\n  }\n}\n/* The following block of instructions is what helps the history search modal to work correctly. \r\n\r\nWhat's the history search modal? Basically the modal where user will be able to find all his/her previous img searches*/\n// When the user clicks on the button, the modal opens\n\n\nsearchHistoryButton.onclick = function () {\n  searchHistoryWrapper.style.display = 'block';\n}; // When the user clicks on the span, the modal closes\n\n\nsearchHistorySpan.onclick = function () {\n  searchHistoryWrapper.style.display = 'none';\n};\n\n//# sourceURL=webpack://team-four-webapp-frontend/./src/landing_page.js?");

/***/ }),

/***/ "./src/styles.scss":
/*!*************************!*\
  !*** ./src/styles.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://team-four-webapp-frontend/./src/styles.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/landing_page.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;