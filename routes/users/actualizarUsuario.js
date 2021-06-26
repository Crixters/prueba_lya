const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const hashes = require('../../utilities/hashes');
const middlewares = require('../../middlewares/autenticacion')
const Usuario = require('../../models/usuario');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.put('/api/users/:id', middlewares.verificarToken, async(req, res) => {

    let id = req.params.id;
    let datosActualizar = req.body;

    if (req.body.password) {
        datosActualizar.password = hashes.hashearPasswordDeUsuario(req.body.password);
    }

    Usuario.findByIdAndUpdate(id, datosActualizar, { new: true }, (err, result) => {
        if (err) {
            res.status(500).json({ data: {}, error: true, message: err })
        } else {
            res.status(200).json({ data: result, error: false, message: "" });
        }
    });

});


module.exports = app;