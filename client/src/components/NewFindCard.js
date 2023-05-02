function NewFindCard({record, dusthead, description}){
    // console.log(record)

    return (
        <div className='border flex flex-row my-4 h-44 text-gray-300 rounded-md justify-between'>
            <div>
                <p className='mx-3 mt-2'>@{dusthead.username}</p>
                <p className='mx-3 mt-1'>{description}</p>
            </div>
            <div>
                <img src={record.image} alt={record.title} className='flex w-44 justify-center p-3' />
            </div>
        </div>
    )
}

export default NewFindCard