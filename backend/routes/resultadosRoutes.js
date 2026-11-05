const express = require('express');
const router = express.Router();

const {
    registrarResultado,
    obtenerReporte
} = require('../controllers/resultadosController');

// Registrar resultado de una partida
router.post('/', registrarResultado);

// Consultar reporte de progreso
router.get('/', obtenerReporte);

module.exports = router;