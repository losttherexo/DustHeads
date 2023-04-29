import {Routes, Route, useLocation} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecords } from './reducers/recordSlice';
import { updateUser, fetchUser } from './reducers/userSlice';
import Landing from './components/Landing';
import Home from './components/Home';
import DustHead from './components/DustHead';
import Records from './components/Records';
import NavBar from './components/NavBar';


function App() {
  const dispatch = useDispatch()

  const user = useSelector(s => s.user)
    
  useEffect(() => {
    dispatch(fetchUser())
    dispatch(fetchRecords())
  }, [])
  
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  
  // if(!user) return(
  //   <Landing updateUser={updateUser}/>
  // )

  return (
    <>
    {!isLandingPage && <NavBar/>}
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/dusthead' element={<DustHead/>}/>
      <Route path='/records' element={<Records/>}/>
    </Routes>
    </>
  );
}

export default App;
