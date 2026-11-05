function GameLayout({
  titulo,
  descripcion,
  pregunta,
  children,
  puntaje,
  aciertos,
  errores,
  onVolver
}) {
  return (
    <section className="game-container">
      <div className="game-header">
        <h2>🎮 {titulo}</h2>
        <p>{descripcion}</p>
      </div>

      <div className="game-score">
        <div>
          ⭐ Puntaje
          <strong>{puntaje}</strong>
        </div>

        <div>
          ✅ Aciertos
          <strong>{aciertos}</strong>
        </div>

        <div>
          ❌ Errores
          <strong>{errores}</strong>
        </div>
      </div>

      <div className="game-question">
        <h2>{pregunta}</h2>
        {children}
      </div>

      <button
        type="button"
        className="back-button"
        onClick={onVolver}
      >
        ⬅️ Regresar a las actividades
      </button>
    </section>
  );
}

export default GameLayout;