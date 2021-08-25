'use strict';


const { start } = require('./src/server')
require('dotenv').config()

const port = process.env.PORT

start(port || 3400)



const { db } = require('./src/models/index');
//the port should be from the .evn file
db.sync()
    .then(() => {
        server.start(3000);
    })
    .catch(console.error);