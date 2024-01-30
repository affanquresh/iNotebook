import { useState } from 'react'
import NoteContext from './NoteContex'

const NoteState = (props) => {
  const host = 'http://localhost:5000'
  const noteInitial = []
  const [notes, setNotes] = useState(noteInitial)

  //GET ALL NOTES
  const getNotes = async () => {
    //CALL API
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    })
    const json = await response.json()
    // console.log(json)
    setNotes(json)
  }

  //addNotes
  const addNote = async (title, description, tag) => {
    // CALL API
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    })
    const json = await response.json()
    console.log(json)
    console.log('affing a new note')
    const note = json
    setNotes(notes.concat(note))
  }

  //delete note
  const deleteNote = async (id) => {
    //CALL API
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    })
    const json = response.json()
    console.log(json)

    const newNotes = notes.filter((note) => {
      return note._id !== id
    })
    setNotes(newNotes)
  }

  //edit note
  const editNote = async (id, title, description, tag) => {
    //CALL API
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    })
    const json = response.json()
    console.log(json)
    //logic to edit

    let newNotes = JSON.parse(JSON.stringify(notes))

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index]
      if (element._id === id) {
        newNotes[index].title = title
        newNotes[index].description = description
        newNotes[index].tag = tag
        break
      }
    }
    console.log(newNotes)
    setNotes(newNotes)
  }

  return (
    <NoteContext.Provider
      value={{ notes, getNotes, addNote, editNote, deleteNote }}
    >
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
