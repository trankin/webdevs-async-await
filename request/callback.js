const request = require('request');

function run(callback){
    request('https://quipvid.com/api/quips', function (error, response) {
        if (error) {
            console.log('error:', error); // Print the error if one occurred
            callback(error);
        } else {
            console.log('body:', JSON.parse(response.body)); // Print the HTML for the Google homepage.
            callback();
        }
    });
}

 run(function(err){
     console.log("DONE");
 });