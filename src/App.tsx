import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/login/Login'; // Login 컴포넌트의 실제 경로에 맞게 수정하세요
import SignUp from './pages/auth/signup/SignUp';
import RecipeDetail from './pages/recipedetail/RecipeDetail';
import Layout from './layout/Layout';

function App() {
	return (
		<>
			<Layout>
				<Routes>
					<Route path="/" element="" />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/recipedetail" element={<RecipeDetail />} />
				</Routes>
			</Layout>
		</>
	);
}

export default App;
