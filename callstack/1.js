function someLongRunningTask(ms){
    setTimeout(() => console.log("COMPLETED: " + ms), ms);
}

console.log("Going to kick off that task.");
someLongRunningTask(5000);
console.log("Fired It Off");
console.log("DONE");