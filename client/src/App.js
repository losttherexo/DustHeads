import {Routes, Route, useLocation} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecords } from './reducers/recordSlice';
import { fetchUser } from './reducers/userSlice';
import Landing from './components/Landing';
import Home from './components/Home';
import DustHead from './components/DustHead';
import Records from './components/Records';

function App() {
  const dispatch = useDispatch()

  const user = useSelector(s => s.user)

    
  useEffect(() => {
    dispatch(fetchUser())
    dispatch(fetchRecords())
  }, [])
  
  if(!user) return(
    <Landing/>
  )

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/dusthead' element={<DustHead/>}/>
      <Route path='/records' element={<Records/>}/>
    </Routes>
    </>
  );
}

export default App;
