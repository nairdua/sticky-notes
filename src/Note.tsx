import { ComponentPropsWithRef, useState } from 'react'
import './Note.css'

interface NoteProps extends ComponentPropsWithRef<'li'> {
  noteId: number
  text: string
  onDelete?: (noteId: number) => void
  onSave?: (noteId: number, text: string) => void
}

export default function Note(props: NoteProps) {
  const { noteId, onDelete, text, onSave, ...rest } = props

  const [newText, setNewText] = useState(text)
  const [actionBarVisible, setActionBarVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)

  function handleDelete() {
    if (onDelete) {
      onDelete(noteId)
    }
  }

  function handleSave() {
    if (onSave) {
      onSave(noteId, newText)
    }
    setEditMode(false)
  }

  const EditActions = () => (
    <>
      <button type="button" onClick={() => setEditMode(false)}>
        Cancel
      </button>
      <button type="button" onClick={handleSave}>
        Save
      </button>
    </>
  )

  const DeleteAction = () => (
    <>
      <button type="button" onClick={() => setEditMode(true)}>
        Edit
      </button>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </>
  )

  return (
    <li className="note" {...rest}>
      <div style={{ flex: 1, padding: '0.5rem' }}>
        {editMode 
          ? <textarea value={newText} onChange={(e) => setNewText(e.target.value)} maxLength={100}/>
          : text 
        }
      </div>
      <div
        className="action-bar"
        onMouseEnter={() => setActionBarVisible(true)}
        onMouseLeave={() => setActionBarVisible(false)}
        style={{
          opacity: actionBarVisible || editMode ? 1 : 0,
          transition: 'opacity 0.1s',
        }}
      >
        {editMode ? <EditActions /> : <DeleteAction />}
      </div>
    </li>
  )
}
