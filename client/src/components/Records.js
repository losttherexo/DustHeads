import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRecord, fetchRecords } from '../reducers/recordSlice';
import NavBar from "./NavBar";
import RecordCard from "./RecordCard";

function Records() {
    const dispatch = useDispatch()
    const [newRecord, setNewRecord] = useState('')

    useEffect(() => {
      dispatch(fetchRecords())
    }, [])
  
    const records = useSelector(state => {
        return state.records
    })
  
    const handleChange = e => {
      setNewRecord(e.target.value)
    }
  
    const handleAddRecord = ()  => {
      dispatch(addRecord({title: newRecord}))
    }

    const recordComponents = records.map(r => <RecordCard key={r.id} image={r.image} artist={r.artist} title={r.title} />)
    

    return(
        <div>
            <NavBar/>
            <h1 className='py-12 text-6xl font-bold text-center text-gray-300'>What's Poppin?</h1>
            <div className='flex flex-col md:flex-row justify-center mx-6'>
                {recordComponents}
            </div>
        </div>
    )
}

export default Records