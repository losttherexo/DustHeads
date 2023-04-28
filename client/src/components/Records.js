import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecords } from '../reducers/recordSlice';
import RecordCard from "./RecordCard";

function Records() {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(fetchRecords())
    }, [dispatch])
    
    const records = useSelector(state => {
        return state.records
    })

    const recordCards = records.map(
        r => <RecordCard 
            key={r.id}
            image={r.image} 
            artist={r.artist} 
            title={r.title} 
        />
    )

    return(
        <div>
            <h1 className='py-12 text-6xl font-bold text-center text-gray-300'>What's Poppin?</h1>
            <div className='flex flex-wrap md:flex-row justify-center mx-6'>
                {recordCards}
            </div>
        </div>
    )
}

export default Records