import NavBar from "./NavBar"
import Recommend from "./Recommend"
import { useSelector } from "react-redux"
import SearchBar from "./SearchBar"
import NewFindCard from "./NewFindCard"
import Marquee from "react-fast-marquee";

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
            <div className='flex-col basis-[10%] md:basis-[20%]'>
                    <NavBar/>
            </div>
            <div className='flex-col justify-center mx-6 basis-[80%] md:basis-[55%]'>
                <div className="h-36 border-b flex items-center justify-center overflow-hidden relative">
                    <Marquee autoFill={true} style={{ position: "absolute"}}>
                        <p className='text-6xl text-gray-300'>yuhhhhhh</p>
                    </Marquee>
                </div>
                <div className='py-6'>
                    {newFindCards}
                </div>
            </div>
            <div className='flex-col basis-[10%] md:basis-[25%]'>
                <SearchBar/>
                {/* <Recommend/> */}
            </div>
        </div>
    )
}
export default Home