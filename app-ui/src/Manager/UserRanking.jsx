import React, { useEffect, useState } from 'react'
import axios from 'axios'
import serverURL from '../serverURL'
function UserRanking() {
	const [UserData, DataChange] = useState([])
	useEffect(() => {
		;(async () => {
			const res = await axios.get(serverURL.defaultURL + 'UserRanking')
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
						<th>UserID</th>
						<th>Full name</th>
						<th>Total Recharge</th>
					</tr>
					{UserData.map((element) => {
						return (
							<tr key={element.user_id}>
								<td>{element.user_id}</td>
								<td>{element.fullname}</td>
								<td>{element["Total Recharge"]}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default UserRanking
