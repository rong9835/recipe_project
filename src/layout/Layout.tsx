import Footer from './footer/Footer';
import Header from './header/Header';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }: any) => {
    const location = useLocation();
    const hideHeaderFooter = ['/login', '/forgot-password', '/signup'].includes(location.pathname);
    
    return (
        <div>
            {!hideHeaderFooter && <Header />}
            <main>{children}</main>
            {!hideHeaderFooter && <Footer />}
        </div>
    );
};

export default Layout;