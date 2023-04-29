import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addRecord } from "../reducers/recordSlice"
import NavBar from "./NavBar"
import RecordCard from "./RecordCard"
import { fetchCopies } from "../reducers/copySlice"

function DustHead({id}) {
    const dispatch = useDispatch()
    const copies = useSelector(s => s.copies)

    useEffect(() => {
        dispatch(fetchCopies())
    },[])

    const filteredCopies = copies.filter((copy) => copy.dusthead_id === id);

    const copyCards = filteredCopies.map((copy) => (
      <RecordCard key={copy.id} title={copy.record.title} />
    ));

    return(
        <div>
            <NavBar/>
            <div>
                profile info
            </div>
            <div>
                crate
                {copyCards}
            </div>
        </div>
    )
}

export default DustHead