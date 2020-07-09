const express = require('express');
const router = express.Router();
const debug = require('debug');
    const log = debug('mijanta:route:user')
    const debugName = 'Debugging user module'
const mongoose = require("mongoose");
const Promise = require('promise');
const fs = require('fs').promises;
const TransferObject = require("./users.object");
const checkAuth = require('../middleware/check-auth');

log('boothing %o', debugName)
router.route('/:userId?')
    .get(listUsers)
    .post(createUser)
    .put(updateUser)
    .delete(deleteUser) 

async function listUsers(req, res, next){
    const userId = req.params.userId
    log('accessing all users')

    if(userId !== '' && userId !== undefined){
        res.status(200).send("User retrieved " + userId);
    }else{
        res.status(200).send("User list");
    }
    
}

async function createUser(req, res, next){
    res.status(200).send("User created");
}

async function updateUser(req, res, next){
    const userId = req.params.userId
    res.status(200).send("User, updated " + userId);
}

async function deleteUser(req, res, next){
    const userId = req.params.userId
    res.status(200).send("User deleted " + userId);
}



function readFile(dataObject){
    return new Promise(function(resolve, reject){
        fs.readFile('users.json').then(function(data){
            let users = JSON.parse(data);
            resolve(users);
        }).catch(function(error){
            console.log(error);
            reject(error);
        });
    });
}

function writeFile(){
    
}


module.exports = router;