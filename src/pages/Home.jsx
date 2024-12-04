import { useEffect, useState } from "react";

export const Home = () => {
  useEffect(() => {
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const targetDate = new Date("2024-12-06T16:00:00-03:00");

  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const updateCountdown = () => {
    const now = new Date();
    const distance = targetDate - now;

    if (distance <= 0) {
      setTimeRemaining({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    } else {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeRemaining({
        days,
        hours,
        minutes,
        seconds,
      });
    }
  };

  return (
    <div>
      <h1>¿Que car@j1 es esto?</h1>
      <p>
        Estás a punto de ser parte de algo <b>ÉPICO</b>. ¿estás listo para decidir el destino de los
        grupos?
      </p>
      <h2>Cuenta Regresiva</h2>
      <p>
        {timeRemaining.days} días, {timeRemaining.hours} horas,{" "}
        {timeRemaining.minutes} minutos, {timeRemaining.seconds} segundos
      </p>
    </div>
  );
};
