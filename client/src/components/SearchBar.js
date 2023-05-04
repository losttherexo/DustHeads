import { useSelector } from "react-redux";

function SearchBar() {
  const records = useSelector(s=>s.records)
  const dustheads = useSelector(s=>s.dustheads)

  function handleChange(e) {
  }

  return (
    <div className='hidden md:flex border-l border-b py-4 justify-center'>
      <input
        type='text'
        placeholder='Search'
        onChange={handleChange}
        className='mx-2 rounded-lg'
      />
    </div>
  );
}

export default SearchBar;
