import Dusty from '../img/Dusty.png'
import Vinyl from '../img/Vinyl.png'

function Landing() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='grid grid-cols-3 gap-8'>
        <div className='flex justify-center items-center'>
          <img src={Dusty} alt='Dusty' className='bg-transparent' />
        </div>
        <div className='col-span-1 text-center my-auto'>
          <h1 className='text-6xl font-bold mb-8'>
            DUSTHEADS
          </h1>
          <form>
            <label htmlFor='username' className='block mb-2 font-medium'>Username</label>
            <input type='text' id='username' className='w-full p-2 border border-gray-400 rounded-md mb-4' />
            <label htmlFor='password' className='block mb-2 font-medium'>Password</label>
            <input type='password' id='password' className='w-full p-2 border border-gray-400 rounded-md mb-4' />
            <button type='submit' className='px-4 py-2 text-white bg-gray-900 rounded-md hover:bg-gray-800'>
              Log In
            </button>
          </form>
        </div>
        <div className='flex justify-center items-center'>
          <img src={Vinyl} alt='Vinyl' />
        </div>
      </div>
    </div>
  );
}

export default Landing;
