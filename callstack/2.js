function someLongRunningTask(ms){
    setTimeout(() => console.log("COMPLETED: " + ms), ms);
}

console.log("Going to kick off that task.");
someLongRunningTask(400);
console.log("Fired It Off");
for(let i = 0; i < 20000; i++) {
    console.log("still working");
}
console.log("DONE");