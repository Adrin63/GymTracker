const express = require("express");
const app = express();

app.get("/", function(req, res) {
    return res.send("funciona");
});

app.listen(3000, function(){
    console.log('API On, Port: 3000');
});