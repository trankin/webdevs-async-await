const mongo = require('mongodb').MongoClient;
const request = require('request-promise-native');
const fs = require('fs');
const util = require('util')
const writeFile = util.promisify(fs.writeFile)
const mongourl = 'mongodb://localhost:27017/asynctest'
const collectionName = 'asyncawait';

async function run() {
    let db
    try {
        db = await mongo.connect(mongourl);
        let body = await request('https://quipvid.com/api/quips');
        await writeFile('output/asyncawait.json', body);
        let quips = JSON.parse(body);
        await asyncForEach(quips, async (quip) => {
            let response = await db.collection(collectionName).update(
                {id: quip.id},
                {$set: quip},
                {upsert: true, safe: false});
        });

    }
    catch(exp) {
        console.log(exp);
    }
    finally {
        if (db) {
            await db.close();
        }
    }
}

async function asyncForEach(array, callback) {
    for(let i = 0; i < array.length; i++) {
        await callback(array[i], i, array);
    }
}


run().then(() => {console.log("DONE")});