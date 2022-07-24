import React, { useEffect, useState } from 'react'
import axios from 'axios'
import serverURL from '../serverURL'
function AppRanking() {
	const [Data, DataChange] = useState([])
	useEffect(() => {
		;(async () => {
			const res = await axios.get(serverURL.defaultURL + 'AppRanking')
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
						<th>AppID</th>
						<th>App's name</th>
						<th>Total Opened</th>
					</tr>
					{Data.map((element) => {
						return (
							<tr key={element.app_id}>
								<td>{element.app_id}</td>
								<td>{element.name}</td>
								<td>{element.count}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default AppRanking
