import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateHero from './pages/CreateHero';
import HeroDetails from './pages/HeroDetails';
import EditHero from './pages/EditHero';
import './index.css';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateHero />} />
      <Route path="/superheroes/:id" element={<HeroDetails />} />
      <Route path="/edit/:id" element={<EditHero />} />
      </Routes>
  );
}

export default App;
