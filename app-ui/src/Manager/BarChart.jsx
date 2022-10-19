import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { Tooltip } from 'antd'

const BarChart = ({ fetchData }) => {
  const [selectData, setSelectData] = useState("")
  const canvas = useRef()
  const mouseover = (datapoint) => {
    setSelectData(datapoint)
  };
  const mouseleave = () => {
    setSelectData("")
  }
  const drawBarChart = (data) => {
    const canvasHeight = 400
    const canvasWidth = 1000
    const scale = 0.9 * canvasHeight / Math.max(...data)
    const svgCanvas = d3.select(canvas.current)
      .append("svg")
      .attr("width", canvasWidth)
      .text("Value")
      .attr("height", canvasHeight)
      .text("date")
      .style("border", "1px solid black")
    svgCanvas.selectAll("rect")
      .data(data).enter()
      .append("rect")
      .attr("width", canvasWidth / (data.length + 1))
      .attr("height", (datapoint) => datapoint * scale)
      .attr("fill", "blue")
      .attr("x", (datapoint, iteration) => (canvasWidth / ((data.length + 1) * (data.length + 2))) + iteration * canvasWidth / data.length)
      .attr("y", (datapoint) => canvasHeight - datapoint * scale)
      .on("mouseleave", mouseleave)
      .on("mouseover", (datapoint) => mouseover(datapoint.target.__data__));
  }
  useEffect(() => {
    drawBarChart(fetchData)
  }, [fetchData])
  return <>{fetchData.length > 0 &&
    <Tooltip title={selectData ? `Value: ${selectData} đ` : ''}>
      <div ref={canvas}>
      </div>
    </Tooltip>
  }
  </>
}
export default BarChart
