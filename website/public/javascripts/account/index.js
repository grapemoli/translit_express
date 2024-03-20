var usernameDialog;

// Event Handlers for the changing a user's username.
window.addEventListener('load', (event) => {
    var usernameHTML = document.getElementById('changeUsernameDialog');
    usernameDialog = new mdc.dialog.MDCDialog(usernameHTML);

    document.getElementById('submitUsername').disabled = true;
});

function toggleEditDialog() {
    usernameDialog.open();
}

function submit() {
    var text = document.getElementById('newUsername').value = '';
    usernameDialog.close();

    document.getElementById('submitUsername').disabled = true;
}

function validate() {
    var textHTML = document.getElementById('newUsername');
    textHTML.valid = (textHTML.value.length > 0);

    document.getElementById('submitUsername').disabled = !textHTML.valid;
}

function reset() {
    usernameDialog.close();
    document.getElementById('newUsername').value = '';
    document.getElementById('submitUsername').disabled = !textHTML.valid;
}


// User methods.

function signOut() {
    console.log('signed out');
}


// Rerouting methods.
function toChangePassword() {
    window.location.href = '/account/password';
}

function toSignIn() {
    window.location.href = '/account/login';
}

function toCreate() {
    window.location.href = '/account/create';
}