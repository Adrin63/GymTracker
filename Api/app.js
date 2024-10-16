const express = require("express");
const app = express();

const models = require("./models");

app.get("/", function(req, res) {
    console.log('Docker funciona')
    return res.send("funciona");
});



app.listen(3000, function(){
    console.log('API On, Port: 3000');
});