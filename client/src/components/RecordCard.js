function RecordCard({title, image, artist}){
  return (
    <div className='border border-white border-opacity-30 rounded-sm p-4 m-2 md:m-6s self-center text-center text-gray-300 w-[300px] h-[300px]'>
      <img src={image} alt={title} className='flex max-h-56 mx-auto'/>
      <div className=''>
        <h1 className='pt-2'>{title} by {artist}</h1>
      </div>
    </div>
  )
}

export default RecordCard