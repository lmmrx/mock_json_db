const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {readData} = require('../utils/file');

//middlewares tp parse incoming json to native js objects
router.use(express.json());

//middleware to parse url encoded strings
router.use(express.urlencoded({extended: true}));

//create new user route
router.post('/users', userController.createUser);

//update user
router.post('/users/:id/update', userController.updateUser);

//delete user
router.delete('/users/:id/delete', userController.deleteUser);

//render the view
router.get('/', (req, res) => {
    res.render("home");
}); 

module.exports = router;
