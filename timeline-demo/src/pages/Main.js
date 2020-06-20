// React + Components
import React from "react"
import PageHeader from "../components/PageHeader/PageHeader"
import Timeline from "../components/Timeline/Timeline"

import "../css/Timeline.css"

const Main = props => {
  return (
    <div className="MainPage">
      <PageHeader></PageHeader>
      <Timeline></Timeline>
    </div>
  )
}

export default Main
