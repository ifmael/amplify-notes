import React,{ useState } from 'react';

const AddNote = ({ addHandler }) => {
  const [ noteState, updateNoteState ] = useState( {note: ''} )
  const addNote = () => {
    addHandler(noteState)
    updateNoteState( { note: '' } )
  }

  return (
    <div>
      <input type="text" 
            placeholder="New Note"
            value={ noteState.note }
            onChange={ (event) =>{ updateNoteState( {note: event.target.value} ) }}
      />
      <button onClick={ addNote } > Add note </button>
    </div>
  )
}

export default AddNote