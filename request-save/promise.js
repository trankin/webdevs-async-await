const request = require('request-promise-native');
const fs = require('fs');
const util = require('util')
const writeFile = util.promisify(fs.writeFile)

function run() {
    return new Promise((resolve, reject) => {
        request('https://quipvid.com/api/quips')
            .then((body) => {
                return writeFile('output/promise.json', body);
            })
            .then(() => {
                console.log('The file has been saved!');
                resolve();
            })
            .catch(error => {
                console.log('error:', error); // Print the error if one occurred
                reject(error);
            });
    });
}

run().then(() => {console.log("DONE")});