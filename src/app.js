require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

//Rutas funcionales

app.use(require('./routes/login'));
app.use(require('./routes/ventas'));
app.use(require('./routes/direcciones'));
app.use(require('./routes/clientes'));
app.use(require('./routes/vendedores'));

app.listen(process.env.APP_PORT, () =>{
    console.log('Server on port ', process.env.APP_PORT);
});