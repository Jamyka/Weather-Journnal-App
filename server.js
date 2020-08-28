// Setup empty JS object to act as endpoint for all routes
let projectData = {};
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Setup Server
const port = 8000;
const server = app.listen(port,()=>{
    console.log("Server is Running");
    console.log(`Running on localhost, port: ${port}`);
});

//app Get Route
app.get('/all',(req, res) => {
    console.log("data Submitted to the client side");
});

// app Post Route
app.post('/all',(req, res)=>{
    console.log("data received in the server side");
    projectData = req.body;
    console.log(projectData);
});