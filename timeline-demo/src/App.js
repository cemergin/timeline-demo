// REACT + Components
import React from "react"
import Main from "./pages/Main"

// CSS
import "./css/normalize.css"

// REDUX
import { Provider } from "react-redux"
import { createStore } from "redux"
import reducer from "./data/reducers"
import { ADD_EVENT } from "./data/actions"

// DATA
import timelineItems from "./data/timelineItems"

import { MapInputArrayToEvents } from "./utils/utils"

const store = createStore(
  reducer /* preloadedState, */,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

MapInputArrayToEvents(timelineItems.slice()).forEach(event => {
  store.dispatch({
    type: ADD_EVENT,
    eventName: event.name,
    eventID: event.id,
    eventRange: event.range,
  })
})

function App() {
  return (
    <Provider store={store}>
      <Main></Main>
    </Provider>
  )
}

export default App
