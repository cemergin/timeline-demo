// REACT + Components
import React from "react"
import TimelineButtons from "./components/TimelineButtons"
import TimelineGrid from "./components/TimelineGrid"
import TimelineElement from "./components/TimelineElement"

// REDUX
import { connect } from "react-redux"
import * as actionTypes from "../../data/actions"

// CSS
import "../../css/Timeline.css"

// UTILS
import {
  eventsToRows,
  calculateTop,
  calculateLeft,
  calculateWidth,
  colorPicker,
  numberOfDays,
} from "../../utils/utils"

const rowHeight = 100
const rowMargin = 10

const Timeline = props => {
  const rows = eventsToRows(props.events)
  const elements = []

  for (let row = 0; row < rows.length; row++) {
    for (let col = 0; col < rows[row].length; col++) {
      elements.push(
        <TimelineElement
          top={calculateTop(row, rowHeight, rowMargin)}
          left={calculateLeft(
            props.unitWidth,
            props.maxRange.start,
            rows[row][col].range.start
          )}
          width={calculateWidth(props.unitWidth, rows[row][col].range)}
          unitWidth={props.unitWidth}
          unitHeight={rowHeight + rowMargin}
          height={rowHeight}
          key={rows[row][col].id}
          color={colorPicker(rows[row][col].id)}
          content={rows[row][col].name}
        ></TimelineElement>
      )
    }
  }

  return (
    <div className="Timeline">
      <TimelineButtons title="Timeline Table"></TimelineButtons>
      <div className="TimelineContent">
        <TimelineGrid
          unitWidth={props.unitWidth}
          numberOfDays={Math.max(numberOfDays(props.maxRange), 120)}
        ></TimelineGrid>
        {elements}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    maxRange: state.maxRange,
    unitWidth: state.unitWidth,
    events: state.events,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateEventRange: (eventID, eventRange) =>
      dispatch({
        type: actionTypes.UPDATE_EVENT_RANGE,
        eventID,
        eventRange,
      }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline)
