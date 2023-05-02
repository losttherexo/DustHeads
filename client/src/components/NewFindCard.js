import { useSelector } from 'react-redux'

function NewFindCard({ record, dusthead, dusthead_id, description }) {
  const user = useSelector((state) => state.user)

  const handleEdit = () => {
    console.log("let's get some work done")
  }

  const handleComment = () => {
    console.log('time to comment baby')
  }

  return (
    <div className='border flex flex-row my-4 h-44 text-gray-300 rounded-md justify-between'>
        <div>
            <div className='h-[75%]'>
                <p className='mx-3 py-2 flex flex-row h-[30%]'>
                    @{dusthead.username}                 
                    {user && dusthead_id === user.id && (
                        <button onClick={handleEdit} className=' mx-2'>
                        •••</button>
                    )} 
                </p>
                <p className='mx-3 mt-1 h-[60%]'>{description}</p>
            </div>
            <div className='h-[25%] flex items-center'>
                    <button onClick={handleComment} className='flex justify-center ml-3 px-3 border rounded-lg hover:bg-black'>Comment</button>
            </div>
        </div>
        <div>
            <img src={record.image} alt={record.title} className='flex w-44 justify-center p-3' />
        </div>
    </div>
  )
}

export default NewFindCard
