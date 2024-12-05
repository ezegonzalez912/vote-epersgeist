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
      <h1>No te comas el <span className="breathing-text">VERSO</span>!</h1>
      <p style={{ fontSize: 18, margin: 0 }}>
        La <b>VERDADADERA</b> presentación es sobre kafka.<br />
        <b>Kafka presentaciones en serio.</b> ¿Estás listo?
      </p>
      <h3>Cuenta Regresiva</h3>
      <p style={{ fontSize: 25, margin: 0 }}>
        {timeRemaining.days} días, {timeRemaining.hours} horas,{" "}
        {timeRemaining.minutes} minutos, {timeRemaining.seconds} segundos
      </p>
    </div>
  );
};
