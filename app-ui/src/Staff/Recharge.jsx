//import SelectSearch from 'react-select-search'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import serverURL from '../serverURL'
import Select from 'react-select'

function Recharge() {
	const [userList, changeUserList] = useState([])
	const [selectedUser, changeUser] = useState('')
	const [cashierList, changeCashierList] = useState([])
	const [selectedCashier, changeCashier] = useState('')
	const [amountMoney, changeAmount] = useState(0)
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
        <h2>Select username</h2>
				<Select options={userList} onChange={changeUser} />
        <h2>Select staff ID</h2>
				<Select options={cashierList} onChange={changeCashier} />
        <h2>Amount</h2>
				<input type='number' placeholder='Enter amount of money (VND)' onChange={handleAmountChange} />
        <br/>
				<input type='submit' value='Purchase' />
      </form>
		</div>
	)
}

export default Recharge
