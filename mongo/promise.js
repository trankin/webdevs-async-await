const mongo = require('mongodb').MongoClient;
const request = require('request-promise-native');
const fs = require('fs');
const util = require('util')
const writeFile = util.promisify(fs.writeFile)
const mongourl = 'mongodb://localhost:27017/asynctest'
const collectionName = 'promise';

function run() {
    return new Promise((resolve, reject) => {
        let db;
        mongo.connect(mongourl)
            .then(connection => {
                db = connection;
                return request('https://quipvid.com/api/quips')
            })
            .then((body) => {
                return writeFile('output/promise.json', body).then(() => {
                    let quips = JSON.parse(body);
                    return quips;
                });
            }).then((quips) => {
                return new Promise((resolve, reject) => {
                    quips.reduce((previousPromise, quip) => {
                        return previousPromise.then(() => {
                            return db.collection(collectionName).update(
                                {id: quip.id},
                                {$set: quip},
                                {upsert: true, safe: false});
                        });
                    }, Promise.resolve()).then(() => {
                        resolve();
                    });
                });
            })
            .catch(error => {
                console.log('error:', error); // Print the error if one occurred
                reject();
            })
            .finally(() => {
                if (db) {
                    console.log("DB Closed")
                    db.close().then(state => resolve());
                } else {
                    resolve();
                }
            });
    });
}

run().then(() => {console.log("DONE")});