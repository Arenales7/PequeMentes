
import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import './App.css';
import GameEngine from './games/GameEngine';
import preguntas from './data/preguntas';

function App() {
  const seleccionarActividad = (actividad) => {
  setActividadSeleccionada(actividad);
  setRespuestaJuego('');
  setPuntajeJuego(0);
  setMensajeJuego('');
};

const verificarRespuesta = (respuesta) => {
  setRespuestaJuego(respuesta);

  if (respuesta === 'Adentro') {
    setPuntajeJuego(10);
    setMensajeJuego('¡Muy bien! 🎉 La respuesta es correcta.');
  } else {
    setMensajeJuego('¡Inténtalo de nuevo! 😊');
  }
};

  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [estudianteActual, setEstudianteActual] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [actividades, setActividades] = useState([]);
  const [cargandoActividades, setCargandoActividades] = useState(true);
  const [errorActividades, setErrorActividades] = useState('');
  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);
  const [respuestaJuego, setRespuestaJuego] = useState('');
  const [puntajeJuego, setPuntajeJuego] = useState(0);
  const [mensajeJuego, setMensajeJuego] = useState('');
  const [reportes, setReportes] = useState([]);
  const [cargandoReportes, setCargandoReportes] = useState(false);
  const [errorReportes, setErrorReportes] = useState('');
  const [mostrarReportes, setMostrarReportes] = useState(false);
  const [totalEstudiantes, setTotalEstudiantes] = useState(0);
  const [estudiantes, setEstudiantes] = useState([]);
  const [estudianteFiltro, setEstudianteFiltro] = useState('todos');

  const totalPartidas = reportes.length;

const promedioPuntaje = totalPartidas > 0
  ? (
      reportes.reduce(
        (total, reporte) => total + Number(reporte.puntaje),
        0
      ) / totalPartidas
    ).toFixed(1)
  : 0;

useEffect(() => {
  const obtenerActividades = async () => {
    try {
      const respuesta = await fetch(
        'http://localhost:3000/api/actividades'
      );

      if (!respuesta.ok) {
        throw new Error('No se pudieron cargar las actividades.');
      }

      const datos = await respuesta.json();

      setActividades(datos.actividades);

    } catch (error) {
      console.error('Error al cargar actividades:', error);
      setErrorActividades(error.message);

    } finally {
      setCargandoActividades(false);
    }
  };

  obtenerActividades();
}, []);

  const registrarEstudiante = async (e) => {
    e.preventDefault();

    setMensaje('');

    if (!nombre.trim() || !edad) {
      setMensaje('Por favor, completa todos los campos.');
      return;
    }

    if (Number(edad) < 1 || Number(edad) > 18) {
      setMensaje('La edad debe estar entre 1 y 18 años.');
      return;
    }

    try {
      setCargando(true);

      const respuesta = await fetch(
        'http://localhost:3000/api/estudiantes',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nombre: nombre.trim(),
            edad: Number(edad)
          })
        }
      );

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.mensaje || 'No se pudo registrar el estudiante.');
      }

      setEstudianteActual(datos.estudiante);

setMensaje(
  `¡Estudiante ${datos.estudiante.nombre} registrado correctamente! 🎉`
);

setNombre('');
setEdad('');

    } catch (error) {
      console.error('Error:', error);
      setMensaje(error.message || 'No se pudo conectar con el servidor.');
    } finally {
      setCargando(false);
    }
  };

  const guardarResultado = async (resultado) => {
  if (!estudianteActual) {
    alert('Primero debes registrar un estudiante.');
    return;
  }

  try {
    const respuesta = await fetch(
      'http://localhost:3000/api/resultados',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          estudiante_id: estudianteActual.id,
          actividad_id: resultado.actividad_id,
          puntaje: resultado.puntaje,
          aciertos: resultado.aciertos,
          errores: resultado.errores
        })
      }
    );

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(
        datos.mensaje || 'No se pudo guardar el resultado.'
      );
    }

    alert('¡Partida guardada correctamente en MySQL! 🎉');

    console.log('Resultado guardado:', datos);

  } catch (error) {
    console.error('Error al guardar resultado:', error);
    alert(error.message);
  }
};

const obtenerReportes = async () => {
  try {
    setCargandoReportes(true);
    setErrorReportes('');

    const urlReportes = estudianteFiltro === 'todos'
  ? 'http://localhost:3000/api/resultados'
  : `http://localhost:3000/api/resultados?estudiante_id=${estudianteFiltro}`;

const respuesta = await fetch(urlReportes);

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(
        datos.mensaje || 'No se pudieron obtener los reportes.'
      );
    }

    setReportes(datos.resultados);
    const respuestaEstudiantes = await fetch(
  'http://localhost:3000/api/estudiantes'
);

const datosEstudiantes = await respuestaEstudiantes.json();

if (!respuestaEstudiantes.ok) {
  throw new Error('No se pudo consultar el total de estudiantes.');
}

setTotalEstudiantes(datosEstudiantes.estudiantes.length);
setEstudiantes(datosEstudiantes.estudiantes);

  } catch (error) {
    console.error('Error al obtener reportes:', error);
    setErrorReportes(error.message);

  } finally {
    setCargandoReportes(false);
  }
};

const exportarExcel = () => {
  if (reportes.length === 0) {
    alert('No hay resultados para exportar.');
    return;
  }

  const datosExcel = reportes.map((reporte) => ({
    Estudiante: reporte.estudiante,
    Actividad: reporte.actividad,
    Puntaje: reporte.puntaje,
    Aciertos: reporte.aciertos,
    Errores: reporte.errores,
    Fecha: new Date(reporte.fecha_partida).toLocaleString('es-GT')
  }));

  const hoja = XLSX.utils.json_to_sheet(datosExcel);

  const libro = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    libro,
    hoja,
    'Resultados'
  );

  XLSX.writeFile(libro, 'Reporte_PequeMentes.xlsx');
};

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <span className="logo-icon">🧠</span>
          <span>PequeMentes</span>
        </div>

        <span className="header-text">
          ¡Aprender nunca fue tan divertido!
        </span>
      </header>

      <main className="main">
        <section className="welcome">
          <span className="welcome-emoji">🌈</span>
          <h1>¡Hola, pequeño explorador!</h1>
          <p>
            Prepárate para jugar, aprender y descubrir cosas increíbles.
          </p>
        </section>

        <section className="student-card">
          <h2>👧🧒 ¿Quién va a aprender hoy?</h2>
          <p>Primero necesitamos conocer al estudiante.</p>

          <form className="student-form" onSubmit={registrarEstudiante}>
            <input
              type="text"
              placeholder="Nombre del estudiante"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              maxLength="100"
              required
            />

            <input
              type="number"
              placeholder="Edad"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
              min="1"
              max="18"
              required
            />

            <button type="submit" disabled={cargando}>
              {cargando ? 'Registrando...' : '¡Comenzar a aprender! 🚀'}
            </button>
          </form>

          {mensaje && (
            <p className="mensaje-registro" role="status">
              {mensaje}
            </p>
          )}
        </section>

        

{actividadSeleccionada && (
  <GameEngine
    actividad={actividadSeleccionada}
    preguntas={preguntas[actividadSeleccionada.codigo] || []}
    onVolver={() => setActividadSeleccionada(null)}
    onFinalizar={guardarResultado}
  />
)}

<section className="reports-access">
  <h2>📊 Reportes de aprendizaje</h2>
  <p>Consulta el rendimiento y los resultados de los estudiantes.</p>

  <button
    type="button"
    onClick={() => {
      setMostrarReportes(!mostrarReportes);

      if (!mostrarReportes) {
        obtenerReportes();
      }
    }}
  >
    {mostrarReportes ? 'Ocultar reportes' : 'Ver reportes 📊'}
  </button>
</section>

{mostrarReportes && (
  <section className="reports-section">
    <h2>📊 Historial de resultados</h2>

<button
  type="button"
  className="export-button"
  onClick={exportarExcel}
  disabled={cargandoReportes || reportes.length === 0}
>
  📥 Exportar a Excel
</button>

    <div className="report-filter">
  <label htmlFor="filtro-estudiante">
    👧🧒 Filtrar por estudiante:
  </label>

  <select
    id="filtro-estudiante"
    value={estudianteFiltro}
    onChange={(e) => {
      setEstudianteFiltro(e.target.value);
    }}
  >
    <option value="todos">Todos los estudiantes</option>

    {estudiantes.map((estudiante) => (
      <option key={estudiante.id} value={estudiante.id}>
        {estudiante.nombre}
      </option>
    ))}
  </select>

  <button
    type="button"
    onClick={obtenerReportes}
  >
    Aplicar filtro
  </button>
</div>

    <div className="statistics-cards">

  <article className="stat-card students-stat">
    <span>👧🧒</span>
    <h3>Total de estudiantes</h3>
    <strong>{totalEstudiantes}</strong>
  </article>

  <article className="stat-card games-stat">
    <span>🎮</span>
    <h3>Partidas realizadas</h3>
    <strong>{totalPartidas}</strong>
  </article>

  <article className="stat-card average-stat">
    <span>⭐</span>
    <h3>Promedio de puntuación</h3>
    <strong>{promedioPuntaje}</strong>
  </article>

</div>

    {cargandoReportes && (
      <p>Cargando reportes... ⏳</p>
    )}

    {errorReportes && (
      <p className="error-actividades">{errorReportes}</p>
    )}

    {!cargandoReportes && !errorReportes && (
      <>
        {reportes.length === 0 ? (
          <p>Aún no hay resultados registrados.</p>
        ) : (
          <div className="reports-table-container">
            <table className="reports-table">
              <thead>
                <tr>
                  <th>Estudiante</th>
                  <th>Actividad</th>
                  <th>Puntaje</th>
                  <th>Aciertos</th>
                  <th>Errores</th>
                  <th>Fecha</th>
                </tr>
              </thead>

              <tbody>
                {reportes.map((reporte) => (
                  <tr key={reporte.id}>
                    <td>{reporte.estudiante}</td>
                    <td>{reporte.actividad}</td>
                    <td>{reporte.puntaje}</td>
                    <td>{reporte.aciertos}</td>
                    <td>{reporte.errores}</td>
                    <td>
                      {new Date(reporte.fecha_partida).toLocaleString('es-GT')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </>
    )}
  </section>
)}

<section className="levels">
  <h2>📚 Elige tu nivel de aprendizaje</h2>

  {cargandoActividades && (
    <p className="estado-actividades">
      Cargando actividades... ⏳
    </p>
  )}

  {errorActividades && (
    <p className="error-actividades">
      {errorActividades}
    </p>
  )}

  {!cargandoActividades && !errorActividades && (
    <div className="level-cards">

      <article className="level-card preprimaria">
        <span className="level-emoji">🧸</span>
        <h3>Preprimaria</h3>
        <p>Aprende jugando con figuras, colores y memoria.</p>

        <div className="lista-actividades">
          {actividades
            .filter(actividad => actividad.nivel === 'Preprimaria')
            .map(actividad => (
              <button
                className="actividad-item"
                key={actividad.id}
                onClick={() => seleccionarActividad(actividad)}
              >
                <span>🎮</span>
                <span>{actividad.nombre}</span>
              </button>
            ))}
        </div>

        <span className="level-label">
          ¡Para pequeños exploradores!
        </span>
      </article>

      <article className="level-card primaria">
        <span className="level-emoji">🎓</span>
        <h3>Primaria</h3>
        <p>Practica matemáticas y supera nuevos desafíos.</p>

        <div className="lista-actividades">
          {actividades
            .filter(actividad => actividad.nivel === 'Primaria')
            .map(actividad => (
              <button
  className="actividad-item"
  key={actividad.id}
  onClick={() => seleccionarActividad(actividad)}
>
  <span>✏️</span>
  <span>{actividad.nombre}</span>
</button>
            ))}
        </div>

        <span className="level-label">
          ¡Conviértete en un campeón!
        </span>
      </article>

    </div>
  )}
</section>

      </main>

      <footer className="footer">
        <p>© 2026 PequeMentes | Aprender es una aventura 🌟</p>
      </footer>
    </div>
  );
}

export default App;
