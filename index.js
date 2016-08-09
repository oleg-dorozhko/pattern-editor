var http = require('http'); 
var PNG = require('pngjs').PNG;
var fs = require('fs');
var PATH = require('path');


console.log("\n------------------------------");
console.log("\n-------------" + __dirname + "-----------------");
var fs = require('fs');
var path = "./testfs.txt";
var data = "Hello from the Node writeFile method!";

fs.writeFile(path, data, function(error) {
     if (error) {
       console.error("write error:  " + error.message);
     } else {
       console.log("Successful Write to " + path);
     }
});

var contents = fs.readFileSync('./testfs.txt').toString();
console.log(contents); //esperamos por el resultado
console.log("Hello!"); 
console.log("\n------------------------------");
