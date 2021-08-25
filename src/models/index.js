'use strict';

//  socialproject




const { Sequelize, DataTypes } = require('sequelize');
const UserSchema = require('./user_model');
const sequelize = new Sequelize('postgres://postgres:0000@localhost:5432/socialproject');


const Users = UserSchema(sequelize, DataTypes);

module.exports={
    db: sequelize,
    Users: Users
}