import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/login/Login';
import SignUp from './pages/auth/signup/SignUp';
import Profile from './pages/auth/profile/Profile';
import RecipeDetail from './pages/recipedetail/RecipeDetail';
import Layout from './layout/Layout';

function App() {
	return (
		<>
			<Layout>
				<Routes>
					<Route path="/" element="" />
					<Route path="/profile" element={<Profile />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/recipedetail" element={<RecipeDetail />} />
				</Routes>
			</Layout>
			ss
		</>
	);
}

export default App;

