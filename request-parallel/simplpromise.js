const request = require('request-promise-native');

function run() {
    return new Promise((resolve, reject) => {
        return Promise.all([
            request('https://quipvid.com/api/quips').then(body => Promise.resolve(JSON.parse(body))),
            request('https://cat-fact.herokuapp.com/facts').then(body => Promise.resolve(JSON.parse(body).all))
        ])
        .then(([quips, catfacts]) => {
            console.log(quips.length, catfacts.length);
            resolve();
        });
    });
}

run().then(() => {console.log("DONE")});