import React, { useEffect, useState } from 'react'
import axios from 'axios'
import serverURL from '../serverURL'
import { Table } from 'antd';
const columns = [
  {
    title: 'Rank',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'UserID',
    dataIndex: 'user_id',
    key: 'user_id',
  },
  {
    title: 'Full name',
    dataIndex: 'fullname',
    key: 'fullname',
  },
  {
    title: 'Total Recharge',
    dataIndex: 'Total Recharge',
    key: 'Total Recharge',
  },
];

function UserRanking() {
	const [UserData, DataChange] = useState([])
	useEffect(() => {
		;(async () => {
			const res = await axios.get(serverURL.defaultURL + 'UserRanking')
			if (res.status === 200) {
        let cnt = 0
        let obj = res.data.map((e) => {
          e['key'] = ++cnt
          return e
        })
        DataChange(obj)
			}
		})()
	}, [])
	return (
    <Table
      style={{ margin: '20px' }}
      align='center'
      bordered={true}
      columns={columns}
      dataSource={UserData}
    />
	)
}

export default UserRanking
