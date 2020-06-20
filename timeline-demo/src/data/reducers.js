import * as actionTypes from "./actions"

import Moment from "moment"
import { extendMoment } from "moment-range"

const moment = extendMoment(Moment)

const initialState = {
  maxRange: null,
  unitWidth: 20,
  events: {},
}

// class Event {
//   fields (id, name, range) {
//   }
// }

const unitWidthMax = 80
const unitWidthMin = 5

const createEvent = (id, name, range) => {
  return { id, name, range }
}

const updateEventRange = (event, range) => {
  return { ...event, range }
}

const updateEventName = (event, name) => {
  return { ...event, name }
}

const getEventFromState = (state, eventID) => {
  return { ...state.events[eventID] }
}

const checkEventExists = event => {
  if (
    event === null ||
    event === undefined ||
    (Object.keys(event).length === 0 && event.constructor === Object)
  ) {
    return false
  } else {
    return true
  }
}

const returnBoundingRange = (maxRange, eventRange) => {
  if (maxRange === null || maxRange === undefined) {
    return eventRange.clone()
  } else {
    const before = maxRange.start.isBefore(eventRange.start)
      ? moment(maxRange.start)
      : moment(eventRange.start)
    const after = maxRange.end.isAfter(eventRange.end)
      ? moment(maxRange.end)
      : moment(eventRange.end)
    return moment.range(before, after)
  }
}

const unitWidthReducer = (state, zoom) => {
  let width = state.unitWidth
  if (zoom) {
    width = Math.min(width * 2, unitWidthMax)
  } else {
    width = Math.max(Math.floor(width / 2), unitWidthMin)
  }
  return {
    ...state,
    unitWidth: width,
  }
}

const addEventReducer = (state, id, name, range) => {
  if (checkEventExists(getEventFromState(state, id))) {
    return state
  } else {
    const event = createEvent(id, name, range)
    const maxRange = returnBoundingRange(state.maxRange, event.range)
    return {
      ...state,
      maxRange,
      events: { ...state.events, [id]: event },
    }
  }
}

const updateEventNameReducer = (state, id, name) => {
  let event = getEventFromState(state, id)
  if (checkEventExists(event)) {
    event = updateEventName(event, name)
    return {
      ...state,
      events: { ...state.events, [id]: event },
    }
  } else {
    return state
  }
}

const updateEventRangeReducer = (state, id, range) => {
  let event = getEventFromState(state, id)
  if (checkEventExists(event)) {
    event = updateEventRange(event, range)
    const maxRange = returnBoundingRange(state.maxRange, event.range)
    return {
      ...state,
      maxRange,
      events: { ...state.events, [id]: event },
    }
  } else {
    return state
  }
}

const deleteEventReducer = (state, id) => {
  // Needs to be tested and confirmed
  const event = getEventFromState(state, id)
  if (checkEventExists(event)) {
    const updatedEvents = state.events.reduce((acc, curr) => {
      if (curr.id !== id) {
        return { ...acc, curr }
      }
      return acc
    }, {})
    return {
      ...state,
      events: updatedEvents,
    }
  } else {
    return state
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_UNIT_WIDTH:
      return unitWidthReducer(state, action.zoom)
    case actionTypes.ADD_EVENT:
      return addEventReducer(
        state,
        action.eventID,
        action.eventName,
        action.eventRange
      )
    case actionTypes.UPDATE_EVENT_RANGE:
      return updateEventRangeReducer(state, action.eventId, action.eventRange)
    case actionTypes.UPDATE_EVENT_NAME:
      return updateEventNameReducer(state, action.eventId, action.eventName)
    case actionTypes.DELETE_EVENT:
      return deleteEventReducer(state, action.eventID)
    default:
      return { ...state }
  }
}

export default reducer
