
async function dowork() {
    for(let i = 0; i < 2000; i++) {
        console.log("WEBWORKER: still working");
        await wait(0);
    }
    postMessage({message: 'done working'});
}


function wait(ms) { return new Promise(resolve => setTimeout(resolve, ms));}

dowork();
