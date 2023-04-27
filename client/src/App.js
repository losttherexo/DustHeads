import {Routes, Route, useLocation} from 'react-router-dom';
import { useState, useEffect } from 'react';
import Landing from './components/Landing';
import Home from './components/Home';
import DustHead from './components/DustHead';
import Records from './components/Records';
import NavBar from './components/NavBar';


function App() {
  const [user, setUser] = useState(null)

  const updateUser = (user) => setUser(user)

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



  // if(!user) return(
  //   <Landing updateUser={updateUser}/>
  // )

  const location = useLocation();
  const isLandingPage = location.pathname === '/';

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
