function RecordCard({title, image, artist}){
  return (
    <div className='border border-white border-opacity-30 rounded-sm p-4 m-2 self-center text-center text-gray-300 md:w-1/4 '>
      <img src={image} alt={title} className='flex max-h-44 md:max-h-56 mx-auto'/>
    </div>
  )
}

export default RecordCard