function RecordCard({title, image, artist}){
  return (
    <div className='border border-white border-opacity-30 rounded-sm p-4 m-2 self-center text-center text-gray-300 w-[300px] md:w-1/4 h-[260px] md:h-[305px]'>
      <img src={image} alt={title} className='flex max-h-44 md:max-h-56 mx-auto'/>
      <div className=''>
        <h1 className='py-1'>{title}</h1>
        <h1 className=''>by {artist}</h1>
      </div>
    </div>
  )
}

export default RecordCard