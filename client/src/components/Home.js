import NavBar from "./NavBar"
import Recommend from "./Recommend"
import { useSelector } from "react-redux"
import SearchBar from "./SearchBar"
import NewFindCard from "./NewFindCard"

function Home(){
    const copies = useSelector(s => s.copies)

    const sortedCopies = copies.sort((a, b) =>
        new Date(b.updated_at) - new Date(a.updated_at)
    )

  const newFindCards = sortedCopies.map((c) => (
        <NewFindCard key={c.id} {...c} />
    ))
      
    return(
        <div className='flex w-full'>
            <div className='flex-col basis-[20%]'>
                    <NavBar/>
            </div>
            <div className='flex-col justify-center mx-6 basis-[55%]'>
                <div className='h-36 border-b flex items-center justify-center'>
                    <h1 className='text-3xl'>
                        maybe an animation or something fun
                    </h1>
                </div>
                <div className='py-6'>
                    {newFindCards}
                </div>
            </div>
            <div className='flex-col basis-[25%]'>
                <SearchBar/>
                {/* <Recommend/> */}
            </div>
        </div>
    )
}
export default Home