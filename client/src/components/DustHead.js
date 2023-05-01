import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import NavBar from "./NavBar"
import CopyCard from "./CopyCard"
import { fetchCopies } from "../reducers/copySlice"
import Recommend from "./Recommend"

function DustHead({id}) {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch()
    const copies = useSelector(s => s.copies)
    const dh = useSelector(s => s.dustheads)
    const dusthead = dh.find((d) => d.id === id);

    useEffect(() => {
        dispatch(fetchCopies())
    },[])

    const editProfile = () => {
        setIsOpen(!isOpen);
        console.log('yes')
      };

    const filteredCopies = copies.filter((c) => c.dusthead_id === id);

    const copyCards = filteredCopies.map((c) => (
      <CopyCard key={c.id} title={c.record.title} image={c.record.image}/>
    ));

   return(
        <div className='flex text-gray-300'>
            <div className='flex-col basis-[15%]'>   
                <NavBar/>
            </div>
            <div className='flex-col justify-center mx-6 basis-[65%]'>
                <div className='flex flex-col mx-6 mb-4 mt-12'>
                    <span className='text-6xl'>{dusthead.username}</span>
                    <div className='flex justify-between'>
                        <span className='flex items-center'>
                            {dusthead.bio? dusthead.bio : 'welp here goes nothing'}
                        </span>
                        <button onClick={editProfile} className='mx-2 py-2 px-4 font-bold bg-slate-500 hover:bg-black rounded-3xl'>Edit Profile</button>
                    </div>
                </div>
                <div className='mx-6 grid grid-cols-3'>
                    {copyCards}
                </div>
            </div>
            <div className='flex-col basis-[20%]'>
                <Recommend/>
            </div>
            
        </div>
    )
} 

export default DustHead