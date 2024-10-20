import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/login/Login';
import SignUp from './pages/auth/signup/SignUp';
import RecipeDetail from './pages/recipedetail/RecipeDetail';
import Layout from './layout/Layout';
import RecipeList from './pages/recipelist/RecipeList';
import Home from './pages/home/Home';
import { AuthProvider } from './context/AuthContext';
import ForgotPassword from './pages/auth/login/ForgotPassword';
import NotFound from './pages/auth/notfound/NotFound';
import Profile from './pages/auth/profile/Profile';
import AddAndEdit from './pages/addandedit/AddAndEdit';
import RecipeAi from './pages/recipeAi/RecipeAi';
import PrivateRoute from './routes/PrivateRoute';

function App() {
	return (
		<>
			<AuthProvider>
				<Layout>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route
							path="/create"
							element={<PrivateRoute element={<AddAndEdit />} />}
						/>
						<Route
							path="/edit/:id"
							element={<PrivateRoute element={<AddAndEdit />} />}
						/>
						<Route
							path="/profile"
							element={<PrivateRoute element={<Profile />} />}
						/>
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="/forgot-password" element={<ForgotPassword />} />
						<Route path="/recipedetail/:id" element={<RecipeDetail />} />
						<Route path="/recipelist" element={<RecipeList />} />
						<Route path="/recipe-ai" element={<RecipeAi />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Layout>
			</AuthProvider>
		</>
	);
}

export default App;
