const express = require('express');
const app = express();

app.use(require('./users/crearUsuario'));
app.use(require('./users/actualizarUsuario'));
app.use(require('./users/activarUsuario'));
app.use(require('./users/borrarUsuario'));
app.use(require('./users/obtenerUsuario'));

app.use(require('./authentication/iniciarSesion'));
app.use(require('./authentication/cerrarSesion'));

app.use(require('./messages/enviarMensaje'));

module.exports = app;