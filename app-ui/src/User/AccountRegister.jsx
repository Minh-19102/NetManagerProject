import React, { useState } from 'react'
import axios from 'axios'
import serverURL from '../serverURL'
function AccountRegister() {
	const [username, changeUsername] = useState('')
	const [password, changePassword] = useState('')
  const [userID, changeUserID] = useState('')
	const [message, changeMessage] = useState('')
	return (
		<div className='AccountRegister'>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					;(async () => {
						await axios
							.post(serverURL.defaultURL + 'createAccount', {
                userID: userID,
                username: username,
								password: password,
							})
							.then((res) => {
								if (res.data[0]['createaccount'] === 'Thành công') {
									changeMessage('Đăng ký thành công.')
									localStorage.setItem('user', username)
									setTimeout(() => {
										window.location.reload()
									}, 2000)
								} else {
									changeMessage('Đăng ký không thành công do ' + res.data[0]['createaccount'])
								}
							})
					})()
				}}>
        <label htmlFor='userID'>
					<b>UserID</b>
				</label>
				<input
					type='text'
					label='userID'
					value={userID}
					onChange={(e) => {
						changeUserID(e.target.value)
					}}
					required
				/>
				<br />
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
				<input type='submit' value='Register' />
			</form>
			<h3>{message}</h3>
		</div>
	)
}

export default AccountRegister
