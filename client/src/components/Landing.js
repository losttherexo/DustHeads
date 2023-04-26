import Dusty from '../img/Dusty.png'
import Vinyl from '../img/Vinyl.png'

function Landing() {

  return (
    <div className='flex flex-col md:flex-row h-screen items-center text-gray-300'>
        <div className=''>
          <img src={Dusty} alt='Dusty'/>
        </div>
        <div className='text-center'>
          <h1 className='text-5xl md:text-[80px] font-bold mb-8'>
            DUSTHEADS
          </h1>
          <form className='flex flex-col items-center'>
            <label htmlFor='username' className='block mb-2 font-medium'>Username</label>
            <input type='text' id='username' className='w-2/3 p-2 border border-gray-400 rounded-md mb-4 text-gray-800' />
            <label htmlFor='password' className='block mb-2 font-medium'>Password</label>
            <input type='password' id='password' className='w-2/3 p-2 border border-gray-400 rounded-md mb-4 text-gray-800' />
            <button type='submit' className='w-2/3 px-4 py-2 text-white bg-gray-900 rounded-md hover:bg-gray-800'>
              Log In
            </button>
          </form>
        </div>
        <div className=''>
          <img src={Vinyl} alt='Vinyl'/>
        </div>
    </div>
  );
}

export default Landing;
