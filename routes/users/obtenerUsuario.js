const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const middlewares = require('../../middlewares/autenticacion')
const Usuario = require('../../models/usuario');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/users/:id', middlewares.verificarToken, async(req, res) => {

    let id = req.params.id;

    Usuario.findById(id, (err, result) => {
        if (err) {
            res.status(500).json({ data: {}, error: true, message: err })
        } else {
            if (result.active) {
                res.status(200).json({ data: result, error: false, message: "" });
            } else {
                res.status(404).json({ data: {}, error: true, message: "Usuario no activo" });
            }
        }
    });

});


module.exports = app;