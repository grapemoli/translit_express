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
    oldPasswordError.setValidation(true);
    newPassword1Error.setValidation(true);
    newPassword2Error.setValidation(true);
    oldPasswordError.showToScreenReader();
    newPassword1Error.showToScreenReader();
    newPassword2Error.showToScreenReader();
});


// Functions for validation, and submitting.
function validate () {

    if (newPassword1.value && newPassword2.value) {

        if (newPassword1.value === newPassword2.value) {

            // Matching passwords. Check if the old password is filled.
            if (!! oldPassword.value) {
                // Valid.
                clean (true, true, true);
                submitButton.disabled = false;
            }
            else {
                // Old password is not filled.
                clean (false, true, true);
            }

        } else {
            // Non-matching fields.
            newPassword1.valid = false;
            newPassword2.valid = false;
            newPassword1Error.setValidity(false);
            newPassword2Error.setValidity(false);
            newPassword1Error.setContent('Passwords are not matching.');
            newPassword2Error.setContent('Passwords are not matching.');

            submitButton.disabled = true;
        }

    } else {
        // One password isn't typed.
        const old = !!oldPassword.value;
        const new1 = !!newPassword1.value;
        const new2 = !!newPassword2.value;

        clean(old, new1, new2);

        submitButton.disabled = true;
    }
}

function empty(id) {
    const elementHTML = document.getElementById(id);
    var element = new mdc.textfield.MDCTextField(elementHTML);

    id += 'Msg';
    const elementErrorHTML = document.getElementById(id);
    var elementError = new mdc.textfield.MDCTextFieldHelperText(elementErrorHTML).foundation;

    if (element.value === '') {
        element.valid = false;
        elementError.setValidity(false);
        elementError.setContent('Required');
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
    button.innerText = (button.innerText === 'visibility' ? 'visibility_off' : 'visibility')
}

function submit () {
    console.log('New Password: ' + newPassword2.value);
}