import React from 'react'
import { useContext } from 'react'
import NoteContext from '../Contex/notes/NoteContex'

const About = () => {
  const a = useContext(NoteContext)
  return (
    <div>
      This is about {a.name} and he is {a.age} years old{' '}
    </div>
  )
}

export default About
