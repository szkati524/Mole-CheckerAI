import React,{ useState} from "react";
import axios from 'axios';
import './App.css';

function App() {
  const [file,setFile] = useState(null);
  const [result,setResult] = useState("");
  const [loading, setLoading] = useState(false);

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
        <h1>MoleCheckerAI</h1>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Analyse..."  : "Analyse mole"}
        </button>
        {result && <div className="result-box"><p>{result}</p></div>}
      </header>
    </div>
  );
}
export default App;
