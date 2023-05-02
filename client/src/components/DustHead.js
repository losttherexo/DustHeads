import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import NavBar from "./NavBar"
import CopyCard from "./CopyCard"
import { fetchCopies } from "../reducers/copySlice"
import Recommend from "./Recommend"
import { fetchUser } from "../reducers/userSlice"
import { fetchDustHeads } from "../reducers/dustheadSlice"

function DustHead({id}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const copies = useSelector(s => s.copies)
    const dh = useSelector(s => s.dustheads)
    const user = useSelector(s => s.user)
    const dusthead = dh.find((d) => d.id === id)

    useEffect(() => {
        dispatch(fetchCopies())
        dispatch(fetchUser())
        dispatch(fetchDustHeads())
    },[])

    const editProfile = () => {
        navigate('/edit-account')
      };

    const filteredCopies = copies.filter((c) => c.dusthead_id === id)

    const copyCards = filteredCopies.map((c) => (
        <CopyCard key={c.id} {...c}/>
));

   return(
        <div className='flex text-gray-300'>
            <div className='flex-col basis-[20%]'>   
                <NavBar/>
            </div>
            <div className='flex-col justify-center mx-6 basis-[55%] h-screen'>
                <div className='flex flex-col mx-6 mb-4 mt-12'>
                    <span className='text-6xl'>{dusthead.username}</span>
                    <div className='flex justify-between'>
                        <span className='flex items-center'>
                            {dusthead.bio}
                        </span>
                        {dusthead.id === user.id && (
                            <button onClick={editProfile} className='mx-2 py-2 px-4 font-bold bg-slate-500 hover:bg-black rounded-3xl'>Edit Profile</button>
                        )}
                    </div>
                </div>
                <div className='mx-6 grid grid-cols-3'>
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