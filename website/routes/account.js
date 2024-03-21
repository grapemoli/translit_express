var express = require('express');
var router = express.Router();
const multer  = require('multer');
var User = require('../models/user');

// Route: account
router.get('/', function (req, res, next) {
    res.render('account', {title: 'Translit | Account'});
});

router.post('/', function (req, res, next) {
    res.render('account', {title: 'Translit | Account'});
});

router.get('/create', function (req, res, next) {
    res.render('account/create', {title: 'Create Account'});
});

router.post('/create', function (req, res, next) {
    res.render('account/create', {title: 'Create Account'});
});

router.get('/login', function (req, res, next) {
    res.render('account/login', {title: 'Sign In'});
});

router.post('/login', function (req, res, next) {
    res.render('account/login', {title: 'Sign In'});
});

router.get('/password', function (req, res, next) {
    res.render('account/password', {title: 'Change Password'});
});

router.post('/password', function (req, res, next) {
    res.render('account/password', {title: 'Change Password'});
});


module.exports = router;