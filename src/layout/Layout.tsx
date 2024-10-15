import { useLocation } from 'react-router-dom';
import Footer from './footer/Footer';
import Header from './header/Header';

const Layout = ({ children }: any) => {
	const location = useLocation();

	// 로그인 및 회원가입 페이지 경로
	const hideHeaderFooter =
		location.pathname === '/login' || location.pathname === '/signup';

	return (
		<>
			{!hideHeaderFooter && <Header />}

			<main>{children}</main>

			{!hideHeaderFooter && <Footer />}
		</>
	);
};

export default Layout;
