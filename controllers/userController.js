const fs = require('fs');
const filePath = './database.json';
const {readData, writeData} = require('../utils/file');

//async fucntion to add a user
async function createUser(req, res){
    try{
        const data = await readData();
        
        //detemine last user id
        const lastUser = data.users[data.users.length - 1];
        
        //last user id is checked. defaults to one if last users doesn't exist
        const nextId = lastUser ? lastUser.id + 1 : 1;
       
        //create new user object
        const newUser = { 
            id: nextId,
            username: req.body.username,
            first_name: req.body.first_name,
            email: req.body.email
        };
        
        //push the new data record to the users object
        data.users.push(newUser);
        
        //write data to finalize 
        await writeData(data);

        //refresh the page
        res.redirect('/');

    }catch(error){
        res.status(500).json(`Internal Server Error: ${error}`);
    }
}

//async fucntion to update a user
async function updateUser(req, res){
    try{
        const data = await readData();

        //finder function that fetch user by Id
        const user = data.users.find(user => user.id === parseInt(req.params.id));

        //update the user object fields with values from the req body (form data incoming)
        if(user){
            user.username = req.body.new_username || user.username;
            user.first_name = req.body.new_first_name || user.first_name;
            user.email = req.body.new_email || user.email; 

            await writeData(data);

            res.status(200).json("User updated succesfully");

        } else {
            res.status(404).json("User not found. Please try again.");
        }
            
    }catch(error){
        res.status(500).json(`Internal Server Error: ${error}`);
    }
}

//async fucntion to delete a user
async function deleteUser(req, res){
    try{
        const data = await readData();

        //finder function that fetch user by Id
        const user = data.users.find(user => user.id === parseInt(req.params.id));

        //check if user exists. splice the user from the users array/object
        if(user){
            //user is index position or id. "1" is the match to remove.
           data.users.splice(user, 1);
           await writeData(data);

           res.status(200).json("User deleted succesfully");
        } else {
            res.status(404).json("User not found. Please try again.");
        }
            
    }catch(error){
        res.status(500).json(`Internal Server Error: ${error}`);
    }
}

module.exports = {
    createUser,
    updateUser,
    deleteUser
}
