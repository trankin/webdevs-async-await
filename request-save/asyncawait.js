const request = require('request-promise-native');
const fs = require('fs');
const util = require('util')
const writeFile = util.promisify(fs.writeFile)

async function run() {
    try {
        let body = await request('https://quipvid.com/api/quips');
        await writeFile('output/asyncawait.json', body);
        console.log('The file has been saved!');
    }
    catch (error) {
        console.log('error:', error); // Print the error if one occurred
    }
}


run().then(() => {console.log("DONE")});