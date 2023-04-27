import { useState } from 'react';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from "react-router-dom";
import Dusty from '../img/Dusty.png'
import Vinyl from '../img/Vinyl.png'

function Landing() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const formSchema = yup.object().shape({
    username: yup.string().required('Please enter your username'),
    email: yup.string().email()
  })

  const formik = useFormik({
    initialValues:{
      username:'',
      email:''
    },
    validationSchema:formSchema,
    onSubmit:(values) => {
      // fetch('/login', {
      //   method:'POST',
      //   headers:{'Content-Type':'application/json'},
      //   body: JSON.stringify(values)
      // })
      // .then(r => r.json())
      // .then(user => updateUser(user))
      navigate('/home')
    }
  })


  return (
    <div className='flex flex-col md:flex-row h-screen items-center text-gray-300'>
        <div className='max-w-[60%] md:max-w[70%] lg:max-w[100%]'>
          <img src={Dusty} alt='Dusty'/>
        </div>
        <div className='text-center'>
          <h1 className='text-5xl text[60px] md:text-[80px] font-bold mb-8'>
            DUSTHEADS
          </h1>
          <form onSubmit={formik.handleSubmit} className='flex flex-col items-center'>
            <label htmlFor='username' className='block mb-2 font-medium'>Username</label>
            <input type='text' id='username' value={formik.values.username} onChange={formik.handleChange} className='w-2/3 p-2 border border-gray-400 rounded-md mb-4 text-gray-800' />
            <label htmlFor='password' className='block mb-2 font-medium'>Password</label>
            <input type='password' id='password' className='w-2/3 p-2 border border-gray-400 rounded-md mb-4 text-gray-800' />
            <button type='submit' className='w-2/3 px-4 py-2 text-white bg-gray-900 rounded-md hover:bg-gray-800'>
              Log In
            </button>
          </form>
          <p className='pt-2'>Don't have an account?</p>
          <button onClick={toggleModal} className='font-bold'>Sign up</button>
        </div>
        <div className='max-w-[60%] md:max-w[70%] lg:max-w[100%]'>
          <img src={Vinyl} alt='Vinyl'/>
        </div>
        {isOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded shadow p-4 text-center">
                        <h2>Stop Right There!!!</h2>
                        <p className='mb-2'>You are an impostor and clearly not a lil stinker.</p>
                        <button onClick={toggleModal} className="hover:bg-slate-900 hover:text-white border shadow font-bold px-4 rounded">Try Again</button>
                    </div>
                </div>
            )}
    </div>
  );
}

export default Landing;
