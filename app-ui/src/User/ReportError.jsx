import React, { useState } from 'react'
import axios from 'axios'
import serverURL from '../serverURL'

const errorCode = {
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
function ReportError() {
	const [error, changeError] = useState('')
	const [selectErrorCode, changeErrorCode] = useState(1)
	const [message, changeMessage] = useState('')
	const handleChangeError = (e) => {
		changeError(e.target.value)
	}
	const handleChangeErrorCode = (e) => {
		changeErrorCode(e.target.value)
	}
	const handleEnd = () => {
		;(async () => {
			await axios
				.post(serverURL.defaultURL + `computerLogout`, { sessionID: localStorage.getItem('session') })
				.then(() => {
					localStorage.removeItem('session')
				})
		})()
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		;(async () => {
			await axios
				.post(serverURL.defaultURL + `ReportError/`, {
					session_id: localStorage.getItem('session'),
					error: error,
					errorCode: selectErrorCode,
				})
				.then((res) => {
					if (res.data[0]['reporterror'] === 'Thành công') {
						changeMessage(
							'Báo cáo lỗi thành công, Session này sẽ được tự động kết thúc. Xin vui lòng đăng nhập vào máy khác.',
						)
						handleEnd()
						setTimeout(() => {
							window.location.reload()
						}, 3000)
					}
				})
		})()
	}
	return (
    <div className='Report'>
			<h2>Báo cáo sự cố</h2>
			<form onSubmit={handleSubmit}>
				<h4>Mô tả lỗi</h4>
        <textarea className='textarea' placeholder='Mô tả lỗi' value={error} onChange={handleChangeError} rows='4' cols='50' />
				<h4>Mã lỗi</h4>
				<input type='number' min={1} max={9} required onChange={handleChangeErrorCode} />
				<br />
				<input type='submit' value='Submit' />
			</form>
			{message && <h4>Thông báo: {message}</h4>}
			<h3>Danh sách lỗi</h3>
			{Object.keys(errorCode).map((k) => {
				return <li key={k}>{k + ' - ' + errorCode[k]}</li>
			})}
		</div>
	)
}

export default ReportError
