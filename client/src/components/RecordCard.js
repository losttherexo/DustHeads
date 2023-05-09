function RecordCard({title, image, artist, genre, year, copies}){

  return (
    <div className='flex flex-row border rounded-sm my-2 text-center text-gray-300 w-full'>
      <img src={image} alt={title} className='flex max-h-44 md:max-h-56 md:w-1/3'/>
      <div className='flex flex-col w-full text-left'>
        <p className='border-b px-2 py-1'>{title} by {artist}</p>
        <p className='border-b px-2 py-1'>{genre}, {year}</p>
        <p className='border-b px-2 py-1'>Owners: {copies.length} </p>
      </div>
    </div>
  )
}

export default RecordCard