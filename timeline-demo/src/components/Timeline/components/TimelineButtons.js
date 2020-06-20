// Modules
import React from "react"

// REDUX
import { connect } from "react-redux"
import * as actionTypes from "../../../data/actions"

// CSS
import "../../../css/Timeline.css"

import Moment from "moment"
import { extendMoment } from "moment-range"
const moment = extendMoment(Moment)

const Header = props => {
  const addEvent = () => {
    props.addEvent(
      100,
      moment.range(
        moment("01-01-2018", "MM-DD-YYYY"),
        moment("03-26-2018", "MM-DD-YYYY")
      ),
      "I can add an event. (Still in development)"
    )
  }

  return (
    <div className="TimelineButtons">
      <h3>{props.title}</h3>
      <div className="TimelineButtonsDiv">
        <button
          onClick={() => {
            addEvent()
          }}
        >
          Add Event
        </button>
        <button
          onClick={() => {
            props.updateWidth(true)
          }}
        >
          Zoom In
        </button>
        <button
          onClick={() => {
            props.updateWidth(false)
          }}
        >
          Zoom Out
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    unitWidth: state.dayWidth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateWidth: zoom =>
      dispatch({ type: actionTypes.UPDATE_UNIT_WIDTH, zoom }),
    addEvent: (eventID, eventRange, eventName) =>
      dispatch({
        type: actionTypes.ADD_EVENT,
        eventID,
        eventName,
        eventRange,
      }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
