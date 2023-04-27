import { useNavigate } from "react-router-dom";

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
            <button onClick={handleLogout} className='border rounded-sm py-1 px-3 hover:text-black hover:bg-slate-500'>
                Logout
            </button>
        </div>
    )
}

export default NavBar