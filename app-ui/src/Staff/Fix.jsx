//import SelectSearch from 'react-select-search'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import serverURL from '../serverURL'
import Select from 'react-select'
const errorCode = {
	0: 'Bình thường',
	1: 'Hỏng màn hình',
	2: 'Hỏng chuột/bàn phím',
	3: 'Không thể khởi động',
	4: 'Không thể đăng nhập',
	5: 'Lỗi màn hình xanh',
	6: 'Nguồn điện không hoạt động',
	7: 'Lỗi phần mềm',
	8: 'Nhiều hơn 1 lỗi',
	9: 'Khác',
}
function Fix() {
	const [computerList, changeComputerList] = useState([])
	const [selectedComputer, changeComputer] = useState('')
	const [repairerList, changeRepairerList] = useState([])
	const [selectedRepairer, changeRepairer] = useState('')
	const [computerHistory, changeComputerHistory] = useState([])
	const [amountMoney, changeAmount] = useState(0)
	const [message, changeMessage] = useState('')
	const [error, changeError] = useState('')
	useEffect(() => {
		;(async () => {
			await axios.get(serverURL.defaultURL + 'computerList').then((res) => {
				changeComputerList(
					res.data.map((element) => {
						element['value'] = element['computer_id']
						element['label'] = element['computer_id'] + ' - ' + errorCode[element['condition']]
						delete element['computer_id']
						return element
					}),
				)
			})
		})()
		;(async () => {
			await axios.get(serverURL.defaultURL + 'repairerList').then((res) => {
				changeRepairerList(
					res.data.map((element) => {
						element['value'] = element['label'] = element['staff_id']
						delete element['staff_id']
						return element
					}),
				)
			})
		})()
	}, [])
	useEffect(() => {
		;(async () => {
			await axios.get(serverURL.defaultURL + `SeeComputerHistory/${selectedComputer.value}`).then((res) => {
				changeComputerHistory(res.data)
			})
		})()
	}, [selectedComputer.value])
	const handleAmountChange = (event) => {
		changeAmount(event.target.value)
	}
	const handleChangeError = (e) => {
		changeError(e.target.value)
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		await axios
			.post(serverURL.defaultURL + 'fix', {
				computer_id: selectedComputer.value,
				staff_id: selectedRepairer.value,
				bug_description: error,
				cost: amountMoney,
			})
			.then((res) => {
				changeMessage(res.data[0]['fixbrokencomputer'])
				if (message === 'Thành công') {
					setTimeout(() => {
						window.location.reload()
					}, 3000)
				}
			})
	}
	let tmp = 1
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<h3>Chọn máy cần sửa</h3>
				<Select options={computerList} onChange={changeComputer} />
				{selectedComputer.value}
				<h3>Chọn nhân viên sửa chữa</h3>
				<Select options={repairerList} onChange={changeRepairer} />
				<h4>Lịch sử lỗi máy được chọn:</h4>
				{computerHistory.map((e) => {
					return <li key={tmp++}>{e['seecomputerhistory']}</li>
				})}
				<h3>Chi phí</h3>
				<input type='number' placeholder='Enter amount of money (VND)' onChange={handleAmountChange} />
				<br />
				<textarea placeholder='Mô tả lỗi' value={error} onChange={handleChangeError} rows='4' cols='50' />
				<input type='submit' value='Fix' />
			</form>
			<h4> Trạng thái: {message !== '' && message}</h4>
		</div>
	)
}

export default Fix
