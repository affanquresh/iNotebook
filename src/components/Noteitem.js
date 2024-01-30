import React from 'react'
import NoteContext from '../Contex/notes/NoteContex'
import { useContext } from 'react'

const Noteitem = (props) => {
  const contex = useContext(NoteContext)
  const { deleteNote } = contex
  const { note, updateNote } = props
  return (
    <div className="col-md-3 border border-dark mx-2 ">
      <div className="card" style={{ width: '18rem' }}>
        <div className="card-body">
          <h5 className="card-title"> {note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i
            className="fa-solid fa-trash-can mx-2"
            onClick={() => {
              deleteNote(note._id)
              props.showAlert('success', 'deleted successfully')
            }}
          ></i>
          <i
            className="fa-solid fa-pen-to-square mx-2"
            onClick={() => {
              updateNote(note)
            }}
          ></i>
        </div>
      </div>
    </div>
  )
}

export default Noteitem
