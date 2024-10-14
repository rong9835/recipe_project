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
		</>
	);
};

export default Header;
