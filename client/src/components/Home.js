import NavBar from "./NavBar"
import Recommend from "./Recommend"

function Home(){

    return(
        <div className='flex'>
            <div className='flex-col'>
                <NavBar/>
            </div>
            <div className='sm:flex-row justify-center h-screen basis-[65%] mx-6'>
                these are our copy cards
            </div>
            <div>
                <Recommend/>
            </div>
        </div>
    )
}
export default Home