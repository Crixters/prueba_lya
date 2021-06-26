const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const middlewares = require('../../middlewares/autenticacion')
const Usuario = require('../../models/usuario');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.delete('/api/users/:id', middlewares.verificarToken, async(req, res) => {

    let id = req.params.id;

    Usuario.findByIdAndDelete(id, (err, result) => {
        if (err) {
            res.status(500).json({ data: {}, error: true, message: err })
        } else {
            res.status(200).json({ data: {}, error: false, message: "usuario borrado" });
        }
    });

});


module.exports = app;