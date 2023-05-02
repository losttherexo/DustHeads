import { useSelector } from 'react-redux'

function NewFindCard({ record, dusthead, dusthead_id, description }) {
  const user = useSelector((state) => state.user)

  const handleEdit = () => {
    console.log("let's get some work done")
  }

  return (
    <div className='border flex flex-row my-4 h-44 text-gray-300 rounded-md justify-between'>
        <div>
            <div className='h-[70%]'>
                <p className='mx-3 pt-2'>@{dusthead.username}</p>
                <p className='mx-3 mt-1'>{description}</p>
            </div>
            <div className='h-[30%] flex items-center'>
                {user && dusthead_id === user.id && (
                    <button onClick={handleEdit} className='flex justify-center mx-3 px-3 border rounded-lg hover:bg-black'>Edit</button>
                    )}
            </div>
        </div>
        <div>
            <img src={record.image} alt={record.title} className='flex w-44 justify-center p-3' />
        </div>
    </div>
  )
}

export default NewFindCard
