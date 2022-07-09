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
function ComputerLogin() {
	const [user, changeUser] = useState(localStorage.getItem('user'))
	const [computerList, changeComputerList] = useState([])
	const [computer, changeComputer] = useState('')
	const [message, changeMessage] = useState('')
	const [session, changeSession] = useState(localStorage.getItem('session'))
	useEffect(() => {
		;(async () => {
			await axios.get(serverURL.defaultURL + `computerList`).then((res) => {
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
		if (session != null) {
			;(async () => {
				await axios.get(serverURL.defaultURL + `getComputerIDBySession/${session}`).then((res) => {
					changeComputer(res.data[0]['computer_id'])
				})
			})()
		}
	}, [])
	const handleStart = () => {
		;(async () => {
			await axios
				.post(serverURL.defaultURL + `computerLogin`, { username: user, comID: computer.value })
				.then((res) => res.data[0]['createsession'])
				.then((data) => {
					if (!isNaN(data)) {
						localStorage.setItem('session', parseInt(data))
					} else {
						changeMessage('Đăng nhập vào máy tính thành công với session ' + data)
					}
					setTimeout(() => {
						window.location.reload()
					}, 2000)
				})
		})()
	}
	const handleEnd = () => {
		;(async () => {
			await axios
				.post(serverURL.defaultURL + `computerLogout`, { sessionID: session })
				.then((res) => res.data[0]['endsession'])
				.then((data) => {
					localStorage.removeItem('session')
					changeSession(null)
					changeMessage(data)
					setTimeout(() => {
						window.location.reload()
					}, 1000)
				})
		})()
	}
	return (
		<div className='ComputerLogin'>
			{session == null ? (
				<div>
					<h2>Chọn máy tính</h2>
					<Select options={computerList} onChange={changeComputer} />
					<button onClick={handleStart}>Khởi động</button>
					{message && <h4>Trạng thái: {message}</h4>}
				</div>
			) : (
				<div>
					<h2>
						Bạn đang login máy {computer}, phiên đăng nhập {session}
					</h2>
					<button onClick={handleEnd}>Kết thúc phiên</button>
					{message && <h4>Trạng thái: {message}</h4>}
					<hr />
				</div>
			)}
		</div>
	)
}

export default ComputerLogin
