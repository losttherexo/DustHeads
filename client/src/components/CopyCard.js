
function CopyCard({image, description, record}){

  const handleComments = () => {
    console.log('hi')
  }

  return (
    <div className='relative flex items-center justify-center'>
      <img src={image || record.image} alt={record && record.title}/>
      <button onClick={handleComments} className='h-full w-full absolute text-white bg-black bg-opacity-0 hover:bg-opacity-70 text-opacity-0 hover:text-opacity-100'>
        {description? `"${description}"` : 'Comments'}
      </button>
    </div>
  )
}
  
  export default CopyCard