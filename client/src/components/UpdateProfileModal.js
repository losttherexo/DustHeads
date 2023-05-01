import { useFormik } from 'formik'
import * as yup from 'yup'
import { useState } from 'react'

function UpdateProfileModal({setIsOpen, isOpen}) {

    const toggleModal = () => {
        setIsOpen(!isOpen)
    }

    const formSchema = yup.object().shape({
        username: yup.string().required('Username Required'),
        email: yup.string().email(),
        password: yup.string().required('Password Required')
      })
    
      const formik = useFormik({
        initialValues:{
          username:'',
          email:'',
          password:'',
        },
        validationSchema:formSchema,
        onSubmit:(values) => {
        //   isOpen? dispatch(signupUser(values)) : dispatch(loginUser(values))
        //   if(user){
        //     console.log(user)
        //   }
        }
      })
      
    return(
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center text-black">
            <form onSubmit={formik.handleSubmit} className='flex flex-col items-center bg-white rounded shadow py-4 px-20 text-center'>
            <label htmlFor='username' className='block mb-1 font-medium'>Username</label>
            <input type='text' name='username' value={formik.values.username} onChange={formik.handleChange} className='w-2/3 p-1 border border-gray-400 rounded-md mb-1 text-gray-800' />
            <label htmlFor='email' className='block mb-1 font-medium'>Email</label>
            <input type='text' name='email' value={formik.values.email} onChange={formik.handleChange} className='w-2/3 p-1 border border-gray-400 rounded-md mb-1 text-gray-800' />
            <label htmlFor='password' className='block mb-1 font-medium'>Password</label>
            <input type='password' name='password' value={formik.values.password} onChange={formik.handleChange} className='w-2/3 p-1 border border-gray-400 rounded-md mb-2 text-gray-800' />
            <button type='submit' className='w-2/3 p-1.5 text-white bg-gray-900 rounded-md hover:bg-gray-800'>
              Sign Up
            </button>
            <button onClick={toggleModal}>get me outta here</button>
            </form>      
        </div>
    )
}

export default UpdateProfileModal