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

function User() {
	const [user, changeUser] = useState('')
	const [bl, changeBl] = useState(0)
	const [session, changeSession] = useState('')
	useEffect(() => {
		changeUser(localStorage.getItem('user'))
		changeSession(localStorage.getItem('session'))
	}, [])
	useEffect(() => {
		;(async () => {
			axios.post(serverURL.defaultURL + `userBalance`, { username: user }).then((res) => {
				if (res.data.length > 0) changeBl(res.data[0]['balance'])
			})
		})()
	}, [user])
	return (
		<div>
			{user == null ? (
				<Login />
			) : (
				<div>
					<h3>Đăng nhập với user: {user}</h3>
					<button
						onClick={() => {
							localStorage.removeItem('user')
							changeUser('')
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
