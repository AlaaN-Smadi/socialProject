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
async function readHandler(req,res){
    let allUsers = await Users.findAll();
    res.status(200).json(allUsers);



};


function createHandler(req,res){

    res.send('You have a permission for Creating')

    
};


async function deleteHandler(req,res){
    let id = parseInt(req.query.id);
    await Users.destroy({ where: { id } });
    res.send(` id : ${id} --- Successfully Deleted`);
    
};

async function updateHandler(req,res){
    // let id = parseInt(req.params.id);    
    // let UserData = req.body;
    // let UserInformation = await Users.update(UserData, id);    
    res.status(200).send('You have a Permission to update');
}

function signIn(req,res){
    res.status(200).send(req.user);
}

let test = (req,res,next)=>{
    next('Internal Error!!')
}
router.get('/badLink', test)
router.post('/signin', basic(Users) ,signIn)
router.post('/signUp', signUp)
router.get('/read', bearer(Users),asl("read"),readHandler)
router.put('/update', bearer(Users),asl("update"),updateHandler)
router.put('/create', bearer(Users),asl("write"),createHandler)
router.delete('/delete',bearer(Users),asl("delete"), deleteHandler)

   

module.exports = router