function test() {
    return new Promise((resolve, reject) => {
        resolve("text data");
    });
}

test()
    .then(data => {
        console.log(data);
        return data;
    })
    .then(data => {
        console.log(data);
        return Promise.resolve(data);
    })
    .then(data => {
        console.log(data);
    })