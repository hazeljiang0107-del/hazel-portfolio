import { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { COPY } from '../../data/luminipetPreviewCopy'
import { assets } from '../../data/luminipetPreviewAssets'
import Shot, { EvidenceBadge } from './Shot'

/**
 * Earlier → what needed to change → implemented.
 * The toggle only swaps between two REAL captures (both currently flagged
 * “needs your confirmation”). Text for all three beats is always visible.
 */
export default function IterationToggle() {
  const name = useId()
  const reduce = useReducedMotion()
  const [mode, setMode] = useState('earlier')
  const id = mode === 'earlier' ? 'iterationEarlier' : 'iterationFinal'
  const it = COPY.iteration

  const fade = reduce
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 1 }, transition: { duration: 0 } }
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 } }

  return (
    <div className="lpv-iter">
      <div className="lpv-iter__stage">
        <fieldset className="lpv-seg">
          <legend className="lpv-sr">Show earlier or implemented version</legend>
          {[
            ['earlier', 'Earlier'],
            ['final', 'Implemented'],
          ].map(([val, label]) => (
            <label key={val} className="lpv-seg__opt">
              <input
                type="radio"
                name={name}
                value={val}
                checked={mode === val}
                onChange={() => setMode(val)}
              />
              <span>{label}</span>
            </label>
          ))}
        </fieldset>
        <div className="lpv-iter__shot">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={id} {...fade}>
              <Shot id={id} caption={false} imgClassName="lpv-iter__img" />
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="lpv-explorer__cap" aria-live="polite">
          {assets[id].caption}
        </p>
        <EvidenceBadge asset={assets[id]} />
      </div>

      <ol className="lpv-iter__beats">
        <li className={mode === 'earlier' ? 'is-on' : ''}>
          <span className="lpv-iter__k">Earlier</span>
          <p>{it.earlier}</p>
        </li>
        <li>
          <span className="lpv-iter__k">What needed to change</span>
          <p>{it.change}</p>
        </li>
        <li className={mode === 'final' ? 'is-on' : ''}>
          <span className="lpv-iter__k">Implemented</span>
          <p>{it.final}</p>
        </li>
      </ol>
    </div>
  )
}
