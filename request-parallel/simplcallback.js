const request = require('request');
const async = require('async');

function run(callback){
    let tasks = [];

    tasks.push(function(cb){
        request('https://quipvid.com/api/quips', function (error, response) {
            if (error) {
                cb(error);
            } else {
                cb(null, JSON.parse(response.body));
            }
        });
    });

    tasks.push(function(cb){
        request('https://cat-fact.herokuapp.com/facts', function (error, response) {
            if (error) {
                cb(error);
            } else {
                cb(null, JSON.parse(response.body).all);
            }
        });
    });

    async.parallel(tasks, function(err, values){
        console.log(values[0].length, values[1].length);
        callback(err);
    });

}

run(function(err){
    console.log("DONE");
});
