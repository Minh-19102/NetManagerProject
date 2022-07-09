import React, { useEffect, useState } from 'react'
import axios from 'axios'
import serverURL from '../serverURL'
import Select from 'react-select'

function AppUsing() {
	const [appList, changeAppList] = useState([])
	const [selectApp, changeSelectApp] = useState('')
	const [useAppList, changeUseAppList] = useState([])
	useEffect(() => {
		;(async () => {
			await axios.get(serverURL.defaultURL + `AllApp`).then((res) => {
				changeAppList(
					res.data.map((element) => {
						element['value'] = element['app_id']
						element['label'] = element['app_id'] + ' - ' + element['name']
						delete element['app_id']
						return element
					}),
				)
			})
		})()
	}, [])
	useEffect(() => {
		;(async () => {
			if (localStorage.getItem('session') != null) {
				await axios
					.get(serverURL.defaultURL + `listAppUsingInSession/${localStorage.getItem('session')}`)
					.then((res) => {
						changeUseAppList(res.data)
					})
			}
		})()
	}, [selectApp])
	const handleUsing = () => {
		;(async () => {
			await axios
				.post(serverURL.defaultURL + `UsingApp`, {
					session_id: parseInt(localStorage.getItem('session')),
					app_id: selectApp.value,
				})
				.then((res) => {
					changeSelectApp('')
				})
		})()
	}
	return (
		<div>
			<h3>Chọn app bạn muốn sử dụng</h3>
			<Select options={appList} onChange={changeSelectApp}></Select>
			<button onClick={handleUsing}>Open App</button>
			<h3>Những app sử dụng trong session này:</h3>
			<ul>
				{useAppList.map((e) => {
					return <li key={e['app_id']}>{e['name']}</li>
				})}
			</ul>
		</div>
	)
}

export default AppUsing
