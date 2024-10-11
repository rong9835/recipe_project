import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/login/Login';
import SignUp from './pages/auth/signup/SignUp';
import Profile from './pages/auth/profile/Profile';
import RecipeDetail from './pages/recipedetail/RecipeDetail';
import Layout from './layout/Layout';
import RecipeList from './pages/recipelist/RecipeList';
import Home from './pages/home/Home';

function App() {
	return (
		<>
			<Layout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/recipedetail" element={<RecipeDetail />} />
					<Route path="/recipelist" element={<RecipeList />} />
				</Routes>
			</Layout>
			ss
		</>
	);
}

export default App;
