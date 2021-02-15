import "./styles.scss";

const form = document.querySelector(".login-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "registration error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "registration success";
}

// Check email is valid
function isValidEmail(input) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is invalid");
  }
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

function checkPasswordStrength(input) {
  const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&_-]{8,25}$/;
  if (strongRegex.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(
      input,
      `${getFieldName(
        input
      )} must have alpha-numeric, symbols and upper and lower case characters`
    );
  }
  console.log(input.value);
}

// Get field name
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkLength(username, 3, 12);
  isValidEmail(email);
  checkPasswordStrength(password);
});
