import './App.css';
import { Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage/LandingPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import NewsEditor from './pages/NewsEditor/NewsEditor';
import Navbar from './components/NavBar/NavBar';
<<<<<<< HEAD
import DummyData from './pages/DummyData/DummyData';
=======
import EntryPoint from './pages/EntryPoint/EntryPoint';
>>>>>>> develop

function App() {
  return (
    <div className="App">
      {/* Navbar is outside of the Routes */}
      <Navbar />
      <div>
        <Routes>
          <Route path="/dashboard" element={<EntryPoint />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/newsEditor" element={<NewsEditor />} />
          <Route path="/dummyData" element={<DummyData/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
