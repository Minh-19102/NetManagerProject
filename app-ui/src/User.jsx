import React from 'react'
import { useState, useEffect } from 'react'
import Login from './User/Login'
import Order from './User/Order'

function User() {
	const [user, changeUser] = useState('')
	useEffect(() => {
		changeUser(localStorage.getItem('user'))
	})
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
					<Order />
				</div>
			)}
		</div>
	)
}

export default User
