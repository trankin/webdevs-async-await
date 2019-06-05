function someLongRunningTask(ms){
    setTimeout(() => console.log("COMPLETED: " + ms), ms);
}

console.log("Going to kick off that task.");
var myWorker = new Worker('worker.js');
myWorker.onmessage = (e) => {
    console.log('Message received from worker: ' + JSON.stringify(e.data));
}
someLongRunningTask(400);
someLongRunningTask(100);
someLongRunningTask(450);
someLongRunningTask(150);
console.log("Fired It Off");
console.log("DONE");





