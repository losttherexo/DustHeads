import NavBar from "./NavBar"
import Recommend from "./Recommend"
import { useSelector } from "react-redux"
import SearchBar from "./SearchBar"

function Home(){


    return(
        <div className='flex w-full'>
            <div className='flex-col basis-[15%]'>
                <NavBar/>
            </div>
            <div className='sm:flex-row justify-center h-screen mx-6 basis-[65%]'>
                these are our copy cards
            </div>
            <div className='flex-col basis-[20%]'>
                <SearchBar/>
                <Recommend/>
            </div>
        </div>
    )
}
export default Home