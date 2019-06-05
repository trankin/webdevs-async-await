const request = require('request-promise-native');

function run() {
    return new Promise((resolve, reject) => {
        request('https://quipvid.com/api/quips')
            .then((body) => {
                console.log('body:', JSON.parse(body)); // Print the HTML for the Google homepage.
                resolve();
            })
            .catch(error => {
                console.log('error:', error); // Print the error if one occurred
                reject();
            });
    });
}

run().then(() => {console.log("DONE")});