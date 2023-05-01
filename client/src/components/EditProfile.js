import NavBar from "./NavBar"
import Recommend from "./Recommend"
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from 'formik'
import { updateDustHead } from "../reducers/userSlice"
import * as yup from 'yup'



function EditProfile() {
    const dispatch = useDispatch()
    const user = useSelector(s => s.user)

    const formSchema = yup.object().shape({
        bio: yup.string(),
        username: yup.string(),
        email: yup.string(),
        password: yup.string()
      })
    
    const form = useFormik({
        initialValues:{
            bio:'',
            username:'',
            email:'',
            password:'',
        },
        validationSchema:formSchema,
        onSubmit: (values, {resetForm}) => {
            const updatedValues = {
              ...values,
              id: user.id
            };
            for (const key in values) {
              if (values[key] === form.initialValues[key]) {
                delete updatedValues[key];
              }
            }
            dispatch(updateDustHead(updatedValues));
            resetForm();
          }
      })

    const handleDelete = () => {
        console.log('bye')
      }

    return(
        <div className='h-screen flex text-gray-300'>
            <div className='flex-col basis-[15%]'>   
                <NavBar/>
            </div>
            <div className='justify-center mx-6 basis-[65%] mb-4 mt-12'>
                <span className='mx-6  text-6xl'>Settings</span>
                <div className='flex flex-col pt-28 justify-between'>
                        <form onSubmit={form.handleSubmit} className='flex flex-col w-3/4 self-center py-4 text-left'>
                            <label htmlFor='bio' className='block mb-1 font-medium'>Bio</label>
                            <textarea type='text' name='bio' value={form.values.bio} onChange={form.handleChange} className='w-full h-24 p-1 border border-gray-400 rounded-md mb-1 text-gray-800'/>
                            <label htmlFor='username' className='block mb-1 font-medium'>Username</label>
                            <input type='text' name='username' value={form.values.username} onChange={form.handleChange} className='w-full p-1 border border-gray-400 rounded-md mb-1 text-gray-800' />
                            <label htmlFor='email' className='block mb-1 font-medium'>Email</label>
                            <input type='text' name='email' value={form.values.email} onChange={form.handleChange} className='w-full p-1 border border-gray-400 rounded-md mb-1 text-gray-800' />
                            <label htmlFor='password' className='block mb-1 font-medium'>Password</label>
                            <input type='password' name='password' value={form.values.password} onChange={form.handleChange} className='w-full p-1 border border-gray-400 rounded-md mb-2 text-gray-800' />
                            <button type='submit' className='self-center w-1/2 p-1.5 mt-2 text-white bg-gray-900 rounded-md hover:bg-gray-800'>
                                Save Changes
                            </button>
                        </form>
                        <div className='flex flex-col w-3/4 self-center'>
                            <button onClick={handleDelete} className='self-center w-1/2 p-1.5 mt-2 text-white bg-red-700 rounded-md hover:bg-red-800'>
                                Delete Account
                            </button>
                        </div>      
                </div>
            </div>
            <div className='flex-col basis-[20%]'>
                <Recommend/>
            </div>
        </div>
    )
}

export default EditProfile