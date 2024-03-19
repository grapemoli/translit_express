var express = require('express');
var router = express.Router();

// Route: Home Route
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Translit'});
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
