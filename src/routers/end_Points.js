'use strict';

const express = require('express')
const router = express.Router();
const {Users} = require('../models/index');
router.use(express.json())




function signUp(req,res){
    console.log(req)

    Users.create(req.body)
    .then(user => res.status(201).send(user))
    .catch(err => res.status(400).send(err))
}


function signIn(req,res){
    res.status(200).send(req.user);
}


router.get('/signin', signIn)
router.post('/signUp', signUp)


module.exports = router