var express = require('express');
var router = express.Router();

// Route: Saved [for users only]
router.get('/', function (req, res) {
    if (req.session.isAuth) {
        res.render('saved', {title: 'Saved Verses', username: req.session.username});
    }
    else {
        res.render('saved', {title: 'Saved Verses', username: req.session.username})
    }
});

module.exports = router;