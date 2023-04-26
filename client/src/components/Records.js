import NavBar from "./NavBar"
import RecordCard from "./RecordCard"

function Records({records}) {

    const recordCards = records.map(record => <RecordCard key={record.id} image={record.image} title={record.title} artist={record.artist}/>)


    return(
        <div>
            <NavBar/>
            <h1 className='py-12 text-6xl font-bold text-center text-gray-300'>What's Poppin?</h1>
            <div className='flex flex-col md:flex-row justify-center mx-6'>
                {recordCards}
            </div>
        </div>
    )
}

export default Records