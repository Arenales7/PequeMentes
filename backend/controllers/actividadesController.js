const db = require('../config/db');

// Obtener catálogo de actividades
async function obtenerActividades(req, res) {
    try {
        const [actividades] = await db.query(
            'SELECT * FROM actividades WHERE activo = 1 ORDER BY nivel, nombre'
        );

        res.json({
            mensaje: 'Actividades obtenidas correctamente',
            total: actividades.length,
            actividades
        });

    } catch (error) {
        console.error('Error al obtener actividades:', error);

        res.status(500).json({
            mensaje: 'Error al consultar las actividades'
        });
    }
}

module.exports = {
    obtenerActividades
};