const mongoose = require('mongoose');
const DB = process.env.DATABASE;

mongoose.connect(DB)
.catch((error) => {
    console.log(`Connection Failed !`);
})