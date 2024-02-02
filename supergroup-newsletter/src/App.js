import './App.css'
import { ApiProvider } from './components/ApiContext';
import AiInputBox from './components/AiInputBox';

function App() {

  return (
    // Api wrapper is here instead of root, but it could wrap root if you decide later.
    <ApiProvider>
      <div className="App">
        <div>
          <AiInputBox />
        </div>    
      </div>
    </ApiProvider>
  );
}

export default App;
