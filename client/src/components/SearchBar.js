import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate()
  const records = useSelector(s => s.records)
  const dustheads = useSelector(s => s.dustheads)
  const [searchQuery, setSearchQuery] = useState('')

  function handleChange(e) {
    setSearchQuery(e.target.value.toLowerCase())
  }

  let resultCards = null

  if (searchQuery.trim() !== '') {
    const filteredRecords = records.filter(r =>
      r.title.toLowerCase().includes(searchQuery) ||
      r.artist.toLowerCase().includes(searchQuery)
    )
    const filteredDustheads = dustheads.filter(dh =>
      dh.username.toLowerCase().includes(searchQuery)
    )

    resultCards = [
      ...filteredDustheads.map(dh => (
        <div className='text-gray-300 border rounded-lg py-2 my-1'>
          <button onClick={()=>navigate(`/${dh.username}`)} className='mx-2'>{dh.username}</button>
        </div>
      )),
      ...filteredRecords.map(r => (
        <div className='text-gray-300 border rounded-lg py-2 my-1'>
          <button onClick={()=>console.log('maybe show comments')} className='mx-2 text-left'>
            {r.title} by {r.artist}
          </button>
        </div>   
      )),
    ]
  }

  return (
    <div className='hidden md:flex flex-col border-l h-full min-h-screen'>
      <div className='flex border-b py-4 justify-center'>
        <input
          type='text'
          placeholder='Search'
          onChange={handleChange}
          className='rounded-lg px-2'
        />
      </div>
      <div className='flex flex-col my-2 mx-4'>{resultCards}</div>
    </div>
  );
}

export default SearchBar;
