const express = require("express");
const bodyparser = require("body-parser")
var cors = require('cors');
// create express app
const app = express();
 app.use(cors())

// parse requests of content-type application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: true }))

// parse requests o content-type application/json
app.use(bodyparser.json())

// configuring the database
const dbConfig = require('./config/database.config')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);

//mongoose.Promise = global.Promise

//connecting to the database
mongoose.connect(dbConfig.URL,{
    useNewUrlParser: true,
    useFindAndModify: false 
}).then(()=>{
    console.log('====================================');
    console.log("Successfully connect to the database");
    console.log('====================================');
}).catch((err)=>{
    console.log('====================================');
    console.log("Could not connect to the database...", err);
    console.log('====================================');
    process.exit()
})

// defineing simple route
// app.get('/',(req, res)=>{
//     res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
// });

// Require Notes routes
require('./app/routes/note.routes')(app);


app.listen(4001, ()=>{
    console.log("server listing on port 4001");
})


