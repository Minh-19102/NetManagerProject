import React from 'react'
import { useState } from 'react'
import AccountList from './Manager/AccountList'
import UserList from './Manager/UserList'
import UserRanking from './Manager/UserRanking'
import AppRanking from './Manager/AppRanking'
import './css/Manager.css'
function Manager() {
	const [display, changeDisplay] = useState(0)
	return (
		<div>
      <div className='manager-func'>
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

      <button
				onClick={() => {
					changeDisplay('UserRanking')
				}}>
				User Ranking
			</button>

      <button
				onClick={() => {
					changeDisplay('AppRanking')
				}}>
				App Ranking
			</button>
      </div>
			{display === 'AccountList' && <AccountList />}
			{display === 'UserList' && <UserList />}
      {display === 'UserRanking' && <UserRanking />}
      {display === 'AppRanking' && <AppRanking />}
		</div>
	)
}

export default Manager
