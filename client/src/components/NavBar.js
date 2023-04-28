import { useNavigate, NavLink } from "react-router-dom";

function NavBar({updateUser}){
    const navigate = useNavigate()
    const handleLogout = () => {
        fetch('/logout',{
            method: 'DELETE'
        })
        .then(r => {
            if(r.ok){
                updateUser(null)
                navigate('/')
            }
        }) 
    }    

    return(
        <div className='border-b mx-6 py-4 text-gray-300'>
            <div className='mx-6 flex md:justify-between items-center'>
                <button onClick={handleLogout} className='border rounded-sm py-1 px-3 hover:text-black hover:bg-slate-500'>
                    Logout
                </button>
                <ul className='hidden md:flex text-2xl'>
                    <li className='p-4'><NavLink to='/records'>records</NavLink></li>
                    <li className='p-4'><NavLink to='/home'>home</NavLink></li>
                    <li className='p-4'><NavLink to='/dusthead'>profile</NavLink></li>
                </ul>
            </div>
        </div>
    )
}

export default NavBar