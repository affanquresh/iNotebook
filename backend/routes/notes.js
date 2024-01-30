const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Notes')
const { body, validationResult } = require('express-validator')

//RoUTE 1:fetch all notes:GET"/api/notes/fetchallnotes".'
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id })
    res.json(notes)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('some error occured')
  }
})

//RoUTE 2:add a new note using: post"/api/notes/fetchallnotes".

router.post(
  '/addnote',
  fetchuser,
  [
    body('title', 'enter a title').isLength({ min: 3 }),
    // body('description', 'description should have atleast 5 character').isLength(
    //   {
    //     min: 5,
    //   },
    // ),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body
      //if there are errors,return bad request and the errors
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      })
      const savednote = await note.save()
      console.log(savednote)
      res.json(savednote)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('some error occured')
    }
  },
)

//RoUTE 3:update a note: post"/api/notes/updatenote".
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body
  try {
    //create a new note object
    const newNote = {}
    if (title) {
      newNote.title = title
    }
    if (description) {
      newNote.description = description
    }
    if (tag) {
      newNote.tag = tag
    }

    //find the note to be updated and update it
    let note = await Note.findById(req.params.id)
    if (!note) {
      return res.status(404).send(' not found')
    }
    if (note.user.toString() != req.user.id) {
      return res.status(404).send(' aha not found')
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true },
    )
    res.json({ note })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('some error occured')
  }
})
//RoUTE 4:delete a note: post"/api/notes/deletenote".
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body
  try {
    //find the note to be deleted and delete it
    let note = await Note.findById(req.params.id)
    if (!note) {
      return res.status(404).send(' not found')
    }
    if (note.user.toString() != req.user.id) {
      return res.status(404).send(' aha not found')
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({ success: 'note has been deleted', note: note })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('some error occured')
  }
})

module.exports = router
