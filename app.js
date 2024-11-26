const express = require('express');
const ejs = require('ejs');
const app = express();
const userRoutes = require('./routes/users.js');
require('dotenv').config();
const PORT = process.env.PORT || 8080;


//setting up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//using express.Router() to organize routes
app.use(userRoutes);
//Serves static files in public foler
app.use(express.static('public'));

//to start the server
app.listen(PORT, () => {
    console.log(`Connected to port ${PORT}`)
});
