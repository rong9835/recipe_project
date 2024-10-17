import Footer from './footer/Footer';
import Header from './header/Header';

const Layout = ({ children }: any) => {
	return (
		<div>
			<Header />

			<main>{children}</main>

			<Footer />
		</div>
	);
};

export default Layout;
