//VERIFICAR TOKEN
const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {

    let token = req.get('Auth');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) { return res.status(401).json({ data: {}, error: false, message: "Token no válido" }); }

        next();

    });



};


module.exports = {
    verificarToken
};