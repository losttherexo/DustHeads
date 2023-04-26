import { useState, useEffect } from "react"
import {Routes, Route} from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import DustHead from './components/DustHead';
import Records from './components/Records';

function App() {

  const [records, setRecords] = useState([])

  useEffect(() => {
    fetch('http://localhost:5555/records')
        .then(r => r.json())
        .then(setRecords)
  },[])


  return (
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/dusthead' element={<DustHead/>}/>
      <Route path='/records' element={<Records records={records}/>}/>
    </Routes>
  );
}

export default App;
