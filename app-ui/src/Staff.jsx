import React, { useState } from 'react'
import Fix from './Staff/Fix'
import Recharge from './Staff/Recharge'
import ServeOrder from './Staff/ServeOrder'
import './css/Staff.css'
import { Layout, Menu, PageHeader, Tag } from 'antd'
import { MoneyCollectOutlined, ToolOutlined, CoffeeOutlined } from '@ant-design/icons'
const { Content, Sider } = Layout;

function getItem(label, key, icon) {
  return {
    key,
    icon,
    label,
  };
}
const items = [
  getItem('Cashier', '1', <MoneyCollectOutlined />),
  getItem('Server', '2', <CoffeeOutlined />),
  getItem('Repairer', '3', <ToolOutlined />)
]

function Staff() {
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
            < Recharge />
          </div>}
          {menuKey == '2' && <div>
            <ServeOrder />
          </div>}
          {menuKey == '3' && <div >
            <Fix />
          </div>}
        </Content>
      </Layout>
    </Layout>
	)
}

export default Staff
