import React,{ useState } from 'react';

const NoteItem = ({ note, updateHandler, deleteHandler}) => {
  const [infoNote, setNoteInfo] = useState(note)
  const updateValue = (event) =>{
    setNoteInfo(
      {
        ...infoNote,
        note: event.target.value
      }
    )
  }
  
  return (
    <div>
      <input 
        type="text"
        value={ infoNote.note }
        onChange={ updateValue }
      />
      <button
        onClick={ ()=> deleteHandler({ id: infoNote.id }) }
      > Delete</button>
      <button 
        onClick={ ()=> updateHandler({ id: infoNote.id , note: infoNote.note }) }
      > 
        Save
      </button>
    </div>
  )
}

export default NoteItem