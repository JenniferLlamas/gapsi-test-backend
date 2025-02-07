const express = require('express');
const ProveedoresController = require('../app/controllers/ProveedoresController');




const router = express.Router();

module.exports = router
    .post('/proveedores',           ProveedoresController.add)
    .get('/proveedores/:id',        ProveedoresController.get)
    .put('/proveedores',            ProveedoresController.update)
    .delete('/proveedores',         ProveedoresController.delete)
    .get('/proveedores',            ProveedoresController.list)
