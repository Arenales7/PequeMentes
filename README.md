# PequeMentes

## 1. Descripción del proyecto

**PequeMentes** es una aplicación web educativa dirigida a niños de nivel preprimario y primario. Su objetivo es apoyar el aprendizaje mediante actividades interactivas y juegos educativos que permiten desarrollar habilidades cognitivas, matemáticas y de orientación espacial.

El sistema permite registrar estudiantes, seleccionar actividades, realizar juegos educativos, almacenar resultados y consultar reportes del rendimiento.

## 2. Tecnologías utilizadas

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- Node.js
- Express.js
- MySQL
- mysql2

### Herramientas
- Visual Studio Code
- MySQL Workbench
- Postman

## 3. Funcionalidades principales

- Registro de estudiantes.
- Consulta de estudiantes registrados.
- Visualización de actividades educativas.
- Juegos interactivos de aprendizaje.
- Evaluación automática de respuestas.
- Cálculo de puntajes, aciertos y errores.
- Almacenamiento de resultados en MySQL.
- Consulta de reportes.
- Estadísticas generales.
- Exportación de reportes a Excel.

## 4. Actividades educativas

El sistema cuenta con nueve actividades:

### Nivel preprimario
1. Adentro y Afuera.
2. Arriba y Abajo.
3. Cerca y Lejos.
4. Encima y Debajo.
5. Figuras Geométricas.
6. Juego de Memoria.

### Nivel primario
7. Tablas de Multiplicar.
8. Suma de Quebrados.
9. Multiplicación con Decimales.

## 5. Estructura del proyecto

```text
PequeMentes/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── documentacion/
│   └── pequementes_db.sql
│
└── README.md
```

## 6. Base de datos

El proyecto utiliza MySQL y una base de datos llamada `pequementes_db`.

Las tablas principales son:

- `estudiantes`
- `actividades`
- `resultados`

El respaldo de la base de datos se encuentra en:

`documentacion/pequementes_db.sql`

## 7. Direcciones locales

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 8. Autor

David Abimael Arenales Arana
1990-23-15499
DESARROLLO WEB
