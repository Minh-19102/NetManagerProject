import React from 'react'
import { useState, useEffect } from 'react'
import Login from './User/Login'
import Order from './User/Order'
import Ticket from './User/Ticket'
import ComputerLogin from './User/ComputerLogin'
import serverURL from './serverURL'
import './css/User.css'
import axios from 'axios'
import AppUsing from './User/AppUsing'
import ReportError from './User/ReportError'
import AccountRegister from './User/AccountRegister'

function User() {
	const [user, changeUser] = useState('')
	const [bl, changeBl] = useState(0)
	const [session, changeSession] = useState('')
	const [message, changeMessage] = useState('')
	useEffect(() => {
		changeUser(localStorage.getItem('user'))
		changeSession(localStorage.getItem('session'))
	}, [])
	useEffect(() => {
		setInterval(
			(function tmpFunction() {
				;(async () => {
					if (user != '') {
						axios.post(serverURL.defaultURL + `userBalance`, { username: user }).then((res) => {
							if (res.data.length > 0) changeBl(res.data[0]['balance'])
						})
					}
				})()
				return tmpFunction
			})(),
			15000,
		)
	}, [user])
	useEffect(() => {
		if (bl == 0 && session != null) {
			handleEnd()
		}
	}, [bl])
	const handleEnd = () => {
		;(async () => {
			await axios.post(serverURL.defaultURL + `computerLogout`, { sessionID: session }).then(() => {
				localStorage.removeItem('session')
				changeMessage('Hết tiền trong tài khoản, Session hiện tại sẽ tự động kết thúc!')
				setTimeout(() => {
					window.location.reload()
				}, 5000)
			})
		})()
	}
	return (
		<div>
			{user == null ? (
        <div>
          <h1> Đăng nhập</h1>
				  <Login />
          <h1>Đăng ký</h1>
          <AccountRegister/>
        </div>
			) : (
				<div>
					<h3>Đăng nhập với user: {user}</h3>
					<button
						onClick={() => {
							localStorage.removeItem('user')
							changeUser('')
              setTimeout(() => {
                window.location.reload()
              }, 3000)
						}}>
						Logout
					</button>
					<h3>Số dư của bạn là: {bl}</h3>
					<div className='FeatureContainer'>
						<div className='TicketContainer'>
							<Order />
							<Ticket />
						</div>
						<div className='ComputerContainer'>
							<ComputerLogin />
							{session && (
								<div>
									{message && <div>{message}</div>}
									<AppUsing />
									<ReportError />
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default User
