import { useSelector } from 'react-redux';
import RecordCard from "./RecordCard";
import NavBar from './NavBar';
import Recommend from './Recommend';

function Records() {
    
    const records = useSelector(s => s.records)

    const recordCards = records.map(
        r => <RecordCard 
            key={r.id}
            image={r.image} 
            artist={r.artist} 
            title={r.title} 
        />
    )

    return(
        <div className='flex'>
            <div className='flex-col'>
                <NavBar/>
            </div>
            <div className='flex-col justify-center mx-6 basis-[65%]'>
                <h1 className='py-12 text-6xl font-bold text-center text-gray-300'>What's Poppin?</h1>
                {recordCards}
            </div>
            <div>
                <Recommend/>
            </div>

        </div>
    )
}

export default Records