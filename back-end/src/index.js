const express = require('express');

const cors = require('cors');

const routes = require('./routes');

const app = express();

app.use(express.json());

app.use(cors());

app.use(routes);
/*
*TIPOS de PARÂMETROS:
*    Query Params: Parâmetros nomeados enviados na rota após "?" (Filtros, paginação) forma de acesso: "request.query"
*    Route Params: Parâmetros utilizados para identificar recursos, ex: "/users/:id"   forma de acesso: "request.params"
*    Headers Params: Parâmetros encontrados no cabeçalho
*    Request Body: Corpo da requisição, utilizado para criar ou alterar recursos, ex:"POST", forma de acesso: "request.body"            
*/


/*
* SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
* NoSQL: MongoDB, CouchDB, etc
*/


/*
* Driver: SELECT * FROM users
* Query Builder: table('users').select('*').where()
*/




app.listen(3333);