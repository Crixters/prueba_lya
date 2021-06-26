const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.DB_CONN_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

    } catch (err) {
        console.log(err);
        throw new Error('Error al conectar la base de datos');
    }

}

module.exports = {
    dbConnection
}