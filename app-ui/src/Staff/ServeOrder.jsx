//import SelectSearch from 'react-select-search'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import serverURL from '../serverURL'
import Select from 'react-select'

function Recharge() {
	const [orderList, changeOrderList] = useState([])
	const [selectedOrder, changeOrder] = useState('')
	const [serverList, changeServerList] = useState([])
	const [selectedServer, changeServer] = useState('')
	const [message, changeMessage] = useState('')
	useEffect(() => {
		;(async () => {
			await axios.get(serverURL.defaultURL + 'uncompletedTicketList').then((res) => {
				console.log(res.data)
				changeOrderList(
					res.data.map((element) => {
						element['value'] = element['label'] = element['ticket_id']
						delete element['ticket_id']
						return element
					}),
				)
			})
		})()
		;(async () => {
			await axios.get(serverURL.defaultURL + 'serverList').then((res) => {
				changeServerList(
					res.data.map((element) => {
						element['value'] = element['label'] = element['staff_id']
						delete element['staff_id']
						return element
					}),
				)
			})
		})()
	}, [])
	const handleSubmit = async (e) => {
		e.preventDefault()
		await axios
			.post(serverURL.defaultURL + 'serve', {
				ticket_id: selectedOrder.value,
				staff_id: selectedServer.value,
			})
			.then((res) => changeMessage(res.data[0]['serveticket']))
	}
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<h3>Chọn Ticket Order:</h3>
				<Select options={orderList} onChange={changeOrder} />
				<h3>Chọn nhân viên:</h3>
				<Select options={serverList} onChange={changeServer} />
				<input type='submit' value='Serve' />
			</form>
			<h4> Trạng thái: {message !== '' && message}</h4>
		</div>
	)
}

export default Recharge
