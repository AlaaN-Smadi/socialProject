'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'hhaoqb@@Wajow3653AASC';

const users = (sequelize, DataTypes) => {
    const model = sequelize.define('users', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role:{
            type: DataTypes.ENUM('visitor', 'user', 'admin'),
            defaultValue: 'visitor'
        },
        capabilities:{
            type: DataTypes.VIRTUAL,
            get(){
                const acl={
                    visitor:['read'],
                    user:['read', 'create'],
                    admin:['read', 'create', 'update', 'delete']
                };
                return acl[this.role]
            }
        },
        token: {
            type: DataTypes.VIRTUAL,
            get() {
                return jwt.sign({ username: this.username, capabilities:this.capabilities }, SECRET);
            },
            set(tokenObj) { 
                let token = jwt.sign(tokenObj, SECRET);
                return token;
            },
        }
    });

    model.beforeCreate(async (user) => {
        let hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
    });

    model.authenticateBasic = async function (username, password) {
        const user = await this.findOne({ where: { username } });
        // we need to check if null.

        const isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            return user;
        }

        throw new Error('Invalid user');
    }

    model.authenticateBearer = async function (token) {
        console.log(token);
        console.log(jwt.decode(token));

        const verifiedToken = jwt.verify(token, SECRET);

        //if not verfiied you need to throw an error
        const user = await this.findOne({ where: { username: verifiedToken.username } });

        if(user) { return user;}
        throw new Error('Invalid user');

    }

    return model;
}

module.exports = users;