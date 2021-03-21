const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://elhadiAhmad:elhadi@cluster0.sth5j.mongodb.net/dino5',{useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',()=>{
    console.log('mongo connecte');
});

module.exports = db;