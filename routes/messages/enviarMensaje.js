const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();;

const mqtt = require('mqtt');
const client = mqtt.connect(process.env.MQTT_SV);

const utilidadesUsuario = require('../../utilities/utilidadesUsuario');
const middlewares = require('../../middlewares/autenticacion')
const Usuario = require('../../models/usuario');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.post('/api/messages/send', middlewares.verificarToken, async(req, res) => {

    let token = req.get('Auth');
    let usuario = await utilidadesUsuario.obtenerUsuarioSiTokenVerificado(token);

    try {

        let respuesta = await axios.get('https://catfact.ninja/fact?max_length=140');

        let mensajeAEnviar = { message: respuesta.data.fact, user: usuario._id };

        client.publish('lyatest/Oscar', JSON.stringify(mensajeAEnviar));

        res.status(200).json({ data: mensajeAEnviar, error: false, message: "" });

    } catch (err) {

        res.status(500).json({ data: {}, error: true, message: "No se pudo enviar mensaje" });

    }


});


module.exports = app;