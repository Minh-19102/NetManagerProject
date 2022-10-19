import React, { useEffect, useState } from 'react'
import axios from 'axios'
import serverURL from '../serverURL'
import BarChart from './BarChart';

let date = new Date()
let day = date.getDate();
let month = date.getMonth()+1;
let year = date.getFullYear();
let fullDate = `${year}-${month}-${day}`;

function Summary() {
	const [TotalRecharge, changeTotalRecharge] = useState(0)
  const [TotalServiceRevenue, changeTSR] = useState(0)
  const [TotalPlayTime, changeTPT] = useState(0)
	const [startDate, changeStartDate] = useState(fullDate)
  const [endDate, changeEndDate] = useState(fullDate)
  const [fixCost, changeFC] = useState(0)
  const [chartData, setChartData] = useState([])
	const handleSubmit = (e) => {
		e.preventDefault()
    console.log('submit')
    ;(async () => {
			await axios
				.post(serverURL.defaultURL + `Summary/`, {
					start: startDate,
					end: endDate
				}).then(res=>{
          if (res.data[0]) 
            changeTotalRecharge(res.data[0])
          if (res.data[1]) 
            changeTPT(`${res.data[1]['hours']|0} giờ ${res.data[1]['minutes']|0} phút ${res.data[1]['seconds']|0} giây`)
          if (res.data[2]) 
            changeTSR(res.data[2])
          if (res.data[3]) 
            changeFC(res.data[3])
          if (res.data[4])
            setChartData(res.data[4].map(e => e['summaryrechargebydate']))
        })
      }
    )()
  }
  return (
		<div>
      <form onSubmit={handleSubmit} className = "sum-form">
        <label htmlFor="start">Start date:</label>
        <input type="date" onChange={(e)=>{
          changeStartDate(e.target.value)
        }}/>
        <br/>
        <label htmlFor="start">End date:</label>
        <input type="date"  onChange={(e)=>{
          changeEndDate(e.target.value)
        }}/>
        <input type="submit" value="Summary" />
      </form>
      <div>
        <h1>Kết quả thống kê:</h1>
        <h3>Tổng số tiền khách nạp: {TotalRecharge}</h3>
        <h3>Tổng số thời gian khách sử dụng: {TotalPlayTime}</h3>
        <h3>Tổng số tiền khách sử dụng để order: {TotalServiceRevenue}</h3>
        <h3>Tổng chi phí sửa chữa: {fixCost}</h3>
      </div>
      <div>
        <BarChart fetchData={chartData} />
      </div>
		</div>
	)
}

export default Summary
