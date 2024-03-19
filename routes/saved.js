var express = require('express');
var router = express.Router();

// Route: Saved [for users only]
router.get('/', function (req, res) {
    if (req.params.accountId === '') {
        res.render("saved", {title: 'Saved Verses', accountId: res.accountId});
    } else {
        res.render("saved", {title: 'Saved Verses', accountId: res.accountId});
    }
});

router.get('/:accountId', function (req, res, next) {
    res.render("saved", {title: 'Saved Verses', accountId: res.accountId});
});


module.exports = router;