const fs = require("fs");

// file write synchronous

// fs.writeFileSync('myfile.txt', 'Hello World');

// fs.readFile('./files/starter.txt')

// const string = "This is a test string";

// const arr0 = string.split(" ");

// console.log(arr0);

// arrays
const letters = [1, 2, 3, 4]

letters.forEach((element, index) => {
    // console.log("element: ", element);
    console.log("index: ", index)
});



// exit on uncaught errors
process.on('uncaughtException', err => {
    console.error(`There was an uncaught error: ${err}`);
    process.exit(1);
})