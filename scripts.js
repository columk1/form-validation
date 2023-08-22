const form = document.querySelector('form')
const email = document.getElementById('email')
const emailError = document.querySelector('#email ~ span.error')
const country = document.getElementById('country')
const countryError = document.querySelector('#country ~ span.error')
const zip = document.getElementById('zip')
const zipError = document.querySelector('#zip ~ span.error')
const password = document.getElementById('password')
const passwordError = document.querySelector('#password ~ span.error')
const confirm_password = document.getElementById('confirm_password')
const confirm_passwordError = document.querySelector('#confirm_password ~ span.error')

function validateEmail() {
  if (email.validity.valid) {
    emailError.className = 'error' // Reset the visual state of the message
    emailError.previousElementSibling.className = 'errorIcon activeIcon'
    emailError.previousElementSibling.firstChild.src = './assets/check.svg'
  } else {
    // If there is still an error, show the correct error
    emailError.textContent = getEmailError()
    emailError.className = 'error active'
    emailError.previousElementSibling.className = 'errorIcon activeIcon'
    emailError.previousElementSibling.firstChild.src = './assets/error.svg'
  }
}

const getEmailError = () => {
  return email.validity.valueMissing
    ? 'Email address is required'
    : email.validity.typeMismatch
    ? 'Please enter a valid email address'
    : email.validity.tooShort
    ? `Email should be at least ${email.minLength} characters; you entered ${email.value.length}`
    : ''
}

function validateCountry() {
  if (!/^[a-zA-Z_ ]*$/.test(country.value)) {
    country.setCustomValidity('Please enter a valid country')
  } else {
    country.setCustomValidity('')
  }
  if (country.validity.valid) {
    countryError.className = 'error'
    countryError.previousElementSibling.className = 'errorIcon activeIcon'
    countryError.previousElementSibling.firstChild.src = './assets/check.svg'
  } else {
    countryError.textContent = getCountryError()
    countryError.className = 'error active'
    countryError.previousElementSibling.firstChild.src = './assets/error.svg'
    countryError.previousElementSibling.className = 'errorIcon activeIcon'
  }
}
const getCountryError = () => {
  return country.validity.valueMissing
    ? 'Country is required'
    : country.validity.tooShort
    ? `Country should be at least ${country.minLength} characters; you entered ${country.value.length}`
    : country.validationMessage
}

function validateZip() {
  const regex = /^[ABCEGHJ-NPRSTVXY][0-9][ABCEGHJ-NPRSTV-Z] [0-9][ABCEGHJ-NPRSTV-Z][0-9]$/i
  if (!regex.test(zip.value)) {
    zip.setCustomValidity('Please enter a valid zip code in the format XXX XXX')
  } else {
    zip.setCustomValidity('')
  }
  if (zip.validity.valid) {
    zipError.className = 'error'
    zipError.previousElementSibling.className = 'errorIcon activeIcon'
    zipError.previousElementSibling.firstChild.src = './assets/check.svg'
  } else {
    zipError.textContent = getZipError()
    zipError.className = 'error active'
    zipError.previousElementSibling.firstChild.src = './assets/error.svg'
    zipError.previousElementSibling.className = 'errorIcon activeIcon'
  }
}

const getZipError = () => {
  return zip.validity.valueMissing ? 'Zip code is required' : zip.validationMessage
}

function validatePassword() {
  if (password.validity.valid) {
    passwordError.className = 'error'
    passwordError.previousElementSibling.className = 'errorIcon activeIcon'
    passwordError.previousElementSibling.firstChild.src = './assets/check.svg'
  } else {
    passwordError.textContent = getPasswordError()
    passwordError.className = 'error active'
    passwordError.previousElementSibling.firstChild.src = './assets/error.svg'
    passwordError.previousElementSibling.className = 'errorIcon activeIcon'
  }
  if (confirm_password.value) validateConfirmPassword()
}

function validateConfirmPassword() {
  if (password.value != confirm_password.value) {
    // password.setCustomValidity("Passwords Don't Match")
    confirm_password.setCustomValidity("Passwords Don't Match")
  } else {
    confirm_password.setCustomValidity('')
    password.setCustomValidity('')
  }
  if (confirm_password.validity.valid) {
    confirm_passwordError.className = 'error'
    confirm_passwordError.previousElementSibling.className = 'errorIcon activeIcon'
    confirm_passwordError.previousElementSibling.firstChild.src = './assets/check.svg'
  } else {
    confirm_passwordError.textContent = getPasswordError()
    confirm_passwordError.className = 'error active'
    confirm_passwordError.previousElementSibling.firstChild.src = './assets/error.svg'
    confirm_passwordError.previousElementSibling.className = 'errorIcon activeIcon'
  }
}

const getPasswordError = () => {
  return password.validity.valueMissing
    ? 'Password is required'
    : password.validity.tooShort
    ? `Password should be at least ${password.minLength} characters; you entered ${password.value.length}`
    : confirm_password.validationMessage
}

email.addEventListener('input', validateEmail)
country.addEventListener('input', validateCountry)
zip.addEventListener('input', validateZip)
password.onkeyup = validatePassword
confirm_password.onkeyup = validateConfirmPassword

form.addEventListener('submit', (event) => {
  // if the email field is valid, we let the form submit
  if (!email.validity.valid) {
    // If it isn't, we display an appropriate error message
    validateEmail()
    // Then we prevent the form from being sent by canceling the event
    event.preventDefault()
  }
})
