/***********************************************************************************
 * info.js
 * Prints various information about the database. Taken from Azure docs.
 * ***********************************************************************************/
// Read .env file and set environment variables
require('dotenv').config();           // TODO comment out for production mode.

// Use official mongodb driver to connect to the server
const { MongoClient } = require('mongodb');

// New instance of MongoClient with connection string for Cosmos DB
const url = process.env.COSMOS_CONNECTION_STRING;
const client = new MongoClient(url);        // To get a db instance, call this method (opt param=db name): MongoClient.Db

async function foo() {
    await client.connect();


    // Client options.
    console.log('----------Client Options----------');
    const options = client.options;
    console.log(`Options:\n${Object.keys(options).map(key => `\t${key}: ${options[key]}\n`)}`);


    // Get server build info.
    console.log('\n\n----------Build Info----------');
    const serverInfo = await client.db().admin().serverInfo();
    console.log(`Server info:\n${Object.keys(serverInfo).map(key => `\t${key}: ${serverInfo[key]}\n`)}`);


    // Get server status.
    console.log('\n\n----------Get Server Status----------');
    const serverStatus = await client.db().admin().serverStatus();
    console.log(`Server status:\n${Object.keys(serverStatus).map(key => `\t${key}: ${serverStatus[key]}\n`)}`);


    // List all databases.
    console.log('\n\n----------List Databases----------');
    const dbListResult = await client.db().admin().listDatabases();
    console.log(`Databases:\n${dbListResult.databases.map(db => `\t${db.name}\n`)}`);


    // List all databases.
    console.log('\n\n----------List Entire Structure----------');
    const listResult = await client.db().admin().listDatabases();
    if(listResult.databases.length === 0) {
        return 'No databases found';
    }


    // Loop through databases.
    for await (let database of listResult.databases) {
        console.log(`\t${database.name}\n`);

        // Get database client.
        const dbClient = client.db(database.name);

        // Get collections in database.
        const collections = await dbClient.listCollections();
        console.log("\n\t\tCollections:\n");

        // Loop through collections.
        for await (let collection of collections) {

            // Get collection client.
            const collectionClient = dbClient.collection(collection.name);

            // Get doc count of collection.
            const docCount = await collectionClient.countDocuments({});
            console.log(`\t\t\t${collection.name}: ${docCount} doc(s)\n`);
        }
    }


    // Checking that database exists before doing things to it (default behavior is that
    // a new database will be made if it's not found. This code is to prevent that behavior).
    console.log('\n\n----------Does the Database Exist?----------')
    // 1. Get list of databases. The structure of listResult is:
        // { databases: [ {db1NAme: stri, db1sizeOnDisk: int, db1empty: bool}, {db2}, ...],
        // totalSize: int
        // ok: int
        // }
    // i.e., A dictionary with an array of databases under the "databases" key.
    //const listResult = await client.db().admin().listDatabases();
    //if(listResult.databases.length === 0) {
    //    return 'No databases found';
    //}

    // 2. Does database exist?
    const lookForDatabase = 'transliteee-database';
    const dbFound = listResult.databases.find(db => db.name === 'transliteee-database');

    // The below is code from the Azure tutorial, but it was resulting in errors from the toArray() function.
    //const dbFound = listResult.databases.find(db => db.name===lookForDatabase).toArray();

    if(dbFound) {
        console.log(`Database exists:\t${lookForDatabase}`);
    }


    client.close();
}

foo();
