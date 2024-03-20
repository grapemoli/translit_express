var express = require('express');
var router = express.Router();

// Route: Home Route
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Translit', verse: 'But let patience have her perfect work, that ye may be perfect and entire, wanting nothing.', book: 'James', chapt: '1', num: '4', ver: 'KJV'});
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
