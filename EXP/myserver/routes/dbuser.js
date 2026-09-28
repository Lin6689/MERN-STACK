var express = require('express');
const User = require('../models/user');
var router = express.Router();

// get all users
router.get('/', async function (req, res, next) {
    try {
        const allusers = await User.find()
        res.status(200).json({message: "Get all User Successfully", user: allusers})
    }catch(error) {
        console.log(error);
    }
});

//get user by id
router.get('/:id', async function (req, res, next) {
    try {
        const {id} = req.params
        const user = await User.findById(id)
        res.status(200).json({ message: "Get all User Successfully", user:user})
    }catch(error) {
        res.status(500).json({ message: "failed to create user", error:error})

    }
});

// post for create user
router.post('/', async function (req, res, next) {
    try {
        const body = req.body
        const createUser = await User.create(body)
        res.status(201).json({ message: "User created Successfully", user:createUser })
    }catch{
        console.log(error);
        res.status(500).json({ message: "failed to create user", error: error })
    }
    
});

// Put for update user
router.put('/:id', async function (req, res, next) {
    try{
        const { id } = req.params
        const updateUserData = req.body

        const user =  await User.findByIdAndUpdate(id, updateUserData, { new: true })
        res.status(200).json({ message: "User Update Successfully", user: user })
    }catch (error) {
        console.log(error);
        res.status(500).json({ message: "failed to update user", error: error }) 
    }
});

// delete for delete user
router.delete('/:id', async function (req, res, next) {
    try {
        const { id } = req.params
        const deleteUser = await User.findByIdAndDelete(id)
        res.status(200).json ({ message: "User deleted Successfully", user: deleteUser })
    }catch (error){
        console.log(error);
        res.status(500).json({ message: "failed to dekete user", error:error })
    }
});

module.exports = router;