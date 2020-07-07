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

conn.connect(function (err) {
    if(err){
        console.log(err);
    }else{
        console.log("Conexion exitosa")
    }

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

//3c -eric

app.get('/sitios/get/', function (request, response) {

    var query2 = 'SELECT s.codigoSitio, s.idCentroPoblado, s.latitud, s.longitud, s.idSitio, c.nombreCentroPoblado, count(s.idCentroPoblado) as cantidad FROM equipos e inner join sitios s on e.idSitio = s.idSitio inner join centrospoblados c on c.idCentroPoblado = s.idCentroPoblado;';

    conn.query(query2, function (err, resultado) {
        if (err){
            console.log(err.body);
        }else {
            response.json(resultado);
        }
    })

})
//3d-eric
app.get('/sitios/get/:id', function (request, response) {
    var paramid = request.params.id;
    var query2 = 'SELECT s.codigoSitio, s.idCentroPoblado, s.latitud, s.longitud, s.idSitio, c.nombreCentroPoblado, count(s.idCentroPoblado) as cantidad FROM equipos e inner join sitios s on e.idSitio = s.idSitio inner join centrospoblados c on c.idCentroPoblado = s.idCentroPoblado;';

    conn.query(query2, function (err, resultado) {
        if (err){
            console.log(err.body);
        }else {
            response.json(resultado);
        }
    })

})







//GABO 1b
app.post("/centrosPoblados/create",function(request,response){
    var query = "INSERT INTO `inventariotest`.`centrospoblados` (`nombreCentroPoblado`, `ubigeo`) VALUES (?, ?)";

    var   nombreCentroPoblado = request.body.nombreCentroPoblado;

    var   ubigeo = request.body.ubigeo ;

    var parametros = [nombreCentroPoblado , ubigeo];


    conn.query(query,parametros,function (err,result) {
        if(err){
            console.log(err)
        }else{
            var jsonR = {
                idCentroPoblado : result.insertId,
                nombreCentroPoblado : nombreCentroPoblado , ubigeo: ubigeo}
            response.json(jsonR);
        }
    })

});



//GABO 2b
app.post("/catergoriasEquipo/create", function(request,response){
    var query = "INSERT INTO `inventariotest`.`categoriaequipo` (`nombre`) VALUES (?)";

    var   nombreCategoriaEquipo = request.body.nombreCategoriaEquipo;


    var parametros = [nombreCategoriaEquipo];


    conn.query(query,parametros,function (err,result) {
        if(err){
            console.log(err)
        }else{
            var jsonR = {
                idCategoriaEquipo : result.insertId,
                nombre : nombreCategoriaEquipo}
            response.json(jsonR);
        }
    })

});

//GABO 3b

app.post("/equipos/create", express.json(), function(request,response){
    var query = "INSERT INTO `inventariotest`.`categoriaequipo` (`nombre`) VALUES (?)";

    var   nombreEquipo = request.body.nombreEquipo;
    var   idCategoriaEquipo = request.body.idCategoriaEquipo;
    var   serialNumber = request.body.serialNumber;
    var   modelo = request.body.modelo;
    var  idSitio = request.body.idSitio;


    var parametros = [nombreEquipo , idCategoriaEquipo , serialNumber,
        modelo,  idSitio];


    conn.query(query,parametros,function (err,result) {
        if(err){
            console.log(err)
        }else{
            var jsonR = {
                idequipo : result.insertId,
                nombreEquipo : nombreEquipo,
                idCategoriaEquipo : idCategoriaEquipo,
                serialNumber : serialNumber,
                modelo : modelo,
                idSitio : idSitio}
            response.json(jsonR);
        }
    })

});

//(Sergio 1c)
//localhost:9000/centroPoblados/update
/*
--> parámetros por post para actualizar
-idCentroPoblado
-nombreCentroPoblado
-ubigeo
*/
app.post("/centrosPoblados/update", function (request, response) {
    var idCentroPoblado = request.params.idCentroPoblado;
    var nombreCentroPoblado = request.params.nombreCentroPoblado;
    var ubigeo = request.params.ubigeo;
    var parametros = [idCentroPoblado,nombreCentroPoblado,ubigeo];
    var query='UPDATE `inventariotest`.`centrospoblados` SET `idcentroPoblado` = ?,`nombreCentroPoblado`=?,`ubigeo`= ? where(`idcentroPoblado` = ?)';

    conn.query(query, parametros, function (err, jsonresultado) {
        if (err) {
            console.log(err);
        } else {
            var jsonRespuesta = {
                "idCentroPoblado": idCentroPoblado ,
                "nombreCentroPoblado": nombreCentroPoblado,
                "ubigeo":ubigeo
            }
            response.json(jsonRespuesta);
        }
    });

});

//(Sergio 2c)
//localhost:9000/categoriasEquipo/update
/*
--> parámetros por post para actualizar
-idCategoriaEquipo
-nombreCategoriaEquipo
*/
app.post("/categoriasEquipo/update", function (request, response) {
    var idCategoriaEquipo = request.params.idCategoriaEquipo;
    var nombreCategoriaEquipo = request.params.nombreCategoriaEquipo;
    var query='UPDATE `inventariotest`.`categoriaequipo` SET `idCategoriaEquipo` = ?,`nombre`=? where(`idcentroPoblado` = ?)';

    conn.query(query, parametros, function (err, jsonresultado) {
        if (err) {
            console.log(err);
        } else {
            var jsonRespuesta = {
                "idCategoriaEquipo": idCategoriaEquipo ,
                "nombreCategoriaEquipo": nombreCategoriaEquipo,
            }
            response.json(jsonRespuesta);
        }
    });

});