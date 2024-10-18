import styles from './Footer.module.css';
import githubImg from '../../assets/icon_github.svg';
import logoGrayImg from '../../assets/logo_gray.svg';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<div id={styles.footer}>
			<div className={styles.footerSection}>
				<div className={styles.footerLinks}>
					<ul className={styles.logoAndFooterMenu}>
						<li className={styles.logoGrayImg}>
							<img src={logoGrayImg} alt="회색 레시피 연구소" />
						</li>
						<li className={styles.footerMenuText}>
							<Link to="/login">로그인</Link>
						</li>
						<li className={styles.footerMenuText}>
							<Link to="/signup">회원가입</Link>
						</li>
						<li className={styles.footerMenuText}>
							<Link to="/create">레시피 작성</Link>
						</li>
						<li className={styles.footerMenuText}>
							<Link to="/">AI 레시피 추천</Link>
						</li>
					</ul>
					<ul className={styles.githubLink}>
						<li>
							<img src={githubImg} alt="깃허브" />
						</li>
						<li>
							<a href="https://github.com/Jung-sunghoon">정성훈</a>
						</li>
						<li>
							<a href="https://github.com/Forhye">강지혜</a>
						</li>
						<li>
							<a href="https://github.com/rong9835">박초롱</a>
						</li>
						<li>
							<a href="https://github.com/Hongaproject">홍성원</a>
						</li>
					</ul>
				</div>
				<div className={styles.footerCopyright}>
					&copy; 2024. 프로젝트 다 팀 All Rights Reserved.
				</div>
			</div>
		</div>
	);
};

export default Footer;
