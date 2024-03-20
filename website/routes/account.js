var express = require('express');
var router = express.Router();

// Route: account
router.get('/', function (req, res, next) {
    res.render('account', {title: 'Translit | Account'});
});

router.get('/create', function (req, res, next) {
    res.render('account/create', {title: 'Create Account'});
});

router.get('/login', function (req, res, next) {
    res.render('account/login', {title: 'Sign In'});
});

router.get('/password', function (req, res, next) {
    res.render('account/password', {title: 'Change Password'});
});


module.exports = router;