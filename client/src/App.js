import {Routes, Route} from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import DustHead from './components/DustHead';
import Records from './components/Records';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/dusthead' element={<DustHead/>}/>
      <Route path='/records' element={<Records/>}/>
    </Routes>
  );
}

export default App;
