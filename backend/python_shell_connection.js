const { PythonShell } = require("python-shell");
const axios = require("axios");

// set the image URL to predict
const imageURL = "/download.jpeg";

// create a new PythonShell instance and specify the script path
let pyshell = new PythonShell("predict.py");

// send the image URL to Python script
pyshell.send(imageURL);

// receive prediction from Python script
pyshell.on("message", function (message) {
  console.log(`The predicted class is ${message}`);
});

// end the input stream and start the Python script
pyshell.end(function (err) {
  if (err) throw err;
  console.log("Python script finished!");
});
