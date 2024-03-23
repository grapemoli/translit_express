var searchInput;

// Load DOM before grabbing elements.
window.addEventListener('load', (event) => {
    var searchInputHTML = document.getElementById('input');
    searchInput = new mdc.textfield.MDCTextField(searchInputHTML);
    searchInput.useNativeValidation = true;
    searchInput.required = true;

    // Clear values for if the user is re-visiting.
    reset();
});

function validate() {
    var submit = document.getElementById('submitButton');
    submit.disabled = !!!searchInput.value;
}

function reset() {
    var submit = document.getElementById('submitButton');
    searchInput.value = '';
    submit.disabled = true;
}
