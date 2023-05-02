import NavBar from "./NavBar"
import Recommend from "./Recommend"
import { addCopy } from "../reducers/copySlice"
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"

function NewFind(){
    const user = useSelector(s=>s.user)
    const records = useSelector(s=>s.records)
    const dispatch = useDispatch()

    const formSchema = yup.object().shape({
        title: yup.string(),
        artist: yup.string(),
        description: yup.string(),
      })
    
    const form = useFormik({
        initialValues:{
            title: '',
            artist: '',
            description:'',
            image:'',
        },
        validationSchema:formSchema,
        onSubmit: (values, {resetForm}) => {
            const record = records.find(record => 
                record.title.toLowerCase() === values.title.toLowerCase() &&
                record.artist.toLowerCase() === values.artist.toLowerCase()
            )
            if (!record) {
                console.log('no record')
                return
              }
            const updatedValues = {
                description: values.description,
                dusthead_id: user.id,
                record_id: record.id,
                image: values.image
            }
            dispatch(addCopy(updatedValues));
            resetForm();
        }
    })
      
    return(
        <div className='h-screen flex text-gray-300'>
            <div className='flex-col basis-[15%]'>   
                <NavBar/>
            </div>
            <div className='justify-center mx-6 basis-[65%] mb-4 mt-12'>
                <span className='mx-6  text-6xl'>New Find?</span>
                <div className='flex flex-col pt-28 justify-between'>
                        <form onSubmit={form.handleSubmit} className='flex flex-col w-3/4 self-center py-4 text-left'>
                            <label htmlFor='title' className='block mb-1 font-medium'>Record Title</label>
                            <input type='text' name='title' value={form.values.title} onChange={form.handleChange} className='w-full p-1 border border-gray-400 rounded-md mb-1 text-gray-800'/>
                            <label htmlFor='artist' className='block mb-1 font-medium'>Artist</label>
                            <input type='text' name='artist' value={form.values.artist} onChange={form.handleChange} className='w-full p-1 border border-gray-400 rounded-md mb-1 text-gray-800'/>
                            <label htmlFor='description' className='block mb-1 font-medium'>Description</label>
                            <textarea type='text' name='description' value={form.values.description} onChange={form.handleChange} className='w-full h-24 p-1 border border-gray-400 rounded-md mb-1 text-gray-800'/>
                            <button type='submit' className='self-center w-1/2 p-1.5 mt-2 text-white bg-gray-900 rounded-md hover:bg-gray-800'>
                                Post Find
                            </button>
                        </form>    
                </div>
                
            </div>
            <div className='flex-col basis-[20%]'>
                <Recommend/>
            </div>
        </div>
    )
}

export default NewFind