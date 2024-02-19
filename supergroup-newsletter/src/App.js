import './App.css';
import { Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage/LandingPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import NewsEditor from './pages/NewsEditor/NewsEditor';
import Navbar from './components/NavBar/NavBar';
import DummyData from './pages/DummyData/DummyData';
import EntryPoint from './pages/EntryPoint/EntryPoint';
import ConfirmationPage from './pages/ConfirmationPage/ConfirmationPage';

function App() {
  return (
    <div className="App">
      {/* Navbar is outside of the Routes */}
      <Navbar />
      <div>
        <Routes>
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/newsEditor" element={<NewsEditor />} />
          <Route path="/" element={<EntryPoint />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/dummyData" element={<DummyData/>} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
