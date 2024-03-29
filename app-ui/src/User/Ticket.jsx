//import SelectSearch from 'react-select-search'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import serverURL from '../serverURL'
import Select from 'react-select'
import { message } from 'antd'

function Recharge() {
	const [user, changeUser] = useState(localStorage.getItem('user'))
	const [serviceList, changeServiceList] = useState([])
	const [serviceInfo, changeServiceInfo] = useState([])
	const [selectService, changeService] = useState('')
	const [ticketList, changeTicketList] = useState([])
	const [ticket, changeTicket] = useState(0)
  const [amount, changeAmount] = useState(0)
	useEffect(() => {
		;(async () => {
			await axios.get(serverURL.defaultURL + `listTicketByUsername/${user}`).then((res) => {
				changeTicketList(
					res.data.map((element) => {
						element['value'] = element['label'] = element['tkid']
						delete element['tkid']
						return element
					}),
				)
			})
		})()
	}, [])
	useEffect(() => {
		;(async () => {
			await axios.get(serverURL.defaultURL + `listAllService`).then((res) => {
				changeServiceInfo(
					res.data.map((element) => {
						element['value'] = element['service_id']
						element['label'] = element['service_id'] + ' - ' + element['name']
						delete element['service_id']
						return element
					}),
				)
			})
		})()
	}, [])
	useEffect(() => {
		;(async () => {
      await axios.get(serverURL.defaultURL + `ticketInfo/${ticket.value}`).then((res) => {
				changeServiceList(
					res.data.map((element) => {
						element['value'] = element['label'] = element['svid']
						delete element['svid']
						return element
					}),
				)
			})
		})()
	}, [ticket])
	const handleAmountChange = (event) => {
		changeAmount(event.target.value)
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		;(async () => {
			await axios
				.post(serverURL.defaultURL + `UpdateServiceTicket`, {
					ticket_id: ticket.value,
					service_id: selectService.value,
					amount: amount,
				})
				.then((res) => {
          message.info(res.data[0]['updateserviceticket'])
					let tmp = ticket.value
          changeTicket({ value: 0 })
          changeTicket({ value: tmp })
				})
		})()
	}
	const handlePurchase = async (e) => {
		e.preventDefault()
		;(async () => {
      await axios.post(serverURL.defaultURL + `purchase`, { ticket_id: ticket.value }).then((res) => {
        if (res.data[0]['ticketpay'] === 'Thành công') {
          message.success(res.data[0]['ticketpay'])
        }
        else {
          message.warn(res.data[0]['ticketpay'])
        }
			})
		})()
	}
	return (
		<div className='Ticket'>
      <div>
			<h2>Chọn Ticket</h2>
			<Select options={ticketList} onChange={changeTicket} />
			<h3>Thông tin Ticket: </h3>
        <table className='ticketTable'>
				<tbody>
					<tr>
						<th>Service ID</th>
						<th>Name</th>
						<th>Quantity</th>
					</tr>
					{serviceList.map((element) => {
						return (
							<tr key={element.value}>
								<td>{element.value}</td>
								<td>{element.name}</td>
								<td>{element.sl}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			<form onSubmit={handlePurchase}>
          <input type='submit' value='Purchase' />
			</form>
			<hr />
			<h2>Thay đổi thông tin ticket</h2>
			<form onSubmit={handleSubmit}>
				<h3>Chọn Service ID:</h3>
				<Select options={serviceInfo} onChange={changeService} />
				<h3>Số lượng</h3>
				<input type='number' placeholder='Enter amount' onChange={handleAmountChange} defaultValue={0} min={0} />
				<input type='submit' value='Update' />
			</form>
			<hr />
      </div>
      <div>
        <h2 >Thông tin các service</h2>
        <table className='serviceTable'>
          <tbody>
            <tr>
              <th>Service ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Restrict</th>
            </tr>
            {serviceInfo.map((element) => {
              return (
                <tr key={element.value}>
                  <td>{element.value}</td>
                  <td>{element.name}</td>
                  <td>{element.price}</td>
                  <td>{element.restrict}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
		</div>
	)
}

export default Recharge
