const express = require("express");
const path = require('path');
const app = express();

app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/naturaGAME_main.html'));
});

app.get("/main.css", (req, res) => {
    res.sendFile(path.join(__dirname, '/main.css'));
});

app.get("/main.js", (req, res) => {
    res.sendFile(path.join(__dirname, '/naturaGAME_main.js'));
});

app.get("/main.css.map", (req, res) => {
    res.sendFile(path.join(__dirname, '/main.css.map'));
});