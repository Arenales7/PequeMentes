
import { useState } from 'react';
import GameLayout from '../components/GameLayout';

function GameEngine({
  actividad,
  preguntas,
  onVolver,
  onFinalizar
}) {
  const [indicePregunta, setIndicePregunta] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [aciertos, setAciertos] = useState(0);
  const [errores, setErrores] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [finalizado, setFinalizado] = useState(false);

  const preguntaActual = preguntas[indicePregunta];

  const responder = (opcion) => {
    if (respuestaSeleccionada !== null || finalizado) return;

    setRespuestaSeleccionada(opcion);

    if (opcion === preguntaActual.respuesta) {
      setPuntaje(prev => prev + 10);
      setAciertos(prev => prev + 1);
    } else {
      setErrores(prev => prev + 1);
    }
  };

  const siguientePregunta = () => {
    if (indicePregunta + 1 < preguntas.length) {
      setIndicePregunta(prev => prev + 1);
      setRespuestaSeleccionada(null);
    } else {
      setFinalizado(true);

      onFinalizar({
        actividad_id: actividad.id,
        puntaje,
        aciertos,
        errores
      });
    }
  };

  if (finalizado) {
    return (
      <GameLayout
        titulo={actividad.nombre}
        descripcion="¡Has terminado tu aventura!"
        pregunta="🏆 ¡Felicidades!"
        puntaje={puntaje}
        aciertos={aciertos}
        errores={errores}
        onVolver={onVolver}
      >
        <h3>Tu puntuación final es: {puntaje} puntos</h3>
        <p>Respuestas correctas: {aciertos}</p>
        <p>Respuestas incorrectas: {errores}</p>
      </GameLayout>
    );
  }

  return (
    <GameLayout
      titulo={actividad.nombre}
      descripcion={`Pregunta ${indicePregunta + 1} de ${preguntas.length}`}
      pregunta={preguntaActual.pregunta}
      puntaje={puntaje}
      aciertos={aciertos}
      errores={errores}
      onVolver={onVolver}
    >
      {preguntaActual.imagen && (
        <div className="game-image">
          {preguntaActual.imagen}
        </div>
      )}

      <div className="game-options">
        {preguntaActual.opciones.map((opcion, indice) => (
          <button
            key={indice}
            type="button"
            disabled={respuestaSeleccionada !== null}
            className={
              respuestaSeleccionada === opcion
                ? opcion === preguntaActual.respuesta
                  ? 'option-button correct'
                  : 'option-button incorrect'
                : 'option-button'
            }
            onClick={() => responder(opcion)}
          >
            {opcion}
          </button>
        ))}
      </div>

      {respuestaSeleccionada !== null && (
        <div className="game-feedback">
          {respuestaSeleccionada === preguntaActual.respuesta
            ? '¡Muy bien! 🎉 Respuesta correcta.'
            : `¡Sigue intentando! La respuesta correcta era: ${preguntaActual.respuesta}`}
        </div>
      )}

      {respuestaSeleccionada !== null && (
        <button
          type="button"
          className="next-button"
          onClick={siguientePregunta}
        >
          {indicePregunta + 1 === preguntas.length
            ? 'Finalizar juego 🏆'
            : 'Siguiente pregunta ➡️'}
        </button>
      )}
    </GameLayout>
  );
}

export default GameEngine;
