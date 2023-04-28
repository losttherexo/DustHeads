import {Routes, Route, useLocation} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRecords } from './reducers/recordSlice';
import Landing from './components/Landing';
import Home from './components/Home';
import DustHead from './components/DustHead';
import Records from './components/Records';
import NavBar from './components/NavBar';


function App() {
  const [user, setUser] = useState(null)

  const updateUser = (user) => setUser(user)

  const dispatch = useDispatch()
    
  useEffect(() => {
      dispatch(fetchRecords())
  }, [dispatch])

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = () => {
    fetch('/session')
    .then(r => {
      if(r.ok){
        r.json().then(user => setUser(user))
      }else {
        setUser(null)
      }
    })
  }

  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  
  if(!user) return(
    <Landing updateUser={updateUser}/>
  )
  return (
    <>
    {!isLandingPage && <NavBar updateUser={updateUser}/>}
    <Routes>
      <Route path='/' element={<Landing updateUser={updateUser}/>}/>
      <Route path='/home' element={<Home updateUser={updateUser}/>}/>
      <Route path='/dusthead' element={<DustHead/>}/>
      <Route path='/records' element={<Records/>}/>
    </Routes>
    </>
  );
}

export default App;
