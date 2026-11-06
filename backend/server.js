
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/db');

const estudiantesRoutes = require('./routes/estudiantesRoutes');
const actividadesRoutes = require('./routes/actividadesRoutes');
const resultadosRoutes = require('./routes/resultadosRoutes');

const app = express();

// Middleware
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:4173',
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins
}));

app.use(express.json());

// Rutas
app.use('/api/estudiantes', estudiantesRoutes);
app.use('/api/actividades', actividadesRoutes);
app.use('/api/resultados', resultadosRoutes);

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        mensaje: 'Bienvenido a la API de PequeMentes',
        estado: 'Servidor funcionando'
    });
});

// Comprobar conexión con MySQL
app.get('/api/test-db', async (req, res) => {
    try {
        const [resultado] = await db.query(
            'SELECT DATABASE() AS base_datos'
        );

        res.json({
            mensaje: 'Conexión con MySQL exitosa',
            base_datos: resultado[0].base_datos
        });

    } catch (error) {
        console.error('ERROR DETALLADO DE MYSQL:', error);

        res.status(500).json({
            mensaje: 'Error al consultar MySQL',
            error: error.message,
            codigo: error.code
        });
    }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
