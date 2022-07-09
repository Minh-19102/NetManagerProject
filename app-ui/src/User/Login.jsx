import React, { useState } from 'react'
import axios from 'axios'
import serverURL from '../serverURL'
function Login() {
	const [username, changeUsername] = useState('')
	const [password, changePassword] = useState('')
	const [message, changeMessage] = useState('')
	return (
		<div className='Login'>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					;(async () => {
						await axios
							.post(serverURL.defaultURL + 'login', {
								username: username,
								password: password,
							})
							.then((res) => {
								if (res.data[0]['userlogin'] === 1) {
									changeMessage('Đăng nhập thành công.')
									localStorage.setItem('user', username)
									setTimeout(() => {
										window.location.reload()
									}, 2000)
								} else {
									changeMessage('Đăng nhập không thành công.')
								}
							})
					})()
				}}>
				<label htmlFor='username'>
					<b>Username</b>
				</label>
				<input
					type='text'
					label='username'
					value={username}
					onChange={(e) => {
						changeUsername(e.target.value)
					}}
					required
				/>
				<br />
				<label htmlFor='psw'>
					<b>Password</b>
				</label>
				<input
					type='password'
					label='password'
					value={password}
					onChange={(e) => {
						changePassword(e.target.value)
					}}
					required
				/>
				<br />
				<input type='submit' value='Login' />
			</form>
			<h3>{message}</h3>
		</div>
	)
}

export default Login
