const fetch = require('node-fetch');

main().then(() => console.log("DONE"));


function wait(ms) {
    return new Promise(function(resolve){
        setTimeout(resolve, ms);
    });
}

async function asyncForEach(arr, cb){
    for(let i = 0; i < arr.length; i++) {
        await cb(arr[i], i, arr);
    }
}

function main(){
    return new Promise((res, rej) => {
        fetch("https://quipvid.com/api/quips/")
            .then((response) => {
                return response.json();
            }).then((data) => {
                for(let i = 0; i < data.length; i++) {
                    console.log(data[i]);
                }
            });
    });

}



