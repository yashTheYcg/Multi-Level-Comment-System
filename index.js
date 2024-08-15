const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const {connect_to_mongo} = require('./db/database');


// path to the config.env file
dotenv.config({path:path.join(__dirname,'./config.env')});

// middlewares
app.use(cors());
app.use(express.json());


// available routes for endpoints
app.use("/api/", require('./routes/post'));

// Custom 404 Error Handler
app.all('*', (req, res) => {
    res.status(404).json({ message: "Endpoint, not found !" });
})

// Mongodb atlas connection function
connect_to_mongo();

const port = process.env.PORT;

app.listen(port, (req,res)=> {
    console.log(`Server Listening at ${port}`);
})