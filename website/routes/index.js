var express = require('express');
const YouVersion = require("@glowstudent/youversion");
var router = express.Router();


// Route: Home Route
router.get('/', function (req, res, next) {
    (async () => {
        // Get the Verse of the Day before rendering the main page.
        const verse = await YouVersion.getVerseOfTheDay();
        res.render('index', {title: 'Translit', verse: verse.passage, citation: verse.citation, snackbar: req.app.locals.snackbar});
        req.app.locals.snackbar = '';
    })();
});

router.post('/', function (req, res, next) {
    res.send('Got a POST request');
});

router.put('/', function (req, res, next) {
    res.send('Got a PUT request');
});

router.delete('/', function (req, res, next) {
    res.send('Got a DELETE request')
});


module.exports = router;
