import { useState } from "react"

function CopyCard({record, description}){
  const [showDescription, setShowDescription] = useState(false)

  return (
    <div className='relative flex items-center justify-center'
      onMouseEnter={() => setShowDescription(true)}
      onMouseLeave={() => setShowDescription(false)}
    >
      <img src={record.image} alt={record.title}/>
      {showDescription && <p className='absolute text-white px-4 py-2 rounded-md'>{description}</p>}
    </div>
  )
}
  
  export default CopyCard