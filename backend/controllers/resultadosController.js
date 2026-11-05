const db = require('../config/db');

// Registrar resultado de una partida
const registrarResultado = async (req, res) => {
    try {
        const {
            estudiante_id,
            actividad_id,
            puntaje,
            aciertos,
            errores
        } = req.body;

        // Validar campos obligatorios
        if (
            estudiante_id === undefined ||
            actividad_id === undefined ||
            puntaje === undefined ||
            aciertos === undefined ||
            errores === undefined
        ) {
            return res.status(400).json({
                mensaje: 'Todos los campos son obligatorios'
            });
        }

        // Validar que sean números válidos
        const datos = [
            estudiante_id,
            actividad_id,
            puntaje,
            aciertos,
            errores
        ];

        if (
            datos.some(valor =>
                !Number.isInteger(Number(valor)) || Number(valor) < 0
            )
        ) {
            return res.status(400).json({
                mensaje: 'Los valores deben ser números enteros no negativos'
            });
        }

        if (Number(estudiante_id) < 1 || Number(actividad_id) < 1) {
            return res.status(400).json({
                mensaje: 'El estudiante y la actividad deben ser válidos'
            });
        }

        const [resultado] = await db.query(
            `INSERT INTO resultados
            (estudiante_id, actividad_id, puntaje, aciertos, errores)
            VALUES (?, ?, ?, ?, ?)`,
            [
                Number(estudiante_id),
                Number(actividad_id),
                Number(puntaje),
                Number(aciertos),
                Number(errores)
            ]
        );

        res.status(201).json({
            mensaje: 'Resultado registrado correctamente',
            resultado_id: resultado.insertId
        });

    } catch (error) {
        console.error('Error al registrar resultado:', error);

        res.status(500).json({
            mensaje: 'Error al guardar el resultado'
        });
    }
};


// Obtener reporte de progreso de estudiantes
const obtenerReporte = async (req, res) => {
    try {
        const { estudiante_id } = req.query;

        let sql = `
            SELECT
                r.id,
                e.id AS estudiante_id,
                e.nombre AS estudiante,
                e.edad,
                a.nombre AS actividad,
                a.nivel,
                r.puntaje,
                r.aciertos,
                r.errores,
                r.fecha_partida
            FROM resultados r
            INNER JOIN estudiantes e
                ON r.estudiante_id = e.id
            INNER JOIN actividades a
                ON r.actividad_id = a.id
        `;

        const parametros = [];

        if (estudiante_id) {
            sql += ' WHERE e.id = ?';
            parametros.push(Number(estudiante_id));
        }

        sql += ' ORDER BY r.fecha_partida DESC';

        const [resultados] = await db.query(sql, parametros);

        res.json({
            mensaje: 'Reporte obtenido correctamente',
            total: resultados.length,
            resultados
        });

    } catch (error) {
        console.error('Error al generar reporte:', error);

        res.status(500).json({
            mensaje: 'Error al consultar el reporte'
        });
    }
};

module.exports = {
    registrarResultado,
    obtenerReporte
};