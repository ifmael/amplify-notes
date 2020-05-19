import React from 'react';
import NoteItem from './note-item'

const NoteList = ({ notes, updateHandler, deleteHandler }) => {
  return (
    <div>
      { notes && notes.length > 0 &&
        notes.map(note =>
          <NoteItem
            key={ note.id }
            note={ note }
            updateHandler={ updateHandler }
            deleteHandler={ deleteHandler }
          />
        )
      }
    </div>
  )
}

export default NoteList


