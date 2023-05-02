import React, { useState } from 'react'

function SearchBar(props) {
  const [query, setQuery] = useState('')

  function handleChange(e) {
    setQuery(e.target.value);
  }

  function handleSearch() {
    props.onSearch(query);
  }

  return (
    <div className='hidden md:flex border-l pt-4 justify-center'>
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleChange}
        className='mx-2'
      />
      <button onClick={handleSearch} className='px-2 rounded-lg bg-slate-500 text-gray-300'>Search</button>
    </div>
  );
}

export default SearchBar;
