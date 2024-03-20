var oldPassword;
var newPassword1;
var newPassword2;
var submitButton;
var oldPasswordError;
var newPassword1Error;
var newPassword2Error;


// Get elements after DOM loads.
window.addEventListener('load', (event) => {
    oldPasswordError = new mdc.textfield.MDCTextFieldHelperText(document.getElementById('oldPasswordMsg')).foundation;
    newPassword1Error = new mdc.textfield.MDCTextFieldHelperText(document.getElementById('newPassword1Msg')).foundation;
    newPassword2Error = new mdc.textfield.MDCTextFieldHelperText(document.getElementById('newPassword2Msg')).foundation;

    var oldPasswordHTML = document.getElementById('oldPassword');
    oldPassword = new mdc.textfield.MDCTextField(oldPasswordHTML);

    var newPassword1HTML = document.getElementById('newPassword1');
    newPassword1 = new mdc.textfield.MDCTextField(newPassword1HTML);

    var newPassword2HTML = document.getElementById('newPassword2');
    newPassword2 = new mdc.textfield.MDCTextField(newPassword2HTML);

    submitButton = document.getElementById('submitButton');

    // Additional housekeeping, preparing the elements.
    submitButton.disabled = true;
    oldPassword.required = true;
    newPassword1.required = true;
    newPassword2.required = true;
    oldPasswordError.setValidation(true);
    newPassword1Error.setValidation(true);
    newPassword2Error.setValidation(true);
    oldPasswordError.showToScreenReader();
    newPassword1Error.showToScreenReader();
    newPassword2Error.showToScreenReader();

    // Clean the page if the user is re-visiting this page.
    clean(true, true, true);
    oldPassword.value = '';
    newPassword1.value = '';
    newPassword2.value = '';
});


// Functions for validation, and submitting.
function validate () {
    // If the two new passwords match and are not empty, check that the old password
    // is filled before letting the user post their form.
    if (checkPasswords ()) {
        if (!!oldPassword.value) {
            // Valid.
            clean (true, true, true);
            submitButton.disabled = false;
        } else {
            // The old password is not filled. Invalid.
            oldPassword.valid = false;
            submitButton.disabled = true;
        }
    }
    else {
        // Passwords don't match, or something is empty.
        oldPassword.valid = !!oldPassword.value;
        submitButton.disabled = true;
    }
}

function checkPasswords() {
    // Returns true if the passwords match validly. False otherwise.

    // Checks if they're empty or not.
    if (!!newPassword1.valid && !!newPassword2.valid) {

        // Not empty. Check that the fields match.
        if (newPassword1.value === newPassword2.value) {
            // Valid password.
            newPassword1.valid = true;
            newPassword2.valid = true;
            newPassword1Error.setValidity(true);
            newPassword2Error.setValidity(true);
            newPassword1Error.setContent('');
            newPassword2Error.setContent('');
            submitButton.disabled = false;
            return true;
        }
        else {
            // Passwords don't match.
            newPassword1.valid = false;
            newPassword2.valid = false;
            newPassword1Error.setValidity(false);
            newPassword2Error.setValidity(false);
            newPassword1Error.setContent('Passwords are not matching.');
            newPassword2Error.setContent('Passwords are not matching.');
            submitButton.disabled = true;
            return false;
        }
    }
    else {
        // Empty. Clean the validation messages from previous events.
        newPassword1Error.setContent('');
        newPassword2Error.setContent('');
        submitButton.disabled = true;
        return false;
    }
}

function clean(old, new1, new2) {
    if (old) {
        oldPassword.valid = true;
        oldPasswordError.setValidity(true);
        oldPasswordError.setContent('');
    }

    if (new1) {
        newPassword1Error.valid = true;
        newPassword1Error.setValidity(true);
        newPassword1Error.setContent('');
    }

    if (new2) {
        newPassword2Error.valid = true;
        newPassword2Error.setValidity(true);
        newPassword2Error.setContent('');
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
    console.log('New password: ' + oldPassword.value + '-->' + newPassword1.value);
}