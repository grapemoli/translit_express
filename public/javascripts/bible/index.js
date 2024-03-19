var searchInput;

// Load DOM before grabbing elements.
window.addEventListener('load', (event) => {
    var searchInputHTML = document.getElementById('input');
    searchInput = new mdc.textfield.MDCTextField(searchInputHTML);
    searchInput.useNativeValidation = true;
});

function validate() {
    var submit = document.getElementById('submitButton');
    submit.disabled = (searchInput.value.length <= 1);
}

function reset() {
    var submit = document.getElementById('submitButton');
    searchInput.value = '';
    submit.disabled = true;
}

function submit() {
    console.log("Searching: " + searchInput.value);
}