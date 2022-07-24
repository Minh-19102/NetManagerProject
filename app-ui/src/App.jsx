import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import User from './User'
import Staff from './Staff'
import Manager from './Manager'
import './css/App.css'
function App() {
	return (
		<div>
			<Router>
				<div>
					<nav>
						<ul>
							<li className='nav-link'>
								<Link to='/user'>User</Link>
							</li>
							<li className='nav-link'>
								<Link to='/staff'>Staff</Link>
							</li>
							<li className='nav-link'>
								<Link to='/manager'>Manager</Link>
							</li>
						</ul>
					</nav>
					<Routes>
						<Route path='/user' element={<User />} />
						<Route path='/staff' element={<Staff />} />
						<Route path='/manager' element={<Manager />} />
					</Routes>
				</div>
			</Router>
		</div>
	)
}

export default App
