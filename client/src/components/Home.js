import NavBar from "./NavBar"
import Recommend from "./Recommend"
import { useSelector } from "react-redux"
import SearchBar from "./SearchBar"
// import { useState } from "react"

function Home(){
    const dustheads = useSelector(s=>s.dustheads)
    const records = useSelector(s=>s.records)
    const user = useSelector(s=>s.user)
    console.log(user)
      
    return(
        <div className='flex w-full'>
            <div className='flex-col basis-[15%]'>
                <NavBar/>
            </div>
            <div className='sm:flex-row justify-center h-screen mx-6 basis-[65%]'>
                i will render copies here
            </div>
            <div className='flex-col basis-[20%]'>
                <SearchBar onSearch/>
                <Recommend/>
            </div>
        </div>
    )
}
export default Home