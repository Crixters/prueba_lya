const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const middlewares = require('../../middlewares/autenticacion')
const Usuario = require('../../models/usuario');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.patch('/api/users/:id/active', middlewares.verificarToken, async(req, res) => {

    let id = req.params.id;

    Usuario.findByIdAndUpdate(id, { active: true }, { new: true }, (err, result) => {
        if (err) {
            res.status(500).json({ data: {}, error: true, message: err })
        } else {
            res.status(200).json({ data: result, error: false, message: "" });
        }
    });

});


module.exports = app;