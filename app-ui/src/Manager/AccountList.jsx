import React, { useEffect, useState } from 'react'
import axios from 'axios'
import serverURL from '../serverURL'
import { Table } from 'antd';
const columns = [
  {
    title: 'index',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'Balance',
    dataIndex: 'balance',
    key: 'balance',
  },
  {
    title: 'Owner',
    dataIndex: 'user_id',
    key: 'user_id',
  },
];
function AccountList() {
	const [AccountData, DataChange] = useState([])
	useEffect(() => {
		;(async () => {
			const res = await axios.get(serverURL.defaultURL + 'AllAccount')
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
      dataSource={[...AccountData]}
    />
	)
}

export default AccountList
