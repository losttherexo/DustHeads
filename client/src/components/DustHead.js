import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import NavBar from "./NavBar"
import RecordCard from "./RecordCard"
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
      <RecordCard key={c.id} title={c.record.title} image={c.record.image}/>
    ));

    return(
        <div className='flex text-gray-300'>
            <div className='flex-col basis-[15%]'>   
                <NavBar/>
            </div>
            <div className='flex-col justify-center mx-6 basis-[65%]'>
                <div>
                    {dusthead.username}
                </div>
                <div>
                    crate
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