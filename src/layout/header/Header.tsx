import React from 'react';
import Search from '../../components/search/Search';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<>
			<div>로고</div>
			<Search />
			<div>로그인 로그아웃</div>
		</>
	);
};

export default Header;
