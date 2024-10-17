import { useLocation } from 'react-router-dom';
import Footer from './footer/Footer';
import Header from './header/Header';

const Layout = ({ children }: any) => {
	const location = useLocation();

	// 헤더와 푸터를 보여줄 경로
	const showHeaderFooter =
		location.pathname === '/' ||
		location.pathname === '/recipelist' ||
		location.pathname.startsWith('/recipedetail/');

	return (
		<>
			{showHeaderFooter && <Header />}

			<main>{children}</main>

			{showHeaderFooter && <Footer />}
		</>
	);
};

export default Layout;
