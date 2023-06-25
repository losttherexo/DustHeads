import { Routes, Route} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecords } from './reducers/recordSlice';
import { fetchUser } from './reducers/userSlice';
import Landing from './components/Landing';
import Home from './components/Home';
import DustHead from './components/DustHead';
import Records from './components/Records';
import { fetchDustHeads } from './reducers/dustheadSlice';
import EditProfile from './components/EditProfile';
import NewFind from './components/NewFind';
import { fetchCopies } from './reducers/copySlice';
import AddRecord from './components/AddRecord';
import { fetchComments } from './reducers/commentSlice';

function App() {
  const dispatch = useDispatch()
  const dustheads = useSelector(s => s.dustheads)

  useEffect(() => {
    dispatch(fetchUser())
    dispatch(fetchDustHeads())
    dispatch(fetchRecords())
    dispatch(fetchCopies())
    dispatch(fetchComments())
  },[]) 

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/records' element={<Records/>}/>
        <Route path='/edit-account' element={<EditProfile/>}/>
        <Route path='/new-find' element={<NewFind/>}/>
        <Route path='/add-record' element={<AddRecord/>}/>
        {dustheads.map((dusthead) => (
          <Route 
            key={dusthead && dusthead.id} 
            path={`/${dusthead.username}`} 
            element={<DustHead id={dusthead.id}/>} 
          />
        ))}
      </Routes>
    </>
  );
}

export default App;
