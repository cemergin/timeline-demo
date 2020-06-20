import Moment from "moment"
import { extendMoment } from "moment-range"
import _ from "lodash"

const moment = extendMoment(Moment)

export const MapInputArrayToEvents = arr => {
  return arr.map(item => {
    const name = item.name
    const start = moment(item.start, "YYYY-MM-DD")
    const end = moment(item.end, "YYYY-MM-DD")
    const range = moment.range(start, end)
    const id = item.id
    return { name, range, id }
  })
}

export const eventsToRows = events => {
  const increasing = _.sortBy(events, item => item.range.start)
  let rows = []
  for (let val of increasing) {
    let row = 0
    while (
      !!~_.findIndex(rows[row], el =>
        moment
          .range(el.range.start, el.range.end)
          .intersect(moment.range(val.range.start, val.range.end))
      )
    ) {
      row++
    }
    if (!rows[row]) rows[row] = []
    rows[row].push(val)
  }
  return rows
}

export const calculateTop = (rowIndex, elementHeight, elementMargin) => {
  return elementMargin * (rowIndex + 1) + elementHeight * rowIndex + 30
}

export const calculateLeft = (unitWidth, tableStart, eventStart) => {
  return (
    (unitWidth * moment().range(tableStart, eventStart).valueOf()) /
    (24 * 60 * 60 * 1000)
  )
}

export const calculateWidth = (unitWidth, eventRange) => {
  return Math.max(
    (unitWidth * eventRange.valueOf()) / (24 * 60 * 60 * 1000),
    unitWidth
  )
}

export const numberOfDays = range => {
  return range.valueOf() / (24 * 60 * 60 * 1000)
}

export const colorPicker = index => {
  const colors = [
    ["rgba(86,190,249,0.4)", "rgba(86, 190, 249, 0.8)"],
    ["rgba(242,182,63,0.4)", "rgba(242, 182, 63, 0.8)"],
    ["rgba(229,67,99,0.4)", "rgba(229,67,99,0.8)"],
  ]
  return colors[index % colors.length]
}
