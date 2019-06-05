const mongo = require('mongodb').MongoClient;
const request = require('request');
const fs = require('fs');
const mongourl = 'mongodb://localhost:27017/asynctest'
const collectionName = 'callback';
const async = require('async');


function run(callback){
    mongo.connect(mongourl, (err, db) => {
        if(err) {
            callback(err);
            return;
        }
        request('https://quipvid.com/api/quips', function (err, response) {
            if (err) {
                callback(err);
                closedb(db, callback);
                return;
            }
            let body = response.body;
            fs.writeFile('output/callback.json', body, (err) => {
                if (err) {
                    callback(err);
                    closedb(db, callback);
                    return;
                }

                let tasks = [];
                let quips = JSON.parse(body);
                quips.forEach((quip) => {
                    tasks.push(function(cb){

                        db.collection(collectionName).update(
                            {id: quip.id},
                            {$set: quip},
                            {upsert: true, safe: false}, cb);


                    });
                });

                async.series(tasks, function(err, values){
                    console.log("DB Closed");
                    closedb(db, callback);
                });
            });
        });
    });

}

function closedb(db, callback) {
    db.close((err) => {
        callback(err);
    });
}

run(function(err){
    console.log("DONE", err);
});