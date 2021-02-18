import "./styles.scss";

// Login JS

/* The function below activates a toggle for the input field to use for password recovery (you insert there your e-mail and recover your password)
  By clicking on the link, the field is shown or hidden */

function toggleInputField() {
  var input = document.querySelector(".login-section__psw-recovery-field");
  input.classList.toggle("login-section__psw-recovery--display-block");
}

var link = document.querySelector(".login-section__psw-recovery-link");

link.addEventListener("click", toggleInputField);

// Show error message functionality
const form = document.querySelector(".login-form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const email = document.getElementById("email");

// Event listeners
form.addEventListener("submit", function (e) {
  // e.preventDefault();
});
