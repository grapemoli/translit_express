var express = require('express');
var router = express.Router();

// Route: Bible
router.get('/', function (req, res, next) {
    res.render('bible/index', {title: 'Search for a Verse'});
});

router.get('/results', function (req, res, next) {
    res.render('bible/results', {title: 'Results'});
});

router.get('/translate', function (req, res, next) {
    res.render('bible/translate', {title: 'Translate'});
});


module.exports = router;