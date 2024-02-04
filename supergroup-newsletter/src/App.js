import './App.css'
import { Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {

  return (

      <div className="App">
        <div>
          <Routes>
            <Route
              path="/*"
              element={
                <>
                  <NotFoundPage />
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  <LandingPage />
                </>
              }
            />
          </Routes>
        </div>    
      </div>
  );
}

export default App;
