import { useState } from 'react'
import Note from './Note'
import './App.css'

const initialNotes = [
  { id: 1, text: 'Get groceries' },
  { id: 2, text: 'Feed the cat' },
  { id: 3, text: 'A really really really really really long one'},
]

function App() {
  const [notes, setNotes] = useState(initialNotes)

  function deleteNote(id: number) {
    setNotes(prev => prev.filter(note => note.id !== id))
  }

  function saveNote(id: number, newText: string) {
    setNotes(prev => prev.map(note => {
      if (note.id === id) {
        note.text = newText
      }
      return note
    }))
  }

  function newNote() {
    const newId = notes[notes.length - 1]?.id + 1 || 1
    setNotes(prev => [...prev, { id: newId, text: 'New Note' }])
  }

  return (
    <main>
      <h1>Sticky Notes</h1>
      <ul className="notes-list">
        {notes.map((note) => (
          <Note
            noteId={note.id}
            key={note.id}
            text={note.text}
            onDelete={(id: number) => deleteNote(id)}
            onSave={(id: number, newText: string) => saveNote(id, newText)}
          />)
        )}
        <button className="new-note-button" type="button" onClick={newNote}>
          Add a new note
        </button>
      </ul>
    </main>
  )
}



export default App
