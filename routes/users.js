const express = require('express');
const router = express.Router();

//middlewares tp parse incoming json to native js objects
router.use(express.json());

//middleware to parse url encoded strings
router.use(express.urlencoded());

//render the view
router.get('/', (req, res) => {
    res.render("home");
}); 

module.exports = router;
