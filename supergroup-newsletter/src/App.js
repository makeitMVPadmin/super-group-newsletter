import './App.css';
import { Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage/LandingPage';
import Confirm from './pages/Confirm/Confirm';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import NewsEditor from './pages/NewsEditor/NewsEditor';
import Navbar from './components/NavBar/NavBar';
import DummyData from './pages/DummyData/DummyData';
import EntryPoint from './pages/EntryPoint/EntryPoint';

function App() {
  return (
    <div className="App">
      {/* Navbar is outside of the Routes */}
      <Navbar />
      <div>
        <Routes>
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/confirm" element={<Confirm />} />
          <Route path="/newsEditor" element={<NewsEditor />} />
          <Route path="/dummyData" element={<DummyData/>} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<EntryPoint />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
