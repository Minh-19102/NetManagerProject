//import SelectSearch from 'react-select-search'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import serverURL from '../serverURL'
import Select from 'react-select'
import { message } from 'antd'

const errorCode = {
  0: 'Normal',
  1: 'Broken screen',
  2: 'Broken mouse/keyboard',
  3: 'Unable to start',
  4: 'Can not login',
  5: 'Blue screen error',
  6: 'Power supply not working',
  7: 'Software error',
  8: 'More than 1 error',
  9: 'Other',
}
function Fix() {
	const [computerList, changeComputerList] = useState([])
	const [selectedComputer, changeComputer] = useState('')
	const [repairerList, changeRepairerList] = useState([])
	const [selectedRepairer, changeRepairer] = useState('')
	const [computerHistory, changeComputerHistory] = useState([])
  const [amountMoney, changeAmount] = useState(0)
	const [error, changeError] = useState('')
	useEffect(() => {
		;(async () => {
			await axios.get(serverURL.defaultURL + 'computerList').then((res) => {
				changeComputerList(
					res.data.map((element) => {
						element['value'] = element['computer_id']
						element['label'] = element['computer_id'] + ' - ' + errorCode[element['condition']]
						delete element['computer_id']
						return element
					}),
				)
			})
		})()
		;(async () => {
			await axios.get(serverURL.defaultURL + 'repairerList').then((res) => {
				changeRepairerList(
					res.data.map((element) => {
						element['value'] = element['label'] = element['staff_id']
						delete element['staff_id']
						return element
					}),
				)
			})
		})()
	}, [])
	useEffect(() => {
		;(async () => {
			await axios.get(serverURL.defaultURL + `SeeComputerHistory/${selectedComputer.value}`).then((res) => {
				changeComputerHistory(res.data)
			})
		})()
	}, [selectedComputer.value])
	const handleAmountChange = (event) => {
		changeAmount(event.target.value)
	}
	const handleChangeError = (e) => {
		changeError(e.target.value)
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		await axios
			.post(serverURL.defaultURL + 'fix', {
				computer_id: selectedComputer.value,
				staff_id: selectedRepairer.value,
				bug_description: error,
				cost: amountMoney,
			})
			.then((res) => {
        if (res.data[0]['fixbrokencomputer'] === 'Thành công') {
          message.success(res.data[0]['fixbrokencomputer'])
        }
        else {
          message.warning(res.data[0]['fixbrokencomputer'])
        }
			})
	}
	let tmp = 1
	return (
		<div>
			<form onSubmit={handleSubmit}>
        <h2>Select broken computer</h2>
				<Select options={computerList} onChange={changeComputer} />
				{selectedComputer.value}
        <h2>Select staff ID</h2>
				<Select options={repairerList} onChange={changeRepairer} />
        {computerHistory.length > 0 && <>
          <h2>Selected computer history log:</h2>
          <div>{computerHistory.map((e) => {
            return <li key={tmp++}>{e['seecomputerhistory']}</li>
          })}
          </div>
        </>
        }
        <hr />
        <h2>Report detail</h2>
        <h3>Cost</h3>
				<input type='number' placeholder='Enter amount of money (VND)' onChange={handleAmountChange} />
        <h3>Description</h3>
        <textarea className='textarea' placeholder='Error description' value={error} onChange={handleChangeError} rows='4' cols='50' />
				<input type='submit' value='Fix' />
      </form>
		</div>
	)
}

export default Fix
