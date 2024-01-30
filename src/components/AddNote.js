import React, { useState } from 'react'
import { useContext } from 'react'

import NoteContext from '../Contex/notes/NoteContex'

const AddNote = (props) => {
  const contex = useContext(NoteContext)
  const { addNote } = contex
  const [note, setNote] = useState({
    title: '',
    description: '',
    tag: 'default',
  })
  const handleClick = (e) => {
    e.preventDefault()
    addNote(note.title, note.description, note.tag)
    // addNote(note)
    setNote({ title: '', description: '', tag: '' })
    props.showAlert('success', 'added successfully')
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <h2>Add A Note</h2>
      <form className="container my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>

        <button
          disabled={note.title.length < 5 || note.description.length < 5}
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddNote
