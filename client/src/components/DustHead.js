import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addRecord } from "../reducers/recordSlice"
import NavBar from "./NavBar"
import RecordCard from "./RecordCard"
import { fetchCopies } from "../reducers/copySlice"
import Recommend from "./Recommend"

function DustHead({id}) {
    const dispatch = useDispatch()
    const copies = useSelector(s => s.copies)

    useEffect(() => {
        dispatch(fetchCopies())
    },[])

    const filteredCopies = copies.filter((c) => c.dusthead_id === id);

    const copyCards = filteredCopies.map((c) => (
      <RecordCard key={c.id} title={c.record.title} image={c.record.image}/>
    ));

    return(
        <div className='flex'>
            <div className='flex-col'>   
                <NavBar/>
            </div>
            <div className='flex-col justify-center mx-6 basis-[65%]'>
                <div>
                    profile info
                </div>
                <div>
                    crate
                    {copyCards}
                </div>
            </div>
            <div>
                <Recommend/>
            </div>
        </div>
    )
}

export default DustHead