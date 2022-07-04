import React, { useEffect, useState } from 'react'
import axios from 'axios'
import serverURL from '../serverURL'
function AccountList() {
	const [AccountData, DataChange] = useState([])
	useEffect(() => {
		;(async () => {
			const res = await axios.get(serverURL.defaultURL + 'AllAccount')
			if (res.status === 200) {
				DataChange(res.data)
			}
		})()
	}, [])
	return (
		<div>
			<table>
				<tbody>
					<tr>
						<th>Username</th>
						<th>Balance</th>
						<th>Owner (User's ID)</th>
					</tr>
					{AccountData.map((element) => {
						return (
							<tr key={element.username}>
								<td>{element.username}</td>
								<td>{element.balance}</td>
								<td>{element.user_id}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default AccountList
