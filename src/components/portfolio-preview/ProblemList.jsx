import { Fragment } from 'react'
import { PROBLEM_GROUPS, STATUS_LABEL } from '../../data/luminipetProblems'

/**
 * The full problem list from the audit as one table, in the audit's own diagnosis format:
 * problem, impact, fix. Group rows split it by area; each problem carries its audit page and status.
 */
export default function ProblemList() {
  let n = 0
  return (
    <div className="pp-ptable">
      <table className="pp-ptable__table">
        <thead>
          <tr>
            <th scope="col" className="pp-ptable__n">
              <span className="pp-sr">Number</span>
            </th>
            <th scope="col">Problem</th>
            <th scope="col">Impact</th>
            <th scope="col">Fix</th>
          </tr>
        </thead>
        <tbody>
          {PROBLEM_GROUPS.map((g) => (
            <Fragment key={g.id}>
              <tr className="pp-ptable__group">
                <th scope="colgroup" colSpan={4}>
                  {g.label} <span>{g.where}</span>
                </th>
              </tr>
              {g.items.map((it) => {
                n += 1
                return (
                  <tr key={it.problem}>
                    <td className="pp-ptable__n">{String(n).padStart(2, '0')}</td>
                    <th scope="row" className="pp-ptable__prob">
                      {it.problem}
                      <span className="pp-prob__meta">
                        <span>Audit p. {it.page}</span>
                        <span className={`pp-prob__status is-${it.status}`}>{STATUS_LABEL[it.status]}</span>
                      </span>
                    </th>
                    <td data-label="Impact">{it.impact}</td>
                    <td data-label="Fix">{it.fix}</td>
                  </tr>
                )
              })}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}
