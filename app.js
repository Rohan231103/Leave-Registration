const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

var app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Leave = require('./router/index');
const User = require('./router/user');

app.use('/leave', Leave);
app.use('/user',User)

var PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`App running on port ${PORT}`);
})