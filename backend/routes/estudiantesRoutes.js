const express = require('express');
const router = express.Router();

const {
    registrarEstudiante,
    obtenerEstudiantes
} = require('../controllers/estudiantesController');

router.post('/', registrarEstudiante);
router.get('/', obtenerEstudiantes);

module.exports = router;