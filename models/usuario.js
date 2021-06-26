const { Schema, model } = require('mongoose');

const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es requerido']
    },
    username: {
        type: String,
        required: [true, 'El nombre de usuario es requerido'],
        unique: true
    },
    correo: {
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida']
    },
    active: {
        type: Boolean,
        default: false
    }
});

module.exports = model('Usuario', usuarioSchema);