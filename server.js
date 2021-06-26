const express = require('express');
const app = express();
const cors = require('cors');
const databaseConfig = require('./database/config');
require('./config/config');

app.use(cors());
app.use(require('./routes/presentadorRutas'));

databaseConfig.dbConnection();

app.listen(process.env.PORT, () => {
    console.log("Corriendo en el puerto " + process.env.PORT);
});