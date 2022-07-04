import React from 'react'
import { useState } from 'react'
import AccountList from './Manager/AccountList'
import UserList from './Manager/UserList'
function Manager() {
	const [display, changeDisplay] = useState(0)
	return (
		<div>
			<button
				onClick={() => {
					changeDisplay('AccountList')
				}}>
				Account List
			</button>

			<button
				onClick={() => {
					changeDisplay('UserList')
				}}>
				User List
			</button>
			{display === 'AccountList' && <AccountList />}
			{display === 'UserList' && <UserList />}
		</div>
	)
}

export default Manager
