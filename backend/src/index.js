const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(cors(
    // colocar link do front depois
    //{origin: 'LINK';}
));
app.use(express.json());
app.use(routes);

app.listen(3333);