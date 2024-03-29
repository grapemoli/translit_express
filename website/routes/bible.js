var express = require('express');
var router = express.Router();
const multer  = require('multer');
const upload = multer();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const YouVersion = require("@glowstudent/youversion");
var Book = require('../models/book');
var Saved = require('../models/saved');
var versions = require('../public/JSON/versions/versions');
var books = require('../public/JSON/books/books');



// Route: Bible
router.get('/', function (req, res, next) {
    res.render('bible/index', {title: 'Search for a Verse', BOOKS: books.books, VERSIONS: versions.bibleVersions, LANGUAGES: [
            "Mandarin Chinese",
            "Spanish",
            "Hindi/Urdu",
            "Arabic",
            "Bengali",
            "Portuguese",
            "Russian",
            "Japanese",
            "German",
            "Javanese",
            "Punjabi",
            "Wu",
            "French",
            "Telugu",
            "Vietnamese",
            "Marathi",
            "Korean",
            "Tamil",
            "Italian",
            "Turkish",
            "Cantonese/Yue",
        ].sort()});
});

router.post('/result',  upload.none(), function (req, res, next) {
    // The global fetch was a feature put in Node 18+. Please note that while running this application. If an older
    // Node is used, you may have to install node-fetch@v2.
    // In this section, we get the verse(s) using the version that the user specified from BibleAPI. If the user also specifies a translation,
    // then we pass the result(s) into Gemini for a translation. BibleAPI uses two different endpoints for a single verse vs. a range of verses, so
    // both endpoints are listed below.
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const bibleVersionID = versions.bibleVersions[req.body.version].id;
    const bookID = books.books[req.body.book].abbreviation;
    const chID = req.body.chapter;
    var verseMax = 0;
    const verseID = `${bookID}.${chID}.${req.body.verse}`;
    var passageID = `${bookID}.${chID}.1-${bookID}.${chID}.${verseMax}`;
    const API = versions.bibleVersions[req.body.version].source;
    var verse = '';
    var citation = `${req.body.book} ${chID} (${req.body.version})`;

    // For BibleAPI:
    // url_single fetches a single verse, while url_passages fetches multiple verses. url_chapter gets all the verseID's
    // the passed chapter parameter.
    var url_single = `https://api.scripture.api.bible/v1/bibles/${bibleVersionID}/verses/${verseID}?content-type=text&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false&use-org-id=false`;
    var url_passages = `https://api.scripture.api.bible/v1/bibles/${bibleVersionID}/passages/${passageID}?content-type=text&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false&use-org-id=false`;


    // 1. Get the max number of verse(s) from BibleAPI.
    const url_chapter = `https://api.scripture.api.bible/v1/bibles/06125adad2d5898a-01/chapters/${bookID}.${chID}/verses`;

    (async () => {
        const res = await fetch(url_chapter, {
            method: 'GET',
            headers: {
                'api-key': process.env.BIBLE_API_KEY
            }
        });

        if (res.ok) {
            const data = await res.json();
            verseMax = data.data.length;
        }
    })().then(() => {
        // Only continue to get the verses if the previous fetch was done right (the max verse will be greater than 0).
        if (verseMax !== 0) {

            // 2. Get the verses from either YouVersion or BibleAPI.
            if (API === 'YouVersion') {
                (async () => {
                    for(var i = 1; i <= verseMax; i++) {
                        const data = await YouVersion.getVerse(bookID, chID, i, bibleVersionID);
                        verse = verse + `[${i}] ` + data.passage;
                    }
                })().then(() => {

                    // Only render if the user did not select the translation option. Otherwise, pass the
                    // verse into the Gemini model to translate it.
                    if (req.body.language === 'English') {
                        res.render('bible/result', {citation: citation, result: verse});
                    }
                    else {
                        const prompt = `
                        Could you please translate the following passage into ${req.body.language}:
                        
                        ${verse}.
                        
                        I'd appreciate it if you kept the numbers in the passage! Thanks!
                        `;

                        try {
                            const result = model.generateContent(prompt).then(async (result) => {
                                const response = await result.response;
                                verse = response.text();
                                console.log(verse)
                                res.render('bible/result', {citation: citation, result: verse});
                            }).catch((err) => {
                                res.render('bible/result', {citation: citation, result: err.message});
                            });
                        }
                        catch (err) {
                            res.render('bible/result', {citation: '', result: err.message});
                        }
                    }
                });
            }
            else if (API === 'BibleAPI') {
                console.log('1');
                passageID = `${bookID}.${chID}.1-${bookID}.${chID}.${verseMax}`;
                url_passages = `https://api.scripture.api.bible/v1/bibles/${bibleVersionID}/passages/${passageID}?content-type=text&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false&use-org-id=false`;

                (async() => {
                    const res = await fetch(url_passages, {
                        method: 'GET',
                        headers: {
                            'api-key': process.env.BIBLE_API_KEY
                        }
                    });

                    if (res.ok) {
                        const data = await res.json();
                        verse = data.data.content;
                    }

                })().then(() => {

                    // Only render if the user did not select the translation option. Otherwise, pass the
                    // verse into the Gemini model to translate it.
                    if (req.body.language === 'English') {
                        res.render('bible/result', {citation: citation, result: verse});
                    }
                    else {
                        const prompt = `
                        Could you please translate the following passage into ${req.body.language}:
                        
                        ${verse}.
                        
                        I'd appreciate it if you kept the numbers in the passage! Thanks!
                        `;

                        try {
                            const result = model.generateContent(prompt).then(async (result) => {
                                const response = await result.response;
                                verse = response.text();
                                console.log(verse)
                                res.render('bible/result', {citation: citation, result: verse});
                            }).catch((err) => {
                                res.render('bible/result', {citation: citation, result: err.message});
                            });
                        }
                        catch (err) {
                            res.render('bible/result', {citation: '', result: err.message});
                        }
                    }
                });
            }
        }
    });


    /*
    // 2. If the user opts for translation, use the Gemini model to translate.
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
            console.log(text)
            res.render('bible/result', {result: text});
        }).catch((err) => {
            res.render('bible/result', {result: err.message});
        });
    }
    catch (err) {
        res.render('bible/result', {result: err.message});
    }
     */
});


router.get('/translate', function (req, res, next) {
    res.render('bible/translate', {title: 'Translate'});
});

router.post('/translate', function (req, res, next) {
    res.render('bible/translate', {title: 'Translate'});
});


module.exports = router;