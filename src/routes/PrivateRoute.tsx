import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
	element: JSX.Element;
}

const PrivateRoute = ({ element }: PrivateRouteProps) => {
	const { user, loading } = useAuth();

	// 인증 상태가 로딩 중일 때는 아무것도 렌더링하지 않음
	if (loading) {
		return null; // 로딩 중일 때 로딩 스피너를 보여주거나 아무것도 렌더링하지 않음
	}

	if (!user) {
		alert('로그인 하셔야합니다.');
		return <Navigate to="/login" />;
	}

	return element;
};

export default PrivateRoute;
