import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Evaluate } from "../components/Evaluate";

const api_key = import.meta.env.VITE_SUPABASE_API_KEY;

const supabase = createClient(
  "https://gmkiwiyneprikhwhtmtz.supabase.co",
  api_key
);

function Vote() {
  const [user, setUser] = useState(null);
  const [vote, setVote] = useState(null);
  const [node, setNode] = useState(1);
  const [viewMore, setViewMore] = useState(false);
  const [saved, setSaved] = useState(false);
  const [clicks, setClicks] = useState(0);

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
    if (clicks <= 1) {
      setClicks((prev) => prev + 1);
      return;
    }

    setClicks(100);

    const { data } = await supabase.from("votes").select();

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

    if (result) {
      const { winner } = result[result.length - 1];
      
      setSaved({ status: winner !== user.groupId });
      setViewMore(false);
      setTimeout(() => {
        if (winner !== user.groupId) {
          setVote(null);
          setNode((prev) => prev + 1);
          setSaved(null);
        } else {
          setVote(null);
          setNode(6);
          setSaved(null);
        }
      }, 15000);
    }
  };

  const nextQuestion = async () => {
    const { data } = await supabase.from("game").select().eq("id", 2).single();

    if(data?.question > node) {
      setVote(null);
      setNode((prev) => prev + 1);
      setClicks(0);
    }
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
        <h2>¡{name}, gracias por participar! Esperamos que lo hayas disfrutado.</h2>
        <p>¡Contamos con tu voto al final!</p>
        <p>Atentamente: Persistir a lo Gradle</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="initial-page">
        <h1>¡Hola!</h1>
        <p>
          Somos <b>Persistir a lo Gradle</b>. Ingresa tu nombre y ayúdanos a
          decidir el final.
        </p>
        <form onSubmit={handleSubmit}>
          <input id="name" placeholder="Nombre" required/>
          <select id="group" required>
            <option value="">Selecciona tu equipo</option>
            <option value="a">Tamos Redis 🫂</option>
            <option value="b">NullPointer Kings ⏩</option>
            <option value="c">Los Ángeles de Guido ☁️</option>
            <option value="d">MancosDB ⌛</option>
            <option value="e">Los Ghost Bugsters 🔥</option>
            <option value="f">The EPERSstrikes Back 💫</option>
            <option value="g">Profes 👨‍🏫</option>
          </select>
          <button type="onSubmit">¡Listo!</button>
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
      <h3>Pregunta {node} de (?)</h3>
      <p>
        Aguarda las indicaciones para realizar cualquier acción en la aplicación.
      </p>
      <div className="buttons">
        <button
          onClick={() => handleVote("A")}
          disabled={vote}
          className={
            vote && vote !== "A" ? "noclick button-vote" : "click button-vote"
          }
        >
          Opción A
        </button>
        <button
          onClick={() => handleVote("B")}
          disabled={vote}
          className={
            vote && vote !== "B" ? "noclick button-vote" : "click button-vote"
          }
        >
          Opción B
        </button>
        {viewMore && (
          <>
            <button
              onClick={() => handleVote("C")}
              disabled={vote}
              className={
                vote && vote !== "C"
                  ? "noclick button-vote"
                  : "click button-vote"
              }
            >
              Opción C
            </button>
            <button
              onClick={() => handleVote("D")}
              disabled={vote}
              className={
                vote && vote !== "D"
                  ? "noclick button-vote"
                  : "click button-vote"
              }
            >
              Opción D
            </button>
            <button
              onClick={() => handleVote("E")}
              disabled={vote}
              className={
                vote && vote !== "E"
                  ? "noclick button-vote"
                  : "click button-vote"
              }
            >
              Opción E
            </button>
            <button
              onClick={() => handleVote("F")}
              disabled={vote}
              className={
                vote && vote !== "F"
                  ? "noclick button-vote"
                  : "click button-vote"
              }
            >
              Opción F
            </button>
            <button
              onClick={() => handleVote("G")}
              disabled={vote}
              className={
                vote && vote !== "G"
                  ? "noclick button-vote"
                  : "click button-vote"
              }
            >
              Opción G
            </button>
          </>
        )}
        {!vote && (
          <button
            className="view_more"
            onClick={() => setViewMore((prev) => !prev)}
          >
            Ver {viewMore ? "menos" : "más"}
          </button>
        )}
        {vote && (
          <section className="next-question">
            <button onClick={nextQuestion}>Siguiente pregunta</button>
          </section>
        )}
      </div>
      {clicks !== 100 && node > 1 && (
        <button className="kill-btn" onClick={handleEvaluate}>
          ¿Estoy bien?
        </button>
      )}
      <p className="read-the-docs">Desarrollado por Persistir a lo Gradle</p>
    </>
  );
}

export default Vote;
