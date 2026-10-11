import { createContext, useContext, useMemo, useState } from 'react'

const ReviewCtx = createContext({ show: true, setShow: () => {} })

/** Toggles the evidence/source labels that only exist for the owner's review. */
export function ReviewProvider({ children }) {
  const [show, setShow] = useState(true)
  const value = useMemo(() => ({ show, setShow }), [show])
  return <ReviewCtx.Provider value={value}>{children}</ReviewCtx.Provider>
}

export const useReview = () => useContext(ReviewCtx)
