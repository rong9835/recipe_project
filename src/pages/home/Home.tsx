import { useState } from 'react';
import CustomButton, {
	ButtonType,
} from '../../components/custombutton/CustomButton';
import RecommendCard from '../../components/recommendcard/RecommendCard';
import styles from './Home.module.css';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

const Home = () => {
	const [isOpen, setIsOpen] = useState(false);

	const options = ['레시피 작성하기', 'AI 추천 레시피', '마이페이지'];

	const renderPlusAndCloseBtn = () => {
		return isOpen ? <CloseOutlined /> : <PlusOutlined />;
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
					내 레시피 공유하기
				</CustomButton>
			</article>
			<div>
				추천 컴포넌트
				<RecommendCard />
			</div>
			<CustomButton
				btnType={ButtonType.Plus}
				shape="circle"
				color="orange"
				size="large"
				onClick={() => setIsOpen(!isOpen)}
			>
				{renderPlusAndCloseBtn()}
			</CustomButton>
			<ul className={styles.plusMenu}>
				{options.map((option: string) => (
					<li>{option}</li>
				))}
			</ul>
		</div>
	);
};

export default Home;
