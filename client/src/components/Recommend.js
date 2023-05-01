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
      <div className='hidden md:flex h-full border-l py-4 text-gray-300 flex-col'>
        <div className='mx-6 flex md:justify-between items-center flex-col'>
        <div className='p-4'>
            there will be a whole bunch of information here i swear
        </div>
        </div>
      </div>
    );
  }
  
  export default NavBar;
  