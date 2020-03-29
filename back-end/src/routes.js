const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessonController = require('./controllers/SessionController');
const routes = express.Router();


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


routes.post('/sessions', SessonController.create);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create);
routes.get('/ongs', OngController.index);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    })
    
}), IncidentController.create);


routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}),IncidentController.index);



routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
}), IncidentController.delete);


module.exports = routes;