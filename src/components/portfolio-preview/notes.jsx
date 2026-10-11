import { createContext, useContext, useState } from 'react'

/** Toggles evidence labels on media and the preview-notes panel. Off by default. */
const NotesCtx = createContext({ show: false, setShow: () => {} })
export const useNotes = () => useContext(NotesCtx)

export function NotesProvider({ children }) {
  const [show, setShow] = useState(false)
  return <NotesCtx.Provider value={{ show, setShow }}>{children}</NotesCtx.Provider>
}
