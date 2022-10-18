import React, { useState, useEffect } from 'react'
import axios from 'axios'
import serverURL from '../serverURL'
import { message } from 'antd'
function Order() {
  const [selectedUser, changeUser] = useState('')
	useEffect(() => {
		changeUser(localStorage.getItem('user'))
	}, [])
	return (
		<div className='Order'>
			<h2>Thêm Ticket</h2>
			<button
				onClick={() => {
					;(async () => {
						await axios.post(serverURL.defaultURL + 'orderTicket', { username: selectedUser }).then((res) => {
              message.info(res.data[0]['orderticket'])
						})
					})()
					setTimeout(() => {
						window.location.reload()
					}, 2000)
				}}>
				Add Ticket
      </button>
		</div>
	)
}

export default Order
