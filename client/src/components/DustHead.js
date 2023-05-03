import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import NavBar from "./NavBar"
import CopyCard from "./CopyCard"
import Recommend from "./Recommend"


function DustHead({id}) {
    const navigate = useNavigate()
    const dh = useSelector(s => s.dustheads)
    const user = useSelector(s => s.user)
    const dusthead = dh.find((d) => d.id === id)

    const editProfile = () => {
        navigate('/edit-account')
    };

    const copyCards = user&& (user == dusthead)
    ? user.copies.map((c) => <CopyCard key={c.id} {...c}/>)
    : dusthead.copies.map((c) => <CopyCard key={c.id} {...c}/>)

   return(
        <div className='flex text-gray-300'>
            <div className='flex-col basis-[20%]'>   
                <NavBar/>
            </div>
            <div className='flex-col justify-center mx-6 basis-[55%] h-screen'>
                <div className='flex flex-col h-36 border-b'>
                    <p className='text-6xl'>{user? user.username : dusthead.username}</p>
                    <div className='flex justify-between'>
                        <span className='flex items-center'>
                            {user? user.bio : dusthead.bio}
                        </span>
                        {user&& dusthead.id === user.id && (
                            <button onClick={editProfile} className='mx-2 py-2 px-4 font-bold bg-slate-500 hover:bg-black rounded-3xl'>Edit Profile</button>
                        )}
                    </div>
                </div>
                <div className='py-6 mx-2 grid grid-cols-3'>
                    {copyCards}
                </div>
            </div>
            <div className='flex-col basis-[25%]'>
                <Recommend/>
            </div>
        </div>
    )
} 

export default DustHead