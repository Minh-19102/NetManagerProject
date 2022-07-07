import React, { useState } from 'react'
import Recharge from './Staff/Recharge'
import ServeOrder from './Staff/ServeOrder'
function Staff() {
	const [mode, changeMode] = useState('Cashier')
	return (
		<div>
			<button
				onClick={() => {
					changeMode('Cashier')
				}}>
				Cashier
			</button>
			<button
				onClick={() => {
					changeMode('Server')
				}}>
				Server
			</button>
			<button
				onClick={() => {
					changeMode('Repairer')
				}}>
				Repairer
			</button>
			{mode === 'Cashier' && <Recharge />}
			{mode === 'Server' && <ServeOrder />}
		</div>
	)
}

export default Staff
