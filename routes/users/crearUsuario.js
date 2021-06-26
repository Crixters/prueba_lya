const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const hashes = require('../../utilities/hashes');

const Usuario = require('../../models/usuario');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/api/users', async(req, res) => {

    let usuarioParaDB = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.correo,
        username: req.body.username,
        password: hashes.hashearPasswordDeUsuario(req.body.password)
    }

    let usuario = new Usuario(usuarioParaDB);

    usuario.save((err, result) => {
        if (err) {
            res.status(500).json({ data: {}, error: true, message: err })
        } else {
            res.status(200).json({ data: { user_id: result._id }, error: false, message: "" });
        }
    });


});


module.exports = app;