var username;
var newPassword1;
var newPassword2;
var submitButton;
var usernameError;
var newPassword1Error;
var newPassword2Error;


// Get elements after DOM loads.
window.addEventListener('load', (event) => {
    usernameError = new mdc.textfield.MDCTextFieldHelperText(document.getElementById('usernameMsg')).foundation;
    newPassword1Error = new mdc.textfield.MDCTextFieldHelperText(document.getElementById('newPassword1Msg')).foundation;
    newPassword2Error = new mdc.textfield.MDCTextFieldHelperText(document.getElementById('newPassword2Msg')).foundation;

    var usernameHTML = document.getElementById('username');
    username = new mdc.textfield.MDCTextField(usernameHTML);

    var newPassword1HTML = document.getElementById('newPassword1');
    newPassword1 = new mdc.textfield.MDCTextField(newPassword1HTML);

    var newPassword2HTML = document.getElementById('newPassword2');
    newPassword2 = new mdc.textfield.MDCTextField(newPassword2HTML);

    submitButton = document.getElementById('submitButton');

    // Additional housekeeping, preparing the elements.
    submitButton.disabled = true;
    usernameError.setValidation(true);
    newPassword1Error.setValidation(true);
    newPassword2Error.setValidation(true);
    usernameError.showToScreenReader();
    newPassword1Error.showToScreenReader();
    newPassword2Error.showToScreenReader();
});


// Functions for validation, and submitting.
function validate () {

    if (newPassword1.value && newPassword2.value) {

        if (newPassword1.value === newPassword2.value) {

            // Matching passwords. Check if the usernme is filled.
            if (!! username.value) {
                // Valid.
                clean (true, true, true);
                submitButton.disabled = false;
            }
            else {
                // Username is not filled.
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
        const user = !!username.value;
        const new1 = !!newPassword1.value;
        const new2 = !!newPassword2.value;

        clean(user, new1, new2);

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

function clean(user, new1, new2) {
    if (user) {
        username.valid = true;
        usernameError.setValidity(true);
        usernameError.setContent('');
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
    console.log('New account: ' + username.value + ', ' + newPassword1.value);
}