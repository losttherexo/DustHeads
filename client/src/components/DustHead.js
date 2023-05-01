import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import NavBar from "./NavBar"
import CopyCard from "./CopyCard"
import { fetchCopies } from "../reducers/copySlice"
import Recommend from "./Recommend"

function DustHead({id}) {
    const dispatch = useDispatch()
    const copies = useSelector(s => s.copies)
    const dh = useSelector(s => s.dustheads)
    const dusthead = dh.find((d) => d.id === id);

    useEffect(() => {
        dispatch(fetchCopies())
    },[])

    const filteredCopies = copies.filter((c) => c.dusthead_id === id);

    const copyCards = filteredCopies.map((c) => (
      <CopyCard key={c.id} title={c.record.title} image={c.record.image}/>
    ));

    console.log(dusthead.bio)

    return(
        <div className='flex text-gray-300'>
            <div className='flex-col basis-[15%]'>   
                <NavBar/>
            </div>
            <div className='flex-col justify-center mx-6 basis-[65%]'>
                <div className='flex flex-col mx-2 mt-12'>
                    <span className='text-6xl'>{dusthead.username}</span>
                    <span className='my-2'>
                        {dusthead.bio? dusthead.bio : 'welp here goes nothing'}
                    </span>
                </div>
                <div>
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