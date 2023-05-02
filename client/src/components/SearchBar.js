function SearchBar({onSearch}) {

  function handleChange(e) {
    // onSearch(e.target.value)
  }

  return (
    <div className='hidden md:flex border-l pt-4 justify-center'>
      <input
        type="text"
        placeholder="Search"
        onChange={handleChange}
        className='mx-2'
      />
    </div>
  );
}

export default SearchBar;
