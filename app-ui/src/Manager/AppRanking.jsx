import React, { useEffect, useState } from 'react'
import axios from 'axios'
import serverURL from '../serverURL'
import { Table } from 'antd'

function AppRanking() {
  const columns = [
    {
      title: 'index',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'App ID',
      dataIndex: 'app_id',
      key: 'app_id',
    },
    {
      title: `App's name`,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Total used',
      dataIndex: 'count',
      key: 'count',
    },
  ];

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
    <Table
      style={{ margin: '20px' }}
      align='center'
      bordered={true}
      columns={columns}
      dataSource={Data}
    />
	)
}

export default AppRanking
