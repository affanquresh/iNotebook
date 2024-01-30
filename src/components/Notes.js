import React, { useEffect, useState } from 'react'
import NoteContext from '../Contex/notes/NoteContex'
import { useContext } from 'react'
import Noteitem from './Noteitem'
import AddNote from './AddNote'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
  const contex = useContext(NoteContext)
  let navigate = useNavigate()

  const { notes, getNotes, editNote } = contex
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes()
    } else {
      navigate('/login')
    }

    // eslint-disable-next-line
  }, [])

  const ref = useRef(null)
  const refClose = useRef(null)

  const [note, setNote] = useState({
    id: '',
    etitle: '',
    edescription: '',
    etag: 'default',
  })

  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    })
    // console.log(id, etitle, edescription)
  }

  const handleClick = (e) => {
    console.log('updating note', note)
    editNote(note.id, note.etitle, note.edescription)
    refClose.current.click()
    props.showAlert('success', 'updated successfully')
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <AddNote showAlert={props.showAlert} />

      <button
        ref={ref}
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form className="container my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    value={note.etitle}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
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
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                update Notes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container row my-3">
        <h2>Your Notes</h2>
        {notes.length === 0 && 'no notes to display'}
        {notes.map((note) => {
          return (
            <Noteitem
              key={note._id}
              showAlert={props.showAlert}
              updateNote={updateNote}
              note={note}
            />
          )
        })}
      </div>
    </>
  )
}

export default Notes
