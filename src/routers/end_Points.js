'use strict';

const express = require('express')
const router = express.Router();
const {Users} = require('../models/index');
router.use(express.json())

const bearer=require('../middleWare/berear_auth')
const basic=require('../middleWare/basic_auth')
const asl=require('../middleWare/acl')

function signUp(req,res){
    console.log(req)

    Users.create(req.body)
    .then(user => res.status(201).send(user))
    .catch(err => res.status(400).send(err))
}

function readHandler(req,res){

res.send('read successful')


};


function writeHandler(req,res){

    res.send('write successful')

    
};


function deleteHandler(req,res){


    res.send('delete successful')
    
};


function signIn(req,res){
    res.status(200).send(req.user);
}


router.post('/signin', basic(Users) ,signIn)
router.post('/signUp', signUp)
router.get('/read', bearer(Users),asl("read"),readHandler)
router.put('/write', bearer(Users),asl("write"),writeHandler)
router.delete('/delete',bearer(Users),asl("delete"), deleteHandler)



module.exports = router