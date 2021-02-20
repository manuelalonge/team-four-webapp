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

/***/ "./src/registration.js":
/*!*****************************!*\
  !*** ./src/registration.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.scss */ \"./src/styles.scss\");\n\nconst form = document.querySelector(\".login-form\");\nconst username = document.getElementById(\"username\");\nconst email = document.getElementById(\"email\");\nconst password = document.getElementById(\"password\"); // Show input error message\n\nfunction showError(input, message) {\n  const formControl = input.parentElement;\n  formControl.className = \"registration error\";\n  const small = formControl.querySelector(\"small\");\n  small.innerText = message;\n} // Show success outline\n\n\nfunction showSuccess(input) {\n  const formControl = input.parentElement;\n  formControl.className = \"registration success\";\n} // Check email is valid\n\n\nfunction isValidEmail(input) {\n  const re = /^(([^<>()[\\]\\\\.,;:\\s@\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/;\n\n  if (re.test(input.value.trim())) {\n    showSuccess(input);\n  } else {\n    showError(input, \"Email is invalid\");\n  }\n} // Check input length\n\n\nfunction checkLength(input, min, max) {\n  if (input.value.length < min) {\n    showError(input, `${getFieldName(input)} must be at least ${min} characters`);\n  } else if (input.value.length > max) {\n    showError(input, `${getFieldName(input)} must be less than ${max} characters`);\n  } else {\n    showSuccess(input);\n  }\n}\n\nfunction checkPasswordStrength(input) {\n  const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d@$!%*?&_-]{8,25}$/;\n\n  if (strongRegex.test(input.value.trim())) {\n    showSuccess(input);\n  } else {\n    showError(input, `${getFieldName(input)} must have alpha-numeric, symbols and upper and lower case characters`);\n  }\n\n  console.log(input.value);\n} // Get field name\n\n\nfunction getFieldName(input) {\n  return input.id.charAt(0).toUpperCase() + input.id.slice(1);\n} // Event listeners\n\n\nform.addEventListener(\"submit\", function (e) {\n  // e.preventDefault();\n  checkLength(username, 3, 12);\n  isValidEmail(email);\n  checkPasswordStrength(password);\n});\n\n//# sourceURL=webpack://team-four-webapp-frontend/./src/registration.js?");

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
/******/ 	__webpack_require__("./src/registration.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;