'use strict';

//  socialproject




const { Sequelize, DataTypes } = require('sequelize');
const UserSchema = require('./user_model');
const sequelize = new Sequelize('postgres://vopqhctf:JP90Xexw-5o1QRDCHY2WS5n4Y6dNKFaw@chunee.db.elephantsql.com/vopqhctf');


const Users = UserSchema(sequelize, DataTypes);

module.exports={
    db: sequelize,
    Users: Users
}