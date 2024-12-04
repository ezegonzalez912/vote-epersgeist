import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Vote from "./pages/Vote";
import { Home } from "./pages/Home";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="vote-epersgeist/" element={<Home />} />
          <Route path="vote-epersgeist/vote" element={<Vote />} />
          <Route path="*" element={<p>No hay nada por aqui...</p>} />
        </Routes>
    </Router>
  );
}

export default App;
