import { useEffect, useRef, useState } from 'react';
import CustomButton, {
	ButtonType,
} from '../../components/custombutton/CustomButton';
import RecommendCard from '../../components/recommendcard/RecommendCard';
import styles from './Home.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/config';
import PlusMenuBtn from '../../components/plusmenubutton/PlusMenuBtn';

const Home = () => {
	const [isOpen, setIsOpen] = useState(false);
	const plusRef = useRef<HTMLUListElement>(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setIsLoggedIn(!!user); // user가 존재하면 true, 아니면 false
		});

		return () => unsubscribe(); // 컴포넌트 언마운트 시 리스너 해제
	}, []);

	useEffect(() => {
		const currentUrl = window.location.href;

		if (currentUrl.includes('/')) {
			document.body.style.backgroundColor = 'white'; // 원하는 배경 색상으로 변경
		}

		const handleClickOutside = (event: MouseEvent) => {
			if (plusRef.current && !plusRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.body.style.backgroundColor = '';
		};
	}, []);

	const options = [
		{ label: '레시피 작성하기', path: '/create' },
		{ label: 'AI 추천 레시피', path: '/' },
		{ label: '마이페이지', path: '/profile' },
	];

	const handleOptionClick = (path: string) => {
		if (!isLoggedIn) {
			navigate('/login'); // 로그인되지 않았다면 로그인 페이지로 리다이렉트
		} else {
			navigate(path); // 로그인된 경우 해당 경로로 이동
		}
	};

	return (
		<div id={styles.home}>
			<article className={styles.homeBanner}>
				<div className={styles.bannerText}>
					<p>가족과 함께한 행복했던 시간, 친구들과 나눈 즐거운 순간,</p>
					<p>혹은 당신의 인생에 특별한 의미를 지닌 소중한 기억이 담긴.</p>
					<p>
						할머니의 손맛이 그리워지는 전통 음식부터, 여행지에서 우연히 발견한
						이국적인 맛,
					</p>
					<p>
						또는 힘들 때 위로가 되어준 comfort food까지, 당신의 마음을 따뜻하게
						만드는 모든 요리의 레시피를 들려주세요.
					</p>
				</div>
				<CustomButton btnType={ButtonType.Share} color="orange" shape="rad20">
					<Link to="/create">내 레시피 공유하기</Link>
				</CustomButton>
			</article>
			<RecommendCard />
			<PlusMenuBtn isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			{isOpen && (
				<ul className={styles.plusMenu} ref={plusRef}>
					{/* 각 옵션을 Link로 감싸 경로를 추가 */}
					{options.map((option) => (
						<li key={option.label}>
							<span
								className={styles.plusMenuList}
								onClick={() => handleOptionClick(option.path)}
							>
								{option.label}
							</span>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Home;
