import Search from '../../components/search/Search';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<>
			<div>로고</div>
			<Search />
			<div>
				<Link to={'/login'} />
			</div>
			<div>
				<Link to={'/signup'}>회원가입 페이지</Link>
			</div>
		</>
	);
};

export default Header;
