var http = require('http'); 
var PNG = require('pngjs').PNG;
var fs = require('fs');
var PATH = require('path');


console.log("\n------------------------------");
console.log("\n-------------" + __dirname + "-----------------");
console.log("\n------------------------------");

/*****
const file = fs.createWriteStream('/exampleexampleexample.txt');
file.write('hello, ');
file.end('world!');
******/

var fs = require('fs');
fs.writeFile("exampleexampleexample.txt", "Hey there!", function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 