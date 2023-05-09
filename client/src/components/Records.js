import { useSelector } from 'react-redux';
import RecordCard from "./RecordCard";
import NavBar from './NavBar';
import Recommend from './Recommend';
import SearchBar from './SearchBar';

function Records() {
    
    const records = useSelector(s => s.records)

    console.log(records)

    records.sort((a, b) => b.copies.length - a.copies.length)

    const recordCards = records.map(r => <RecordCard key={r.id} {...r}/>)

    return(
        <div className='flex'>
            <div className='flex-col basis-[20%]'>
                <NavBar/>
            </div>
            <div className='flex-col justify-center mx-6 basis-[55%]'>
                <div className='h-36 border-b'>
                    <h1 className='py-12 text-6xl font-bold text-center text-gray-300'>What's Poppin?</h1>
                </div>
                <div className='py-6'>
                    {recordCards}   
                </div>
            </div>
            <div className='flex-col basis-[25%]'>
                <SearchBar/>
                {/* <Recommend/> */}
            </div>
        </div>
    )
}

export default Records