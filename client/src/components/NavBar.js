import { useNavigate, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userSlice'
import Dusty from '../img/Dusty.png'

function NavBar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((s) => s.user)
  
    const handleLogout = () => {
      dispatch(logoutUser())
      navigate('/')
    }

    const handleNewFind = () => {
      navigate('/new-find')
    }
  
    return (
      <div className='hidden md:flex h-full border-r py-2 text-gray-300 flex-col text-center'>
        <div className='mx-6 flex md:justify-between items-center flex-col'>
          <img src={Dusty} alt='Dusty'/>
          <ul className='flex text-3xl flex-col text-left'>
            <li className='pb-2'>
              <NavLink to='/home'>Home</NavLink>
            </li>
            <li className='pb-2'>
              <NavLink to='/records'>Records</NavLink>
            </li>
            {user && (
              <li className='pb-2'>
                <NavLink to={`/${user.username}`}>Profile</NavLink>
              </li>              
            )}
          </ul>
          <button
            onClick={handleNewFind}
            className='rounded-3xl my-4 py-2 px-4 text-md font-bold bg-slate-500 hover:bg-black'
          >
            New Find
          </button>
          <button
            onClick={handleLogout}
            className='border rounded-sm my-8 text-xl py-1 px-4 hover:text-white hover:bg-black absolute bottom-0'
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
  
  export default NavBar;
  