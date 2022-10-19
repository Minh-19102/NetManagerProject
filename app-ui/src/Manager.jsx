import React from 'react'
import { useState } from 'react'
import AccountList from './Manager/AccountList'
import UserList from './Manager/UserList'
import UserRanking from './Manager/UserRanking'
import AppRanking from './Manager/AppRanking'
import Summary from './Manager/Summary'
import './css/Manager.css'
import { Layout, Menu } from 'antd'
import { BarChartOutlined, OrderedListOutlined, UnorderedListOutlined, TeamOutlined } from '@ant-design/icons'
const { Content, Sider } = Layout;

function getItem(label, key, icon, children = null) {
  return {
    key,
    icon,
    label,
    children
  };
}
const items = [
  getItem('Accounts', '1', <UnorderedListOutlined />),
  getItem('Users', '2', <TeamOutlined />),
  getItem('Ranking', '3', <OrderedListOutlined />, [getItem('User rank', '3-1', null), getItem('App rank', '3-2', null)]),
  getItem('Statistic', '4', <BarChartOutlined />)
]

function Manager() {
  const [menuKey, setMenuKey] = useState(1)
	return (
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
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          {menuKey == '1' && <div>
            < AccountList />
          </div>}
          {menuKey == '2' && <div>
            <UserList />
          </div>}
          {menuKey == '3-1' && <div >
            <UserRanking />
          </div>}
          {menuKey == '3-2' && <div >
            <AppRanking />
          </div>}
          {menuKey == '4' && <div>
            <Summary />
          </div>}
        </Content>
      </Layout>
    </Layout>
	)
}

export default Manager
