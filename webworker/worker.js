
function dowork() {
    for(let i = 0; i < 20000; i++) {
        console.log("WEBWORKER: still working");
    }
    postMessage({message: 'done working'});
}

dowork();
