const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const middlewares = require('../../middlewares/autenticacion');
const Usuario = require('../../models/usuario');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.delete('/api/authorization', middlewares.verificarToken, async(req, res) => {

    let token = req.get('Auth');

    console.log(token);


});


module.exports = app;