import { useState } from 'react';
import './App.css';
import Login from './pages/auth/login/Login'; // Login 컴포넌트의 실제 경로에 맞게 수정하세요
import SignUp from './pages/auth/signup/SignUp';
import Profile from './pages/auth/profile/Profile';

function App() {
	return (
		<>
			<Login />
			<SignUp />
			<Profile />
		</>
	);
}

export default App;
