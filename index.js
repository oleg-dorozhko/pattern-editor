var http = require('http'); 
var PNG = require('pngjs').PNG;
var fs = require('fs');



const file = fs.createWriteStream('exampleexampleexample.txt');
file.write('hello, ');
file.end('world!');
