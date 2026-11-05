const express = require('express');
const router = express.Router();

const {
    obtenerActividades
} = require('../controllers/actividadesController');

// Ruta para consultar las actividades
router.get('/', obtenerActividades);

module.exports = router;