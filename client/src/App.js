import {Routes, Route} from 'react-router-dom';
import { useState, useEffect } from 'react';
import Landing from './components/Landing';
import Home from './components/Home';
import DustHead from './components/DustHead';
import Records from './components/Records';
import NavBar from './components/NavBar';


function App() {
  const [user, setUser] = useState(null)
  const [isNav, setIsNav] = useState(false)
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

  const handleNav = () => {
    setIsNav(!isNav)
  }

  // if(!user) return(
  //   <Landing updateUser={updateUser}/>
  // )

  return (
    <>
    {isNav? <NavBar updateUser={updateUser} handleNav={handleNav}/> : null}
    <Routes>
      <Route path='/' element={<Landing updateUser={updateUser} handleNav={handleNav}/>}/>
      <Route path='/home' element={<Home updateUser={updateUser}/>}/>
      <Route path='/dusthead' element={<DustHead/>}/>
      <Route path='/records' element={<Records/>}/>
    </Routes>
    </>
  );
}

export default App;
