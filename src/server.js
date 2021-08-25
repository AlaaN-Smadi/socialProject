'use strict';

const express = require('express');
const app = express()

app.use(express.json())

const error500 = require('./error_handelers/500')
const error404 = require('./error_handelers/404')


const router = require('./routers/end_Points')
app.use(router)



app.use('*',error404);
app.use(error500)


function start(port) {
    app.listen(port, () => console.log(`Server started on port ${port}`));
}


module.exports = {
    app,
    start
}