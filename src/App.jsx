import { useState } from "react";
import "./App.css";
import { createClient } from "@supabase/supabase-js";
import { Evaluate } from "./components/Evaluate";

const api_key = import.meta.env.VITE_SUPABASE_API_KEY;

const supabase = createClient(
  "https://gmkiwiyneprikhwhtmtz.supabase.co",
  api_key
);

function App() {
  const [user, setUser] = useState(null);
  const [vote, setVote] = useState(null);
  const [node, setNode] = useState(1);
  const [viewMore, setViewMore] = useState(false);
  const [saved, setSaved] = useState(false);

  const { name } = user || {};

  const handleVote = async (option) => {
    setVote(option);

    const { error } = await supabase
      .from("votes")
      .insert({ node, vote: option });

    if (error) {
      console.error("Error al guardar los votos:", error);
    }
  };

  const handleEvaluate = async () => {
    const { data } = await supabase.from("votes").select();
    console.log(data);

    const result = Object.values(
      data.reduce((acc, { node, vote }) => {
        const key = node;
        if (!acc[key]) acc[key] = { node, votes: {} };
        const voteKey = vote.toLowerCase();
        acc[key].votes[voteKey] = (acc[key].votes[voteKey] || 0) + 1;
        return acc;
      }, {})
    ).map(({ node, votes }) => {
      const winner = Object.keys(votes).reduce((a, b) =>
        votes[a] > votes[b] ? a : b
      );
      return { node, winner };
    });

    console.log(result, user);

    if (result) {
      const { winner } = result[result.length - 1];
      setSaved({ status: winner !== user.groupId });
      setTimeout(() => {
        setVote(null);
        setNode((prev) => prev + 1);
        setSaved(null);
      }, 15000);
    }
  };

  const nextQuestion = () => {
    setVote(null);
    setNode((prev) => prev + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({
      name: e.target["name"].value,
      groupId: e.target["group"].value,
    });
  };

  if (node === 6) {
    return (
      <div>
        <h1>👻</h1>
        <h2>¡{name}, gracias por participar! Esperemos lo hayas disfrutado.</h2>
        <p>¡Contamos con tu voto al final!</p>
        <p>Att: Persistir a lo gradle</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="initial-page">
        <h1>¡Hola!</h1>
        <p>
          Somos persistir a lo gradle, ingresa tu nombre y ayúdanos a decidir él
          final
        </p>
        <form onSubmit={handleSubmit}>
          <input id="name" placeholder="Nombre" />
          <select id="group">
            <option value="a">Profes 👨‍🏫</option>
            <option value="b">The EPERSstrikes Back 💫</option>
            <option value="c">Los Ghost Bugsters 🔥</option>
            <option value="d">MancosDB ⌛</option>
            <option value="e">NullPointer Kings ⏩</option>
            <option value="f">Los Angeles de Guido ☁️</option>
            <option value="g">Tamos Redis 🫂</option>
          </select>
          <button type="onSubmit">Listo!</button>
        </form>
      </div>
    );
  }

  if (saved) {
    return <Evaluate saved={saved.status} />;
  }

  return (
    <>
      <h1 className="title">{name}, elige una opción 👻</h1>
      <p>
        Nota: Vota solo por las opciones disponibles en el proyector y solo
        cuando demos el GO!
      </p>
      <div className="buttons">
        <button
          onClick={() => handleVote("A")}
          disabled={vote}
          className="button-vote"
        >
          Opción A
        </button>
        <button
          onClick={() => handleVote("B")}
          disabled={vote}
          className="button-vote"
        >
          Opción B
        </button>
        {viewMore && (
          <>
            <button
              onClick={() => handleVote("C")}
              disabled={vote}
              className="button-vote"
            >
              Opción C
            </button>
            <button
              onClick={() => handleVote("D")}
              disabled={vote}
              className="button-vote"
            >
              Opción D
            </button>
            <button
              onClick={() => handleVote("E")}
              disabled={vote}
              className="button-vote"
            >
              Opción E
            </button>
            <button
              onClick={() => handleVote("F")}
              disabled={vote}
              className="button-vote"
            >
              Opción F
            </button>
            <button
              onClick={() => handleVote("G")}
              disabled={vote}
              className="button-vote"
            >
              Opción G
            </button>
          </>
        )}
        <button onClick={() => setViewMore((prev) => !prev)}>
          {viewMore ? "Menos" : "Mas"} opciones...
        </button>
        {vote && (
          <section className="next-question">
            <button onClick={handleEvaluate}>? ? ? ? ?</button>
            <button onClick={nextQuestion}>Siguiente pregunta</button>
          </section>
        )}
      </div>
      <p className="read-the-docs">Desarrollado por Persistir a lo gradle</p>
    </>
  );
}

export default App;
