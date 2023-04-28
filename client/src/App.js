import {Routes, Route, useLocation} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecords } from './reducers/recordSlice';
import { updateUser } from './reducers/userSlice';
import Landing from './components/Landing';
import Home from './components/Home';
import DustHead from './components/DustHead';
import Records from './components/Records';
import NavBar from './components/NavBar';


function App() {
  const dispatch = useDispatch()

  const user = useSelector(state => {
    return state.user
})
    
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
        r.json().then(user => {
          dispatch({type: 'user/set', payload: user})})
      }else {
        dispatch({type: 'user/set', payload: null})
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
      <Route path='/home' element={<Home/>}/>
      <Route path='/dusthead' element={<DustHead/>}/>
      <Route path='/records' element={<Records/>}/>
    </Routes>
    </>
  );
}

export default App;
