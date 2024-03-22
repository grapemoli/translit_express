/***********************************************************************************
 * create.js
 * Dedicated to creating and populating collections.
 * ***********************************************************************************/
// Read .env file and set environment variables

// Use official mongodb driver to connect to the server
const { MongoClient } = require('mongodb');

const bcrypt = require('bcrypt');
const {hash} = require("bcrypt");
const saltRounds = 10;

// New instance of MongoClient with connection string for Cosmos DB
const url = process.env.COSMOS_CONNECTION_STRING;
const client = new MongoClient(url);
const Saved = require('../models/saved');
const User = require('../models/user');
const Book = require('../models/book');


var books = [
    'Genesis',
    'Exodus',
    'Leviticus',
    'Numbers',
    'Deuteronomy',
    'Joshua',
    'Judges',
    'Ruth',
    '1 Samuel',
    '2 Samuel',
    '1 Kings',
    '2 Kings',
    '1 Chronicles',
    '2 Chronicles',
    'Ezra',
    'Nehemiah',
    'Esther',
    'Job',
    'Psalm',
    'Proverbs',
    'Ecclesiastes',
    'Song of Solomon',
    'Isaiah',
    'Jeremiah',
    'Lamentations',
    'Ezekiel',
    'Daniel',
    'Hosea',
    'Joel',
    'Amos',
    'Obadiah',
    'Jonah',
    'Micah',
    'Nahum',
    'Habakkuk',
    'Zephaniah',
    'Haggai',
    'Zechariah',
    'Malachi',
    'Matthew',
    'Mark',
    'Luke',
    'John',
    'Acts',
    'Romans',
    '1 Corinthians',
    '2 Corinthians',
    'Galatians',
    'Ephesians',
    'Philippians',
    'Colossians',
    '1 Thessalonians',
    '2 Thessalonians',
    '1 Timothy',
    '2 Timothy',
    'Titus',
    'Philemon',
    'Hebrews',
    'James',
    '1 Peter',
    '2 Peter',
    '1 John',
    '2 John',
    '3 John',
    'Jude',
    'Revelation'
];


async function hashPassword(password) {
    // Same results but synchronous:
    //const salt = bcrypt.genSaltSync(saltRounds);
    //const hashedPassword = bcrypt.hashSync('asdf', salt);
    await bcrypt
        .hash(password, process.env.SALT_ROUNDS)
        .then(hash => {
            console.log('Hash', hash);
            return(hash);
        })
        .catch(err => console.error(err.message))
}

async function validate(unhashedPassword) {
    // Get hash from database, check the arg against the db hash.
    await client.connect();

    const query = {username: process.env.TESTER1_USERNAME};
    const hashedPassword = await client.db('transliteee-database').collection('User').findOne(query);

    bcrypt
        .compare(unhashedPassword, hashedPassword['password'])
        .then(res => {
            console.log(res) // return true
            return res;
        })
        .catch(err => console.error(err.message))

    client.close();
}

async function CRUD() {
    await client.connect();

    const collection = client.db('transliteee-database').collection('Book');


    for (var i = 0; i < books.length; i++) {
        const doc = {
            name: books[i],
            testament: (i < 39 ? 'OLD' : 'NEW' ),
            rank: (i+1)
        };
        //const result = await collection.insertOne(doc);
        //console.log(`Insert 1 - ${JSON.stringify(result)}`);
    }


    // Insert doc. An ID is randomly generated if not included.
    /*
    const salt = bcrypt.genSaltSync(saltRounds);
    process.env.TESTER1_HASH = bcrypt.hashSync(process.env.TESTER1_PASSWORD , salt);

    const doc = {
        username: process.env.TESTER1_USERNAME,
        password: process.env.TESTER1_HASH,
    };
    const insertOneResult = await collection.insertOne(doc);
    console.log(`Insert 1 - ${JSON.stringify(insertOneResult)}`);


    // Update doc to hash password.
    const password = process.env.TESTER1_PASSWORD;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password , salt);

    const query = {username: process.env.TESTER1_USERNAME};
    const update = { $set: {password: hashedPassword}};

    const options = {upsert: true, new: true};

    await collection.updateOne(query, update, options).then (function() {console.log(
        "updated"
    )});
    */

    client.close();
}


//CRUD();
validate(process.env.TESTER1_PASSWORD);