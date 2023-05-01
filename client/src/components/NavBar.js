import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, logoutUser } from "../reducers/userSlice";

function NavBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((s) => s.user);
  
    const handleLogout = () => {
      dispatch(logoutUser());
      navigate("/");
    };
  
    return (
      <div className='h-full border-r py-4 text-gray-300 flex-col'>
        <div className='mx-6 flex md:justify-between items-center flex-col'>
          <button
            onClick={handleLogout}
            className='border rounded-sm my-4 py-1 px-3 hover:text-black hover:bg-slate-500'
          >
            Logout
          </button>
          <ul className="hidden md:flex text-2xl flex-col">
            <li className="p-4">
              <NavLink to="/records">records</NavLink>
            </li>
            <li className="p-4">
              <NavLink to="/home">home</NavLink>
            </li>
            {user && (
              <li className="p-4">
                <NavLink to={`/${user.username}`}>profile</NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
  
  export default NavBar;
  