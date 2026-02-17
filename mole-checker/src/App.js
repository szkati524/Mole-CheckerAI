import React,{ useState} from "react";
import MainPage  from "./components/MainPage";
import axios from 'axios';
import './App.css';

function App() {
  const [showScanner,setShowScanner] = useState(false);
  const [file,setFile] = useState(null);
  const [result,setResult] = useState("");
  const [loading, setLoading] = useState(false);
  if(!showScanner){
    return <MainPage onStart={() => setShowScanner(true)} />
  }

  const handleUpload = async () => {
    if(!file) return alert("please send image!");
    setLoading(true);
    setResult("");
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('http://localhost:8081/api/scan',formData);
      setResult(response.data);
    } catch(error) {
      setResult("błąd: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <button 
        className="back-button"
        onClick={() => setShowScanner(false)}
        > 
        ← BACK
        </button>
        <h1 className="logo-top">MoleCheckerAI</h1>
        <div className="scanner-container">
          <p className="scanner-instruction">Upload Image For AI Analysis</p>
        </div>
        <input type="file" id="file-input" onChange={(e) => setFile(e.target.files[0])} />
        <button className= "analyze-button" onClick={handleUpload} disabled={loading}>
          {loading ? "Analyse..."  : "Analyse mole"}
        </button>
        {result && <div className="result-box"><p>{result}</p></div>}
      </header>
    </div>
  );
}
export default App;