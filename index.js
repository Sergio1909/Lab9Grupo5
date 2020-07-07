'use strict'

const express = require("express"); //importo la libreria
const bodyParser = require("body-parser");
const mysql = require("mysql2");

var app = express(); //creo una instancia
app.use(bodyParser.urlencoded({extended:true}));

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "inventariotest"
})

app.listen(9000, function () {
    console.log("servidor levantado exitosamente");
});

//1a -eric - ambos verificados

app.get('/centrosPoblados/get/:id', function (request, response) {
     var paramid = request.params.id;
     var query1 = 'select * from inventariotest.centrospoblados where idCentroPoblado = ?';
    var query2 = 'select * from inventariotest.centrospoblados';
    var parametros = [paramid];

    conn.query(query1,parametros, function (err, resultado) {
        if (err){
            console.log(err.body);
        }else {
            response.json(resultado);
        }
    })

})

app.get('/centrosPoblados/get/', function (request, response) {
    var query2 = 'select * from inventariotest.centrospoblados';

    conn.query(query2, function (err, resultado) {
        if (err){
            console.log(err.body);
        }else {
            response.json(resultado);
        }
    })


})

//2a- eric - ambos verificados
app.get('/categoriasEquipo/get/:id', function (request, response) {
    var paramid = request.params.id;
    var query1 = 'select * from inventariotest.categoriaequipo where idCategoriaEquipo = ?';
    var parametros = [paramid];

    conn.query(query1,parametros, function (err, resultado) {
        if (err){
            console.log(err.body);
        }else {
            response.json(resultado);
        }
    })

})

app.get('/categoriasEquipo/get/', function (request, response) {
    var query2 = 'select * from inventariotest.categoriaequipo';

    conn.query(query2, function (err, resultado) {
        if (err){
            console.log(err.body);
        }else {
            response.json(resultado);
        }
    })

})

//3d

app.get('/sitios/get/:id',express.json(), function (request, response) {

    var nombrecategoria = request.body.nombreCategoriaEquipo;

})
