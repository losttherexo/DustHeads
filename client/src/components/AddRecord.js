import NavBar from "./NavBar"
import Recommend from "./Recommend"
import { addCopy } from "../reducers/copySlice"
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { addRecord } from "../reducers/recordSlice"
import { useNavigate } from "react-router-dom"
import SearchBar from "./SearchBar"

function AddRecord(){
    const user = useSelector(s=>s.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    if (!user){
        navigate('/')
    }

    const formSchema = yup.object().shape({
        title: yup.string(),
        artist: yup.string(),
        description: yup.string(),
        genre: yup.string(),
        year: yup.number(),
        image: yup.string()
      })
    
    const findForm = useFormik({
        initialValues: {
            title: '',
            artist: '',
            description:'',
            genre:'',
            year: '',
            image: '',
        },
        validationSchema:formSchema,
        onSubmit: (values, {resetForm}) => {
            const recordObj = {
                title: values.title,
                artist: values.artist,
                genre: values.genre,
                year: values.year,
                image: values.image
            }
            fetch('/records', {
                method:'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(recordObj)
            })
            .then(r=> {
                if(r.ok){
                    r.json().then(r => {
                        dispatch(addRecord(r))
                        const copyObj = {
                            dusthead_id: user.id,
                            record_id: r.id,
                            image: values.image,
                            description:values.description
                        }
                        dispatch(addCopy(copyObj))
                        navigate('/home')
                    })
                }
            })
        }
    })
      
    return(
        <div className='h-screen flex'>
            <div className='flex-col basis-[20%]'>   
                <NavBar/>
            </div>
            <div className='justify-center mx-6 basis-[55%] mb-4 mt-12 text-gray-300'>
                <span className='mx-6  text-6xl'>Add Record</span>
                <div className='flex flex-col pt-28 justify-between'>
                        <form onSubmit={findForm.handleSubmit} className='flex flex-col w-3/4 self-center py-4 text-left'>
                            <label htmlFor='title' className='block mb-1 font-medium'>Record Title</label>
                            <input type='text' name='title' value={findForm.values.title} onChange={findForm.handleChange} className='w-full p-1 border border-gray-400 rounded-md mb-1 text-gray-800'/>
                            <label htmlFor='artist' className='block mb-1 font-medium'>Artist</label>
                            <input type='text' name='artist' value={findForm.values.artist} onChange={findForm.handleChange} className='w-full p-1 border border-gray-400 rounded-md mb-1 text-gray-800'/>
                            <label htmlFor='genre' className='block mb-1 font-medium'>Genre</label>
                            <input type='text' name='genre' value={findForm.values.genre} onChange={findForm.handleChange} className='w-full p-1 border border-gray-400 rounded-md mb-1 text-gray-800'/>
                            <label htmlFor='year' className='block mb-1 font-medium'>Year Released</label>
                            <input type='text' name='year' value={findForm.values.year} onChange={findForm.handleChange} className='w-full p-1 border border-gray-400 rounded-md mb-1 text-gray-800'/>
                            <label htmlFor='image' className='block mb-1 font-medium'>Image URL</label>
                            <input type='text' name='image' value={findForm.values.image} onChange={findForm.handleChange} className='w-full p-1 border border-gray-400 rounded-md mb-1 text-gray-800'/>
                            <label htmlFor='description' className='block mb-1 font-medium'>Description</label>
                            <textarea type='text' name='description' value={findForm.values.description} onChange={findForm.handleChange} className='w-full h-24 p-1 border border-gray-400 rounded-md mb-1 text-gray-800'/>
                            <button type='submit' className='self-center w-1/2 p-1.5 mt-2 text-white bg-gray-900 rounded-md hover:bg-gray-800'>
                                Post Find
                            </button>
                        </form>    
                </div>
            </div>
            <div className='flex-col basis-[25%]'>
                <SearchBar/>
                {/* <Recommend/> */}
            </div>
        </div>
    )
}

export default AddRecord