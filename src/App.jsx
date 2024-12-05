import "./App.css";
import Vote from "./pages/Vote";
import { Home } from "./pages/Home";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const api_key = import.meta.env.VITE_SUPABASE_API_KEY;

const supabase = createClient(
  "https://gmkiwiyneprikhwhtmtz.supabase.co",
  api_key
);

function App() {
  const [viewGame, setViewGame] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
      .from("game")
      .select()
      .eq("id", "1")
      
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setViewGame(data[0]);
      }
    }
    
    fetchData();
  }, []);
  
  if(!viewGame?.start) {
    return <Home />
  }

  return <Vote />
}

export default App;
