import {Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import Landing from './components/Landing';
import Home from './components/Home';
import DustHead from './components/DustHead';
import Records from './components/Records';


function App() {
  const [user, setUser] = useState(null)
  const updateUser = (user) => setUser(user)


  if(!user) return(
    <Landing updateUser={updateUser}/>
  )
  
  return (
    <Routes>
      <Route path='/' element={<Landing updateUser={updateUser}/>}/>
      <Route path='/home' element={<Home updateUser={updateUser}/>}/>
      <Route path='/dusthead' element={<DustHead/>}/>
      <Route path='/records' element={<Records/>}/>
    </Routes>
  );
}

export default App;
