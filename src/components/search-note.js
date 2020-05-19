import React,{ useState } from 'react';

const SearchNote = ({ searchHandler }) => {
  const [searchValue, setSearchValue] = useState({ note: ''})
  
  return (
    <div>
      <input type="text" value={ searchValue.note } onChange={ (event)=> setSearchValue({note: event.target.value})} />
      <button onClick={ ()=>searchHandler(searchValue)}>Search</button>
    </div>
  )
}

export default SearchNote


