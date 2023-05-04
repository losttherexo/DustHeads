import { useState } from "react";
import { useSelector } from "react-redux";

function SearchBar() {
  const records = useSelector(s => s.records)
  const dustheads = useSelector(s => s.dustheads)
  const [searchQuery, setSearchQuery] = useState('')

  function handleChange(e) {
    setSearchQuery(e.target.value.toLowerCase())
  }

  let resultCards = null

  if (searchQuery.trim() !== '') {
    const filteredRecords = records.filter(
      (record) =>
        record.title.toLowerCase().includes(searchQuery) ||
        record.artist.toLowerCase().includes(searchQuery)
    )
    const filteredDustheads = dustheads.filter((dusthead) =>
      dusthead.username.toLowerCase().includes(searchQuery)
    )

    resultCards = [
      ...filteredRecords.map((record) => (
        console.log(record)
      )),
      ...filteredDustheads.map((dusthead) => (
        console.log(dusthead)
      )),
    ]
  }

  return (
    <div>
      <div className='hidden md:flex border-l border-b py-4 justify-center'>
        <input
          type='text'
          placeholder='Search'
          onChange={handleChange}
          className='mx-2 rounded-lg'
        />
      </div>
      <div className='grid grid-cols-3'>{resultCards}</div>
    </div>
  );
}

export default SearchBar;
