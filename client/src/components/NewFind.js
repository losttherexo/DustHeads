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
        recordID: yup.number(),
        description: yup.string(),
        userID: yup.number(),
      })
    
    const form = useFormik({
        initialValues:{
            recordID:'',
            description:'',
            userID: user && user.id,
        },
        validationSchema:formSchema,
        onSubmit: (values, {resetForm}) => {
            const updatedValues = {
                ...values,
            };
            for (const key in values) {
                if (values[key] === form.initialValues[key]) {
                    delete updatedValues[key];
                }
            }
            console.log('hello?')
            // dispatch(addCopy(updatedValues));
            resetForm();
            // navigate(`/${user.username}`)
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
                            <label htmlFor='recordID' className='block mb-1 font-medium'>Record/Artist</label>
                            <input
                                type='text'
                                name='recordID'
                                value={form.values.recordID}
                                onChange={form.handleChange}
                                onBlur={() => {
                                    const record = records.find(
                                    (r) =>
                                        r.title.toLowerCase() === form.values.recordID.toLowerCase() ||
                                        r.artist.toLowerCase() === form.values.recordID.toLowerCase()
                                    );
                                    if (record) {
                                    form.setFieldValue('recordID', record.id);
                                    } else {
                                    form.setFieldValue('recordID', '');
                                    }
                                }}
                                className='w-full p-1 border border-gray-400 rounded-md mb-1 text-gray-800'
                            />
                            <label htmlFor='description' className='block mb-1 font-medium'>Description</label>
                            <textarea type='text' name='description' value={form.values.description} onChange={form.handleChange} className='w-full h-24 p-1 border border-gray-400 rounded-md mb-1 text-gray-800'/>
                            <button type='submit' className='self-center w-1/2 p-1.5 mt-2 text-white bg-gray-900 rounded-md hover:bg-gray-800'>
                                Save Changes
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