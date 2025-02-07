const express = require('express');
const AuthController = require('../app/Auth/AuthController');


const router = express.Router();

module.exports = router
    .get('/usuario/logged',        AuthController.logged)
