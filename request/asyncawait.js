const request = require('request-promise-native');

async function run() {
    try {
        let body = await request('https://quipvid.com/api/quips');
        console.log('body:', body); // Print the HTML for the Google homepage.
    }
    catch (error) {
        console.log('error:', error); // Print the error if one occurred
        throw error;
    }
}


run().finally(() => {console.log("DONE")});