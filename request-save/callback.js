const request = require('request');
const fs = require('fs');

function run(callback){

    request('https://quipvid.com/api/quips', function (error, response, body) {
        if (error) {
            console.log('error:', error); // Print the error if one occurred
            callback(error);
        } else {
            // Let's save the file instead
            fs.writeFile('output/callback.json', body, (error) => {
                if (error) {
                    console.log('error:', error); // Print the error if one occurred
                    callback(error);
                } else {
                    console.log('The file has been saved!');
                    callback();
                }
            });
        }
    });

}

run(function(err){
    console.log("DONE");
});