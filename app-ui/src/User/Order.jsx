import React, { useState, useEffect } from 'react'
import axios from 'axios'
import serverURL from '../serverURL'
function Order() {
	const [selectedUser, changeUser] = useState('')
	const [Message, changeMessage] = useState('')
	useEffect(() => {
		changeUser(localStorage.getItem('user'))
	}, [])
	return (
		<div>
			<button
				onClick={() => {
					;(async () => {
						await axios.post(serverURL.defaultURL + 'orderTicket', { username: selectedUser }).then((res) => {
							changeMessage(res.data[0]['orderticket'])
						})
					})()
					setTimeout(() => {
						window.location.reload()
					}, 2000)
				}}>
				Add Ticket
			</button>
			<h3>Trạng thái: {Message}</h3>
		</div>
	)
}

export default Order
