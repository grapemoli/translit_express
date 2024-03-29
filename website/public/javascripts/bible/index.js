var searchInput;
var languageSelect;
var languageMenu;
var languageButton;
var otherInput;
var translationSwitch;
var versionSelect;
var versionMenu;
var versionButton;

var keywordSearchRadio;
var bookSearchRadio;

var bookMenu;
var bookSelect;
var bookButton;
var chapterMenu;
var chapterSelect;
var chapterButton;


// Load DOM before grabbing elements.
window.addEventListener('load', (event) => {
    //********* LANGUAGE SELECTION *********//
    // 'Other language' textfield.
    otherInput = document.getElementById('otherInput');

    // Default searching input.
    var searchInputHTML = document.getElementById('input');
    searchInput = new mdc.textfield.MDCTextField(searchInputHTML);
    searchInput.useNativeValidation = true;
    searchInput.required = true;

    // The list facilitates the options the user chooses.
    languageSelect = new mdc.list.MDCList(document.getElementById('languageList'));
    languageSelect.singleSelection = true;

    // The button changes its shown text based on the language selected (see above).
    languageButton = document.getElementById("languageLabel");

    // Make sure that we get the language once its selected (default language is English),
    // with the button changing its displayed text to match the selection.
    languageSelect.listen('MDCList:selectionChange', e => {
        const languages = e.srcElement.innerText.split('\n');
        const index = e.detail.changedIndices[0];
        const id = languages[index].trim();

        document.getElementById('languageInput').value = id;
        languageButton.innerText = id;

        // If the selection is for "Other," then we must open the textfield for the user to
        // input an "Other" language.
        if (id === 'Other') {
            otherInput.disabled = false;
            otherInput.type = 'text';
        }
        else {
            otherInput.disabled = true;
            otherInput.type = 'hidden';
            otherInput.value = '';
        }
    });

    // The menu facilitates the opening and closing of the list.
    languageMenu = new mdc.menu.MDCMenu(document.getElementById("languageMenu"));
    languageMenu.open = false;

    // Translation switch.
    translationSwitch = new mdc.switch.MDCSwitch(document.getElementById("translationSwitch"));

    //********* VERSION SELECTION *********//
    // This list is how the user chooses versions.
    versionSelect = new mdc.list.MDCList(document.getElementById('versionList'));
    versionSelect.singleSelection = true;

    // The button that the user presses to open the version list.
    versionButton = document.getElementById('versionLabel');

    // Make sure that we get the version once its selected (default language is KJV),
    // with the button changing its displayed text to match the selection.
    versionSelect.listen('MDCList:selectionChange', e => {
        const regExp = /\(([^)]+)\)/;
        const versions = e.srcElement.innerText.split('\n');
        const index = e.detail.changedIndices[0];
        const id = regExp.exec(versions[index])[1].trim();
        document.getElementById('versionInput').value = id;
        versionButton.innerText = id;
    });

    // The menu facilitates the opening and closing of the list.
    versionMenu = new mdc.menu.MDCMenu(document.getElementById("versionMenu"));
    versionMenu.open = false;

    //********* BOOK FORM SELECTIONS *********//
    // 1. Book Dropdown.
    // The list facilitates the options the user chooses.
    bookSelect = new mdc.list.MDCList(document.getElementById('bookList'));
    bookSelect.singleSelection = true;

    // The button changes its shown text based on the language selected (see above).
    bookButton = document.getElementById("bookLabel");

    // Make sure that we get the language once its selected (default language is English),
    // with the button changing its displayed text to match the selection.
    bookSelect.listen('MDCList:selectionChange', e => {
        const books = e.srcElement.innerText.split('\n');
        const index = e.detail.changedIndices[0];
        const id = books[index].trim();

        document.getElementById('bookInput').value = id;
        bookButton.innerText = 'Book: ' + id;

        updateChapters(id);
        validate();
    });

    // The menu facilitates the opening and closing of the list.
    bookMenu = new mdc.menu.MDCMenu(document.getElementById("bookMenu"));
    bookMenu.open = false;

    // 2. Chapter dropdown.
    // The list facilitates the options the user chooses.
    chapterSelect = new mdc.list.MDCList(document.getElementById('chapterList'));
    chapterSelect.singleSelection = true;

    // The button changes its shown text based on the language selected (see above).
    chapterButton = document.getElementById("chapterLabel");

    // Make sure that we get the language once its selected (default language is English),
    // with the button changing its displayed text to match the selection.
    chapterSelect.listen('MDCList:selectionChange', e => {
        const books = e.srcElement.innerText.split('\n');
        const index = e.detail.changedIndices[0];
        const id = books[index].split('Chapter')[1].trim();
        document.getElementById('chapterInput').value = id;
        chapterButton.innerText = 'Chapter: ' + id;

        validate();
    });

    // The menu facilitates the opening and closing of the list.
    chapterMenu = new mdc.menu.MDCMenu(document.getElementById("chapterMenu"));
    chapterMenu.open = false;



    //********* RADIO BUTTONS *********//
    keywordSearchRadio = document.getElementById("keywordSearchRadio");
    bookSearchRadio = document.getElementById("bookSearchRadio");


    // Clear values for if the user is re-visiting.
    reset();
});

function validate() {
    // There's two ways the form may be submitted:
    // (1) keyword search - an input is inputted.
    // (2) book/exact search - at least a book and chapter are inputted.
    const submit = document.getElementById('submitButton');

    if (keywordSearchRadio.checked) {
        submit.disabled = !!!searchInput.value;
    }
    else {
        submit.disabled = false;
    }


}

function reset() {
    // Dropdowns resetting.
    otherInput.value = ''
    translationSwitch.disabled = false;
    translationSwitch.selected = false;
    document.getElementById("language-select").style.display = "none";
    document.getElementById('languageInput').value = 'English';                 // Hidden field for input.
    document.getElementById('versionInput').value = 'KJV';                      // Hidden field for input.
    document.getElementById('bookInput').value = 'Psalms';                       // Hidden field for input.
    document.getElementById('chapterInput').value = '1';                     // Hidden field for input.

    // Radio buttons resetting.
    bookSearchRadio.checked = true;
    keywordSearchRadio.checked = false;
    setSearch('bookSearchRadio');

    // Submit button & search input resetting.
    const submit = document.getElementById('submitButton');
    searchInput.value = '';
    submit.disabled = false;
}

// Because the dropdown is not supported in forms, we use a hidden input to 'support' the dropdown selection.
// The following methods below are supporting the language selection.
function openLanguageMenu() {
    languageMenu.open = true;
}

function updateLanguage(id) {
    // Update the language hidden text input with the input of the passed id.
    document.getElementById('languageInput').value = document.getElementById(id).value;
}

function toggleTranslate() {
    // If the translation switch is toggled, then show the language dropdown.
    document.getElementById("language-select").style.display = (translationSwitch.selected ? "none" : "inline");


    // If the translation switch is toggled off, set the 'translation language' to English.
    if (translationSwitch.selected) {
        document.getElementById("languageInput").value = "English";
        languageButton.innerText = "English (default)";
        otherInput.disabled = true;
        otherInput.type = 'hidden';
        otherInput.value = '';
    }
}

// We also have a dropdown for versions, so the following functions will support this functionality.
function openVersionMenu() {
    versionMenu.open = true;
}

// Methods for setting the search type (just clicking the radio buttons). Toggle the different forms.
function setSearch(id) {
    const searchTypeInput = document.getElementById("searchTypeInput");
    const keywordSearch = document.getElementById("input");
    const bookSearch = document.getElementById("book-search-container");

    if (id === 'bookSearchRadio') {
        searchTypeInput.value = 'book';

        // Toggle off the keyword search, toggle on the dropdowns search.
        searchInput.disabled = true;
        keywordSearch.style.display = "none";
        bookSearch.style.display = 'flex';
    }
    else {
        searchTypeInput.value = 'keyword';

        // Toggle on the keyword search, toggle off the dropdowns search.
        searchInput.disabled = false;
        keywordSearch.style.display = "flex";
        bookSearch.style.display = 'none';
    }

    validate();
}


// Book/exact search form methods.
function openBookMenu() {
    bookMenu.open = true;
}

function openChapterMenu() {
    chapterMenu.open = true;
}

// Using the passed id (which is a Book of the Bible), re-render the chapter dropdown.
function updateChapters(id) {
    // First, get the number of chapters in this book.
    const chapters = books[id].chapters;

    // Enable index 0 -> index (chapter-1), disable otherwise.

    for(var i = 0; i < chapters; i++) {
        chapterSelect.setEnabled(i, true);
    }

    for(var i = chapters; i < 150; i++) {
        chapterSelect.setEnabled(i,false);
    }

    // Reset the chapter selection 1, and chapterInput to 1.
    document.getElementById("chapterInput").value = 1;
    chapterButton.innerText = 'Chapter: ' + 1;
    chapterSelect.selectedIndex = 0;
}