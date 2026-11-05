const db = require('../config/db');

// REGISTRAR UN ESTUDIANTE
const registrarEstudiante = async (req, res) => {
    try {
        const { nombre, edad } = req.body;

        if (!nombre || !edad) {
            return res.status(400).json({
                mensaje: 'El nombre y la edad son obligatorios'
            });
        }

        if (typeof nombre !== 'string' || !nombre.trim()) {
            return res.status(400).json({
                mensaje: 'El nombre no es válido'
            });
        }

        const edadNumero = Number(edad);

        if (!Number.isInteger(edadNumero) || edadNumero < 1 || edadNumero > 18) {
            return res.status(400).json({
                mensaje: 'La edad debe ser un número entero entre 1 y 18'
            });
        }

        const [resultado] = await db.query(
            'INSERT INTO estudiantes (nombre, edad) VALUES (?, ?)',
            [nombre.trim(), edadNumero]
        );

        res.status(201).json({
            mensaje: 'Estudiante registrado correctamente',
            estudiante: {
                id: resultado.insertId,
                nombre: nombre.trim(),
                edad: edadNumero
            }
        });

    } catch (error) {
        console.error('Error al registrar estudiante:', error);

        res.status(500).json({
            mensaje: 'Error al registrar el estudiante'
        });
    }
};

// OBTENER TODOS LOS ESTUDIANTES
const obtenerEstudiantes = async (req, res) => {
    try {
        const [estudiantes] = await db.query(
            'SELECT * FROM estudiantes ORDER BY fecha_registro DESC'
        );

        res.json({
            mensaje: 'Estudiantes obtenidos correctamente',
            total: estudiantes.length,
            estudiantes
        });

    } catch (error) {
        console.error('Error al obtener estudiantes:', error);

        res.status(500).json({
            mensaje: 'Error al consultar los estudiantes'
        });
    }
};

// EXPORTAR FUNCIONES
module.exports = {
    registrarEstudiante,
    obtenerEstudiantes
};