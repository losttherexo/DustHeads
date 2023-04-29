import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
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

  return (
    <>
      <Routes>
        <Route path='/' element={user? <Navigate to='/home'/> : <Landing/>}/>
        <Route path='/home' element={user? <Home/>: <Navigate to='/'/>}/>
        <Route path='/dusthead' element={user? <DustHead/> : <Navigate to='/'/>}/>
        <Route path='/records' element={user? <Records/> : <Navigate to='/'/>}/>
      </Routes>
    </>
  );
}

export default App;
