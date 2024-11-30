import { useState } from "react";
import "./App.css";
import { createClient } from "@supabase/supabase-js";

const api_key = import.meta.env.VITE_SUPABASE_API_KEY;

const supabase = createClient(
  "https://gmkiwiyneprikhwhtmtz.supabase.co",
  api_key
);

function App() {
  const [name, setName] = useState(null);
  const [vote, setVote] = useState(null);
  const [node, setNode] = useState(1);

  const handleVote = async (option) => {
    setVote(option);

    const { error } = await supabase
      .from("votes")
      .insert({ node, vote: option });

    if (error) {
      console.error("Error al guardar los votos:", error);
    }
  };

  const nextQuestion = () => {
    setVote(null);
    setNode((prev) => prev + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setName(e.target["name"].value);
  };

  if(node === 6) {
    return <div>
      <h1>👻</h1>
      <h2>¡{name}, gracias por participar! Esperemos lo hayas disfrutado.</h2>
      <p>¡Contamos con tu voto al final!</p>
      <p>Att: Persistir a lo gradle</p>
    </div>
  }

  if (!name) {
    return (
      <div>
        <h1>¡Hola!</h1>
        <p>
          Somos persistir a lo gradle, ingresa tu nombre y ayudanos a decidir el
          final
        </p>
        <form onSubmit={handleSubmit}>
          <input id="name" placeholder="Nombre" />
          <button type="onSubmit">Listo!</button>
        </form>
      </div>
    );
  }

  return (
    <>
      <h1 className="title">{name}, elige una opción 👻</h1>
      <p>Nota: Vota solo por las opciones disponibles en el proyector y solo cuando demos el GO!</p>
      <div className="buttons">
        <button
          onClick={() => handleVote("A")}
          disabled={vote}
          className={vote === "A" ? `button-vote` : ""}
        >
          Opción A
        </button>
        <button
          onClick={() => handleVote("B")}
          disabled={vote}
          className={vote === "B" ? `button-vote` : ""}
        >
          Opción B
        </button>
        <button
          onClick={() => handleVote("C")}
          disabled={vote}
          className={vote === "C" ? `button-vote` : ""}
        >
          Opción C
        </button>
        <button
          onClick={() => handleVote("D")}
          disabled={vote}
          className={vote === "D" ? `button-vote` : ""}
        >
          Opción D
        </button>
        {vote && <button onClick={nextQuestion}>Siguiente pregunta</button>}
      </div>
      <p className="read-the-docs">Desarrollado por Persistir a lo gradle</p>
    </>
  );
}

export default App;
