import React from 'react'
import { useState, useEffect } from 'react'
import Login from './User/Login'
import Order from './User/Order'
import Ticket from './User/Ticket'
import serverURL from './serverURL'
import axios from 'axios'

function User() {
	const [user, changeUser] = useState('')
	const [bl, changeBl] = useState(0)
	useEffect(() => {
		changeUser(localStorage.getItem('user'))
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
					<Order />
					<Ticket />
				</div>
			)}
		</div>
	)
}

export default User
