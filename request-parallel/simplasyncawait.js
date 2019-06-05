const request = require('request-promise-native');

async function run() {
    try {
        let [quips, catfacts] = await Promise.all([
            JSON.parse(await request('https://quipvid.com/api/quips')),
            JSON.parse(await request('https://cat-fact.herokuapp.com/facts')).all
        ])

        console.log(quips.length, catfacts.length);
        return;

    }
    catch (error) {
        console.log('error:', error); // Print the error if one occurred
        throw error;
    }
}


run().then(() => {console.log("DONE")});