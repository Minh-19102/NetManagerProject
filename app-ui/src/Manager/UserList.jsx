import React, { useEffect, useState } from 'react'
import axios from 'axios'
import serverURL from '../serverURL'
function UserList() {
	const [UserData, DataChange] = useState([])
	useEffect(() => {
		;(async () => {
			const res = await axios.get(serverURL.defaultURL + 'AllUser')
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
						<th>Last name</th>
						<th>First_name</th>
						<th>Date of birth</th>
						<th>Membership</th>
					</tr>
					{UserData.map((element) => {
						return (
							<tr key={element.user_id}>
								<td>{element.user_id}</td>
								<td>{element.last_name}</td>
								<td>{element.first_name}</td>
								<td>{element.dob}</td>
								<td>{element.membership === 'Y' ? 'Hội viên' : 'Khách hàng'}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default UserList
