import React from 'react'
import { useState, useEffect } from 'react'
import Order from './User/Order'
import Ticket from './User/Ticket'
import ComputerLogin from './User/ComputerLogin'
import serverURL from './serverURL'
import './css/User.css'
import axios from 'axios'
import AppUsing from './User/AppUsing'
import ReportError from './User/ReportError'
import { Layout, Menu, PageHeader, Tag } from 'antd'
import { DesktopOutlined, CoffeeOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'
const { Content, Sider } = Layout;
function getItem(label, key, icon) {
  return {
    key,
    icon,
    label,
  };
}
const items = [
  getItem('Computer Select', '1', <DesktopOutlined />),
  getItem('Order', '2', < CoffeeOutlined />),
  getItem('Logout', '3', <LogoutOutlined />)
]
function User() {
	const [user, changeUser] = useState('')
	const [bl, changeBl] = useState(0)
	const [session, changeSession] = useState('')
	const [message, changeMessage] = useState('')
  const [showPage, changeShowPage] = useState(false)
  const [menuKey, setMenuKey] = useState(1)
	useEffect(() => {
		changeUser(localStorage.getItem('user'))
		changeSession(localStorage.getItem('session'))
	}, [])
	useEffect(() => {
    if (user == null) {
      window.location.replace('user/login')
    }
    else {
      setTimeout(() => {
        changeShowPage(true)
      }, 1000)
    }
    setInterval(
			(function tmpFunction() {
				;(async () => {
					if (user != '') {
						axios.post(serverURL.defaultURL + `userBalance`, { username: user }).then((res) => {
							if (res.data.length > 0) changeBl(res.data[0]['balance'])
						})
					}
				})()
				return tmpFunction
			})(),
			15000,
		)
	}, [user])
	useEffect(() => {
		if (bl == 0 && session != null) {
			handleEnd()
		}
	}, [bl])
	const handleEnd = () => {
		;(async () => {
			await axios.post(serverURL.defaultURL + `computerLogout`, { sessionID: session }).then(() => {
				localStorage.removeItem('session')
				changeMessage('Hết tiền trong tài khoản, Session hiện tại sẽ tự động kết thúc!')
				setTimeout(() => {
					window.location.reload()
				}, 5000)
			})
		})()
	}

  return (<>{
    showPage &&
    <Layout
      style={{
        minHeight: '80vh',
      }}
    >
      <Sider theme='light' collapsed={true} >
        <div className="logo" />
        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items}
          onClick={(e) => setMenuKey(e.key)}
        />
      </Sider>
      <Layout className="site-layout">
        <PageHeader
          style={{ 'font-size': '32px' }}
          backIcon={false}
          className="site-page-header"
          title={<UserOutlined style={{ 'font-size': '32px' }} />}
          subTitle={user}
          tags={<Tag style={{ 'font-size': '20px' }} color="blue">{`balance: ${bl}`}</Tag>}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          {menuKey == '1' && <div className='ComputerContainer'>
            <ComputerLogin />
            {session && (
              <div className='computer-select-ctn'>
                <AppUsing />
                <ReportError />
              </div>
            )}
          </div>}
          {menuKey == '2' && <div className='TicketContainer'>
            <Order />
            <Ticket />
          </div>}
          {menuKey == '3' && <div className='Logout'>
            <button
						onClick={() => {
							localStorage.removeItem('user')
							changeUser('')
              setTimeout(() => {
                window.location.reload()
              }, 500)
						}}>
						Logout
            </button>
          </div>}
        </Content>
      </Layout>
    </Layout>
  }	</>)
}

export default User
