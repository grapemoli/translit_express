var snackbar;

// Event Handlers for affirmative validation.
window.addEventListener('load', (event) => {
    var snackbarHTML = document.getElementById('snackbar');
    snackbar = new mdc.snackbar.MDCSnackbar(snackbarHTML);

    // Reset fields, buttons in case the user revisits this route.
    snackbar.timeoutMs = 5000;
    snackbar.open();
});

function closeSnackbar() {
    snackbar.close();
}