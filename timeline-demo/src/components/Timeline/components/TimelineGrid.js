// Modules
import React from "react"

const TimelineGrid = props => {
  const generateColumns = (numberOfDays, unitWidth) => {
    let div = 1
    let width = unitWidth
    if (unitWidth <= 20) {
      div = 7
      width *= 7
    } // Weekly Columns
    const num = numberOfDays / div
    const cols = []

    for (let i = 1; i <= num; i++) {
      cols.push(
        <div key={i} className="TimelineGridContainer">
          <div className="TimelineGridHeader" style={{ width: `${width}px` }}>
            <p>{(div === 7 ? "W" : "D") + ` ${i}`}</p>
          </div>
          <div
            className="TimelineGridColumn"
            style={{ width: `${width}px` }}
          ></div>
        </div>
      )
    }

    return cols
  }

  return (
    <div className="TimelineGrid">
      {generateColumns(props.numberOfDays, props.unitWidth)}
    </div>
  )
}

export default TimelineGrid
