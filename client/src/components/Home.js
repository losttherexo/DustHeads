import NavBar from "./NavBar"
import Recommend from "./Recommend"
import { useSelector } from "react-redux"
import SearchBar from "./SearchBar"
import NewFindCard from "./NewFindCard"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchUser } from "../reducers/userSlice"
import { fetchCopies } from "../reducers/copySlice"
// import { useState } from "react"

function Home(){
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchUser())
        dispatch(fetchCopies())
    },[dispatch])

    const copies = useSelector(s => s.copies)

    const newFindCards = copies.map(c => <NewFindCard key={c.id} {...c}/>)
      
    return(
        <div className='flex w-full'>
            <div className='flex-col basis-[20%]'>
                    <NavBar/>
            </div>
            <div className='flex-col justify-center mx-6 basis-[55%]'>
                <div className='h-32 border-b flex items-center justify-center'>
                    <h1 className='text-3xl'>
                        maybe an animation or something fun
                    </h1>
                </div>
                <div className='py-6'>
                    {newFindCards}
                </div>
            </div>
            <div className='flex-col basis-[25%]'>
                {/* <SearchBar/> */}
                <Recommend/>
            </div>
        </div>
    )
}
export default Home