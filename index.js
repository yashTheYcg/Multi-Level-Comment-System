const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({path:path.join(__dirname,'./config.env')});

// middlewares
app.use(cors());
app.use(express.json());

const port = process.env.PORT;

app.listen(port, (req,res)=> {
    console.log(`Server Listening at ${port}`);
})