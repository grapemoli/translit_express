var username;
var password;
var usernameError;
var passwordError;
var submitButton;
var accountError;


// Get elements after DOM loads.
window.addEventListener('load', (event) => {
    passwordError = new mdc.textfield.MDCTextFieldHelperText(document.getElementById('usernameMsg')).foundation;
    usernameError = new mdc.textfield.MDCTextFieldHelperText(document.getElementById('passwordMsg')).foundation;

    var usernameHTMl = document.getElementById('username');
    username = new mdc.textfield.MDCTextField(usernameHTMl);

    var passwordHTML = document.getElementById('password');
    password = new mdc.textfield.MDCTextField(passwordHTML);

    accountError = new mdc.textfield.MDCTextFieldHelperText(document.getElementById('accountMsg')).foundation;

    submitButton = document.getElementById('submitButton');

    // Cleaning the page if the user is re-vising.
    clean(true, true);
    username.value = '';
    password.value = '';

    // Additional housekeeping, preparing the elements.
    submitButton.disabled = true;
    username.required = true;
    password.required = true;
    usernameError.setValidation(true);
    passwordError.setValidation(true);
    usernameError.showToScreenReader();
    passwordError.showToScreenReader();
});


// Functions for validation, and submitting.
function validate () {
    if (!!username.value) {
        if (!!password.value) {
            // Both fields are filled.
            clean (true, true);
            submitButton.disabled = false;
        } else {
            // Username inputted, but not password.
            clean (true, false);
            submitButton.disabled = true;
        }
    } else {
        if (!!password.value) {
            // Username is not inputted, but password inputted.
            clean (false, true);
            submitButton.disabled = true;
        }
        else {
            // Username and password are not inputted.
            submitButton.disabled = true;
        }

    }
}

function clean(username, password) {
    if (username) {
        usernameError.valid = true;
        usernameError.setValidity(true);
        usernameError.setContent('');
    }

    if (password) {
        passwordError.valid = true;
        passwordError.setValidity(true);
        passwordError.setContent('');
    }
}

function visible(id) {
    var element = document.getElementById(id + 'Input');
    element.type = (element.type === 'text' ? 'password' : 'text');

    var button = document.getElementById(id + 'Button');
    button.innerText = (button.innerText === 'visibility' ? 'visibility_off' : 'visibility')
}