import React,{ useState, useEffect } from 'react';
import './App.css';

import AddNote from './components/add-note'
import NoteList from './components/note-list'
import SearchNote from './components/search-note'

import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { createNote, updateNote, deleteNote } from './graphql/mutations'

import { listNotes, searchNotes } from './graphql/queries'

import aws_exports from './aws-exports'

Amplify.configure(aws_exports)


function App() {
  const [state, updateState] = useState({ notes: [], search: {}})
  const addNoteHandler = async (note) =>{
    const result = await API.graphql( graphqlOperation( createNote, { input: note }) );
    updateState({ ...state, notes: [...state.notes, result.data.createNote]})
  }
  const updateNoteHandler = async (note) =>{
    const result = await API.graphql(graphqlOperation(updateNote, { input: note }))

    updateState({ ...state, notes: state.notes
                                .map(note =>
                                      note.id === result.data.updateNote.id ? result.data.updateNote : note
    )})
  }

  const deleteNoteHandler = async (note) =>{
    const result = await API.graphql( graphqlOperation(deleteNote, { input: note }) )
    updateState({ ...state, notes: state.notes.filter(note => note.id !== result.data.deleteNote.id )})
  }

  const searchNoteHandler = async (note) => {
    const filter ={
      note: {
        match: note
      }
    }
    debugger
    const result = await API.graphql(graphqlOperation(searchNotes, { filter: filter}))
    if (result.data.searchNotes.items.length > 0){
      updateState({ ...state, search: {note: result.data.searchNotes.items[0]} })
    } else {
      updateState({ ...state, search: {} })
    }
  }



  useEffect( () => {
    const getListNote = async () =>{
      const notes = await API.graphql(graphqlOperation(listNotes))
      updateState( { ...state, notes: notes.data.listNotes.items } )  
    }
    getListNote()
  }, []);

  return (
    <div className="App">
      <AmplifySignOut />
      <header className="App-header">
        <SearchNote searchHandler={ searchNoteHandler } />
        <AddNote addHandler={ addNoteHandler } />
        <NoteList notes={ state.notes } updateHandler={ updateNoteHandler } deleteHandler={ deleteNoteHandler } />
        {
          state.search && state.search.note &&
          <p>{ state.search.note.note }</p>
        }
      </header>
    </div>
  );
}

export default withAuthenticator(App, {includeGreetings: true});
