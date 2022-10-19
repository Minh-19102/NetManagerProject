import React, { useEffect, useState } from 'react'
import axios from 'axios'
import serverURL from '../serverURL'
import { Table } from 'antd'

function UserList() {
  const [UserData, DataChange] = useState([])
  const fetchData = async () => {
    let data = await axios.get(serverURL.defaultURL + 'AllUser').then(res => {
      if (res.status === 200) {
        let cnt = 0
        let obj = res.data.map((e) => {
          e['key'] = ++cnt
          return e
        })
        return obj
      }
    })
    return data
  }

  const upRank = (userID) => {
    ; (async () => {
      const res = await axios.post(serverURL.defaultURL + 'UpRankUser', {
        'userID': userID
      })
      if (res.status === 200) {
          fetchData().then(res => {
            DataChange(res)
          })
        }
      })()
  }

  const columns = [
    {
      title: 'index',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'UserID',
      dataIndex: 'user_id',
      key: 'user_id',
    },
    {
      title: 'Last name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'First name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Date of birth',
      dataIndex: 'dob',
      key: 'dob',
    },
    {
      title: 'Membership',
      dataIndex: 'membership',
      key: 'membership',
      render: (text) => text === 'Y' ? "Member" : 'Guest'
    },
    {
      title: 'Action',
      key: 'user_id',
      render: (text, record) => <button onClick={() => upRank(record.user_id)}>Rank Up</button>
    },
  ];

  useEffect(() => {
    fetchData().then(data => DataChange(data))
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

export default UserList
