const request = require('request-promise-native');

async function run() {
    try {
        let [quips, catfacts] = await Promise.all([
            (async () => {
                console.log("Requesting Quips");
                let body = JSON.parse(await request('https://quipvid.com/api/quips'));
                console.log("QUIPS DONE");
                return body;
            })(),
            (async () => {
                console.log("Requesting Cat Facts");
                let body = JSON.parse(await request('https://cat-fact.herokuapp.com/facts'));
                console.log("Cats DONE");
                return body.all;
            })()
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