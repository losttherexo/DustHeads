import NavBar from "./NavBar"
import Recommend from "./Recommend"

function EditProfile() {
    return(
        <div className='flex text-gray-300'>
            <div className='flex-col basis-[15%]'>   
                <NavBar/>
            </div>
            <div className='flex-col justify-center mx-6 basis-[65%]'>
                <span>
                    hey gurl hey what's up
                </span>
            </div>
            <div className='flex-col basis-[20%]'>
                <Recommend/>
            </div>
        </div>
    )
}

export default EditProfile