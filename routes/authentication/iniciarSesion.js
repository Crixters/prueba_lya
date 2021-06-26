const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const hashes = require('../../utilities/hashes');
const utilidadesUsuario = require('../../utilities/utilidadesUsuario');
const Usuario = require('../../models/usuario');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/api/authorization', async(req, res) => {

    let username = req.body.username;
    let password = req.body.password;

    Usuario.find({ username }, (err, result) => {
        if (err) {
            res.status(500).json({ data: {}, error: true, message: err })
        } else {

            let usuarioEncontrado = result[0];

            let sonPasswordsIguales = hashes.compararPasswordsHasheados(password, usuarioEncontrado.password);

            if (sonPasswordsIguales) {

                usuarioEncontrado.password = "";
                let token = utilidadesUsuario.crearTokenDeUsuario(usuarioEncontrado);
                res.status(200).json({ data: { token }, error: false, message: "" })

            } else {
                res.status(404).json({ data: {}, error: false, message: "Usuario o contraseña no encontrados" })
            }

        }
    });

});


module.exports = app;