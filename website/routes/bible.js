var express = require('express');
var router = express.Router();
const multer  = require('multer');
const upload = multer();
const { GoogleGenerativeAI } = require('@google/generative-ai');
var Book = require('../models/book');
var Saved = require('../models/saved');
require('dotenv').config();       // TODO comment when in production.


// Route: Bible
router.get('/', function (req, res, next) {
    res.render('bible/index', {title: 'Search for a Verse'});
});

router.post('/result',  upload.none(), function (req, res, next) {
    // Get the user's input, showing the loading animation until the result is fetched. Once it's fetched,
    // redirect to /result.

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const prompt = `
    Do you know any Bible verse/verses that fit this?: ${req.body.userInput}.
    
    If you do, please format your response as: "BookName#ChapterNumber#VerseNumber#Verse#Version"
    
    With multiple verses, I'd really appreciate if you made sure to seperate each verse with "@". For Bible Books with numbers (ex. 1 Peter), please leave the space in-between the number and book! Thanks!
    
    Here's some special cases, if you don't mind!
    If the prompt is a Bible book and chapter, I'd appreciate if you responded with all the verses from that book and chapter!
    If the prompt is just a Bible book, I'd love if you responded with that book's first chapter.
    Lastly, if you find there are no matches, please kindly respond with @none.
    
    Here's an example response: 1 Peter#5#12#By Silvanus, a faithful brother unto you, as I suppose, I have written briefly, exhorting, and testifying that this is the true grace of God wherein ye stand.#KJV@Luke#1#37#For with God nothing shall be impossible.#KJV@Matthew#9#26#But Jesus beheld them, and said unto them, With men this is impossible; but with God all things are possible.#KJV
    
    Once again, thanks for your response!`;


    try {
        const result = model.generateContent(prompt).then(async (result) => {
            const response = await result.response;
            const text = response.text();
            res.render('bible/result', {result: text});
        }).catch((err) => {
            res.render('bible/result', {result: err.message});
        });
    }
    catch (err) {
        res.render('bible/result', {result: err.message});
    }
});


// TODO Uncomment the below if you wish to have a dedicated loading page.
/*
router.get('/result', function (req, res, next) {
    res.render('bible/result', {title: 'Results', results: req.query.results});
});
 */

router.get('/translate', function (req, res, next) {
    res.render('bible/translate', {title: 'Translate'});
});

router.post('/translate', function (req, res, next) {
    res.render('bible/translate', {title: 'Translate'});
});


module.exports = router;