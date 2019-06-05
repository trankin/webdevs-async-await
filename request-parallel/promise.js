const request = require('request-promise-native');

function run() {
    return new Promise((resolve, reject) => {
        return Promise.all([
            request('https://quipvid.com/api/quips')
                .then(body => {
                    console.log("QUIPS DONE");
                    return Promise.resolve(JSON.parse(body))
                }),
            request('https://cat-fact.herokuapp.com/facts')
                .then(body => {
                    console.log("CATS DONE");
                    return Promise.resolve(JSON.parse(body).all)
                })
        ])
        .then((values) => {
            console.log(values[0].length, values[1].length);
            resolve(values);
        });
    });
}

run().then(() => {console.log("DONE")});