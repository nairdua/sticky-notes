import { useEffect, useState } from 'react'
import Note from './Note'
import './App.css'
import Draggable from 'react-draggable'

interface Note {
  id: number,
  text: string,
  position?: {x: number, y: number}
}

const initialNotes: Note[] = [
  { id: 1, text: 'Get groceries', position: {x: 120, y: 200} },
  { id: 2, text: 'Feed the cat', position: {x: 360, y: 240} },
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

  function newNote(x: number, y: number) {
    const newId = notes[notes.length - 1]?.id + 1 || 1
    setNotes(prev => [...prev, { id: newId, text: 'New Note', position: {x, y} }])
  }

  useEffect(() => {
    const json = JSON.stringify(notes)
    localStorage.setItem('notes', json)
  }, [notes])

  return (
    <>
    <main onDoubleClick={(e) => newNote(e.clientX, e.clientY)}>
      <header>
        <h1>Sticky Notes</h1>
        <ul>
          <li>Double click anywhere on the screen to add a note</li>
          <li>To edit a note, double click it</li>
        </ul>
        <p>2023 - Made by M. Audrian Ananda P. (nairdua)</p>
      </header>
    </main>
    {notes.map((note) => (
      <Draggable key={note.id} bounds='main' cancel='.action-bar' defaultPosition={note.position}>
        <div style={{ position: 'absolute', top: 0, left: 0}}>
          <Note
            noteId={note.id}
            key={note.id}
            text={note.text}
            onDelete={(id: number) => deleteNote(id)}
            onSave={(id: number, newText: string) => saveNote(id, newText)}
          />
        </div>
      </Draggable>
    ))}
    </>
  )
}



export default App
