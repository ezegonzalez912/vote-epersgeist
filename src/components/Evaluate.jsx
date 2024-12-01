import { useEffect, useState } from "react";

export const Evaluate = ({ saved }) => {    
  const [finish, setFinish] = useState(false);

  useEffect(() => {
    setTimeout(() => setFinish(true), 5000);
  }, []);

  if (!finish) return <p>Analizando resultados...</p>;

  return (
    <div className="container">
      <div className={`${saved ? "circle saved" : "circle kill"}`}>
        <p className="text-saved">
          {saved ? "Te salvaste" : "Te sacrificaron!!!"}
        </p>
      </div>
    </div>
  );
};
