import { useSelector, useDispatch } from 'react-redux'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useState } from 'react'
import { fetchCopies, updateCopy } from '../reducers/copySlice'
import { useNavigate } from 'react-router-dom'

function NewFindCard({id, record, dusthead, dusthead_id, description }) {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  const toggleEdit = () => {
    setIsOpen(!isOpen)
  }

  const formSchema = yup.object().shape({
    description: yup.string()
  })

  const form = useFormik({
    initialValues:{
      description:'',
    },
    validationSchema:formSchema,
    onSubmit: (values, {resetForm}) => {
      const updatedValues = {
        ...values,
        id: id
      }
      for (const key in values) {
        if (values[key] === form.initialValues[key]) {
          delete updatedValues[key]
        }
      }
      toggleEdit()
      resetForm()
      dispatch(updateCopy(updatedValues))
      dispatch(fetchCopies())
      navigate('/home')
    }
  })

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
                        <button onClick={toggleEdit} className=' mx-2'>
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
        {isOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center text-black">
            <form onSubmit={form.handleSubmit} className='flex flex-col items-center bg-white rounded shadow py-4 px-20 text-center'>
              <label htmlFor='description' className='block mb-1 font-medium'>Description</label>
              <textarea type='text' name='description' value={form.values.description} onChange={form.handleChange} className='w-2/3 p-1 border border-gray-400 rounded-md mb-1 text-gray-800' />
              <button type='submit' className='w-2/3 p-1.5 text-white bg-gray-900 rounded-md hover:bg-gray-800'>
                Edit
              </button>
              <button onClick={toggleEdit}>Nevermind</button>
            </form>      
          </div>
            )}
    </div>
    
  )
}

export default NewFindCard
