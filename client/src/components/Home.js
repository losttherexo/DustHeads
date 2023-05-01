import NavBar from "./NavBar"


function Home(){

    return(
        <div className='flex'>
            <div className='flex-col'>
                <NavBar/>
            </div>
            <div className='sm:flex-row justify-center h-screen'>
                <div className='mx-6'>
                    <span>
                        hello
                    </span>
                </div>
                <div className='mx-6'>
                    <h1>
                        these are our copy cards
                    </h1>
                </div>
                <div className='mx-6'>
                    <span>
                        yes
                    </span>
                </div>
            </div>
        </div>
    )
}
export default Home