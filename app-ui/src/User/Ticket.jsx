//import SelectSearch from 'react-select-search'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import serverURL from '../serverURL'
import Select from 'react-select'

function Recharge() {
	const [serviceList, changeServiceList] = useState([])
	const [ticketList, changeTicketList] = useState([])
	const [ticket, changeTicket] = useState(0)
	const [message, changeMessage] = useState('')
	useEffect(() => {
		;(async () => {
			await axios.get(serverURL.defaultURL + 'usernameList').then((res) => {
				changeUserList(
					res.data.map((element) => {
						element['value'] = element['label'] = element['username']
						delete element['username']
						return element
					}),
				)
			})
		})()
		;(async () => {
			await axios.get(serverURL.defaultURL + 'cashierList').then((res) => {
				changeCashierList(
					res.data.map((element) => {
						element['value'] = element['label'] = element['staff_id']
						delete element['staff_id']
						return element
					}),
				)
			})
		})()
	}, [])
	const handleAmountChange = (event) => {
		changeAmount(event.target.value)
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		await axios
			.post(serverURL.defaultURL + 'recharge', {
				username: selectedUser.value,
				staff_id: selectedCashier.value,
				amount: amountMoney,
			})
			.then((res) => changeMessage(res.data[0]['recharge']))
	}
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<h3>Chọn Ticket ID:</h3>
				<Select options={userList} onChange={changeUser} />
				{console.log(selectedUser.value)}
				<h3>Chọn nhân viên:</h3>
				<Select options={cashierList} onChange={changeCashier} />
				{console.log(selectedCashier.value)}
				<input type='number' placeholder='Enter amount of money (VND)' onChange={handleAmountChange} />
				{console.log(amountMoney)}
				<input type='submit' value='Purchase' />
			</form>
			<h4> Trạng thái: {message !== '' && message}</h4>
		</div>
	)
}

export default Recharge
