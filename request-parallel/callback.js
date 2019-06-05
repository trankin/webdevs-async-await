const request = require('request');
const async = require('async');

function run(callback){
    let tasks = [];

    tasks.push(function(cb){
        console.log("Requesting QUIPS");
        request('https://quipvid.com/api/quips', function (error, response) {
            if (error) {
                console.log('quipvid error:', error); // Print the error if one occurred
                cb(error);
            } else {
                console.log('body:', "QUIPVID DONE"); // Print the HTML for the Google homepage.
                cb(null, JSON.parse(response.body));
            }
        });
    });

    tasks.push(function(cb){
        console.log("Requesting Cat Facts");
        request('https://cat-fact.herokuapp.com/facts', function (error, response) {
            if (error) {
                console.log('catfacts error:', error); // Print the error if one occurred
                cb(error);
            } else {
                console.log('body:', "CATFACTS DONE"); // Print the HTML for the Google homepage.
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
