var username;
var password1;
var password2;
var submitButton;
var usernameError;
var password1Error;
var password2Error;


// Get elements after DOM loads.
window.addEventListener('load', (event) => {
    usernameError = new mdc.textfield.MDCTextFieldHelperText(document.getElementById('usernameMsg')).foundation;
    password1Error = new mdc.textfield.MDCTextFieldHelperText(document.getElementById('password1Msg')).foundation;
    password2Error = new mdc.textfield.MDCTextFieldHelperText(document.getElementById('password2Msg')).foundation;

    var usernameHTML = document.getElementById('username');
    username = new mdc.textfield.MDCTextField(usernameHTML);

    var password1HTML = document.getElementById('password1');
    password1 = new mdc.textfield.MDCTextField(password1HTML);

    var password2HTML = document.getElementById('password2');
    password2 = new mdc.textfield.MDCTextField(password2HTML);

    submitButton = document.getElementById('submitButton');

    // Additional housekeeping, preparing the elements.
    submitButton.disabled = true;
    username.required = true;
    password1.required = true;
    password2.required = true;
    usernameError.setValidation(true);
    password1Error.setValidation(true);
    password2Error.setValidation(true);
    usernameError.showToScreenReader();
    password1Error.showToScreenReader();
    password2Error.showToScreenReader();

    // Clean the page if the user is re-visiting this page.
    clean(true, true, true);
    username.value = '';
    password1.value = '';
    password2.value = '';
});


// Functions for validation, and submitting.
function validate () {
    // If the two passwords match and are not empty, check that the username
    // is filled before letting the user post their form.
    if (checkPasswords ()) {
        if (!!username.value) {
            // Valid.
            clean (true, true, true);
            submitButton.disabled = false;
        } else {
            // The username is not filled. Invalid.
            username.valid = false;
            submitButton.disabled = true;
        }
    }
    else {
        // Passwords don't match, or something is empty.
        username.valid = !!username.value;
        submitButton.disabled = true;
    }
}

function checkPasswords() {
    // Returns true if the passwords match validly. False otherwise.

    // Checks if they're empty or not.
    if (!!password1.valid && !!password2.valid) {

        // Not empty. Check that the fields match.
        if (password1.value === password2.value) {
            // Valid password.
            password1.valid = true;
            password2.valid = true;
            password1Error.setValidity(true);
            password2Error.setValidity(true);
            password1Error.setContent('');
            password2Error.setContent('');
            submitButton.disabled = false;
            return true;
        }
        else {
            // Passwords don't match.
            password1.valid = false;
            password2.valid = false;
            password1Error.setValidity(false);
            password2Error.setValidity(false);
            password1Error.setContent('Passwords are not matching.');
            password2Error.setContent('Passwords are not matching.');
            submitButton.disabled = true;
            return false;
        }
    }
    else {
        // Empty. Clean the validation messages from previous events.
        password1Error.setContent('');
        password2Error.setContent('');
        submitButton.disabled = true;
        return false;
    }
}

function clean(user, new1, new2) {
    if (user) {
        username.valid = true;
        usernameError.setValidity(true);
        usernameError.setContent('');
    }

    if (new1) {
        password1Error.valid = true;
        password1Error.setValidity(true);
        password1Error.setContent('');
    }

    if (new2) {
        password2Error.valid = true;
        password2Error.setValidity(true);
        password2Error.setContent('');
    }
}

function visible(id) {
    var element = document.getElementById(id + 'Input');
    element.type = (element.type === 'text' ? 'password' : 'text');

    var button = document.getElementById(id + 'Button');
    button.innerText = (button.innerText === 'visibility' ? 'visibility_off' : 'visibility');

    checkPasswords();
}

function submit () {
    console.log('New account: ' + username.value + ', ' + password1.value);
}