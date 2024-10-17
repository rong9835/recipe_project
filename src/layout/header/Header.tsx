import { Link } from 'react-router-dom';
import Search from '../../components/search/Search';
import { useAuth } from '../../context/AuthContext'; // AuthContext 경로에 맞게 수정
import logoImg from '../../assets/icon_logo.png';
import styles from './Header.module.css';

const Header = () => {
	const { user, logout } = useAuth(); // 현재 유저와 로그아웃 함수 가져오기

	return (
		<header id={styles.header}>
			<div className={styles.customHeader}>
				<Link to="/">
					<img src={logoImg} className={styles.logoImg} />
				</Link>
				<Search />
				{user ? (
					<button onClick={logout} className={styles.loginLogoutText}>
						로그아웃
					</button>
				) : (
					<Link to="/login" className={styles.loginLogoutText}>
						로그인
					</Link>
				)}
			</div>
		</header>
	);
};

export default Header;
