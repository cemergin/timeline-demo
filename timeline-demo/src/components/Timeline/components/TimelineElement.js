import React, { useState } from "react"
import Draggable from "react-draggable"

const divStylize = (top, left, width, height, color, dragging) => {
  return {
    left: `${left}px`,
    top: `${top + (dragging ? -3 : 0)}px`,
    width: `${width}px`,
    height: `${height}px`,
    boxShadow: dragging ? "3px 3px rgba(100, 0, 12, 0.200)" : "0px 0px",
    backgroundColor: `${color[0]}`,
    border: `2px solid ${color[1]}`,
    zIndex: dragging ? "5" : "1",
  }
}

const TimelineElement = props => {
  const [dragging, setDragging] = useState(false)

  const onDragStart = () => {
    setDragging(true)
  }

  const onDragStop = (e, data) => {
    setDragging(false)
  }

  return (
    <Draggable
      onStart={onDragStart}
      onStop={onDragStop}
      grid={[props.unitWidth, props.unitHeight]}
      bounds="parent"
      cancel="textarea"
    >
      <div
        className="TimelineElement"
        style={divStylize(
          props.top,
          props.left,
          props.width,
          props.height,
          props.color,
          dragging
        )}
      >
        <textarea>{props.content}</textarea>
      </div>
    </Draggable>
  )
}

export default TimelineElement
