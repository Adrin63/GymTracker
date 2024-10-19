const express = require("express");
const cors = require("cors");

const routes = require('./routes');
const app = express();

app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
const models = require("./models");

app.use('/api', routes);

app.listen(3006, function(){
    console.log('API On, Port: 3006');
});