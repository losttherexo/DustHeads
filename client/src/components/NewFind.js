import NavBar from "./NavBar"
import Recommend from "./Recommend"
import { addCopy } from "../reducers/copySlice"
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import SearchBar from "./SearchBar"
import { addCopyToUser } from "../reducers/userSlice"

function NewFind(){
    const [isOpen, setIsOpen] = useState(false)
    const user = useSelector(s=>s.user)
    const records = useSelector(s=>s.records)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    if (!user){
        navigate('/')
    }

    const formSchema = yup.object().shape({
        title: yup.string(),
        artist: yup.string(),
        description: yup.string(),
        image: yup.string()
      })
    
    const findForm = useFormik({
        initialValues:{
            title: '',
            artist: '',
            description:'',
            image: '',
        },
        validationSchema:formSchema,
        onSubmit: (values, {resetForm}) => {
            const record = records.find(record => 
                record.title.toLowerCase() === values.title.toLowerCase() &&
                record.artist.toLowerCase() === values.artist.toLowerCase()
            )
            if (!record) {
                setIsOpen(!isOpen)
            } else{
                const updatedValues = {
                    description: values.description,
                    dusthead_id: user.id,
                    record_id: record.id,
                    image: values.image || record.image
                }
                dispatch(addCopy(updatedValues))
                dispatch(addCopyToUser(updatedValues))
                resetForm()
                navigate('/home')
            }
        }
    })
      
    return(
        <div className='h-screen flex'>
            <div className='flex-col basis-[20%]'>   
                <NavBar/>
            </div>
            <div className='justify-center mx-6 basis-[55%] mb-4 mt-12 text-gray-300'>
                <span className='mx-6  text-6xl'>New Find?</span>
                <div className='flex flex-col pt-28 justify-between'>
                        <form onSubmit={findForm.handleSubmit} className='flex flex-col w-3/4 self-center py-4 text-left'>
                            <label htmlFor='title' className='block mb-1 font-medium'>Record Title</label>
                            <input type='text' name='title' value={findForm.values.title} onChange={findForm.handleChange} className='w-full p-1 border border-gray-400 rounded-md mb-1 text-gray-800'/>
                            <label htmlFor='artist' className='block mb-1 font-medium'>Artist</label>
                            <input type='text' name='artist' value={findForm.values.artist} onChange={findForm.handleChange} className='w-full p-1 border border-gray-400 rounded-md mb-1 text-gray-800'/>
                            <label htmlFor='description' className='block mb-1 font-medium'>Description</label>
                            <textarea type='text' name='description' value={findForm.values.description} onChange={findForm.handleChange} className='w-full h-24 p-1 border border-gray-400 rounded-md mb-1 text-gray-800'/>
                            <button type='submit' className='self-center w-1/2 p-1.5 mt-2 text-white bg-gray-900 rounded-md hover:bg-gray-800'>
                                Post Find
                            </button>
                        </form>    
                </div>
                {isOpen && (
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center text-black">
                        <div className='rounded py-8 px-16 bg-slate-900 flex flex-col self-center text-center text-gray-300'>
                            <h1 className='py-2 font-bold text-lg'>Record Not Found!</h1>
                            <p>It's okay! Mind adding a little more information to help the homies out?</p>
                            <button onClick={()=> navigate('/add-record')} className='self-center w-1/2 p-1.5 mt-4 bg-slate-500 rounded-md hover:bg-gray-800'>Sure Dude!</button>
                            <button onClick={()=>setIsOpen(!isOpen)} className='self-center w-1/2 p-1.5 mt-4 bg-slate-500 rounded-md hover:bg-gray-800'>Nevermind</button> 
                        </div>
                    </div>
                )}
            </div>
            <div className='flex-col basis-[25%]'>
                <SearchBar/>
                {/* <Recommend/> */}
            </div>
        </div>
    )
}

export default NewFind