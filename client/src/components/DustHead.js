import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import NavBar from "./NavBar"
import CopyCard from "./CopyCard"
import Recommend from "./Recommend"
import SearchBar from "./SearchBar"


function DustHead({id}) {
    const navigate = useNavigate()
    const dh = useSelector(s => s.dustheads)
    const user = useSelector(s => s.user)
    const dusthead = dh.find((d) => d.id === id)

    const editProfile = () => {
        navigate('/edit-account')
    };

    const copyCards = user && (user === dusthead)
    ? user.copies.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((c) => <CopyCard key={c.id} {...c}/>)
    : dusthead.copies.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((c) => <CopyCard key={c.id} {...c}/>);


   return(
        <div className='flex text-gray-300'>
            <div className='flex-col basis-[20%]'>   
                <NavBar/>
            </div>
            <div className='flex-col justify-center mx-6 basis-[55%]'>
                <div className='flex flex-col-reverse h-36 border-b'>
                    <div className='flex justify-between h-[35%]'>
                        <span className='flex items-center'>
                            {user? user.bio : dusthead.bio}
                        </span>
                        {user&& dusthead.id === user.id && (
                            <button onClick={editProfile} className='my-2 py-1 px-4 font-bold bg-slate-500 hover:bg-black rounded-3xl'>Edit Profile</button>
                        )}
                    </div>
                    <p className='text-6xl'>{dusthead.username}</p>
                </div>
                <div className='py-6 mx-2 grid grid-cols-3'>
                    {copyCards}
                </div>
            </div>
            <div className='flex-col basis-[25%]'>
                <SearchBar/>
                {/* <Recommend/> */}
            </div>
        </div>
    )
} 

export default DustHead