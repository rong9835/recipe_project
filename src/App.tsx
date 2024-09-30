import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import CustomButton, {
	ButtonType,
} from './components/custombutton/CustomButton';

function App() {
	return (
		<>
			<CustomButton
				btnType={ButtonType.Plus}
				size="large"
				color="orange"
				shape="circle"
			>
				+
			</CustomButton>
		</>
	);
}

export default App;
