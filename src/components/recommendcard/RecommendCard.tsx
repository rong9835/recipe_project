import styles from './RecommendCard.module.css';
import heartImg from '../../assets/icon_heart.svg';

const RecommendCard = () => {
	const levelCircle = () => {
		return (
			<div className={styles.outerCircle}>
				<div className={styles.innerCircle}>
					<span>Lv 2</span>
				</div>
			</div>
		);
	};

	return (
		<section className={styles.recommendCardSection}>
			<article className={styles.recommendCardArticle}>
				<div>
					<span>'s</span>
					<span> 추천 레시피</span>
				</div>
				<div className={styles.recommendRecipe}>
					<div
						className={`${styles.recommendCardImg1} ${styles.recommendCardImg}`}
					>
						{levelCircle()}
					</div>
					<div>
						<div>
							<img className={styles.heartImg} src={heartImg} />
							하트
						</div>
						<div>레시피 제목</div>
						<div>태그</div>
						<div>레시피 보러가기</div>
					</div>
				</div>
			</article>
			<article className={styles.recommendCardArticle}>
				<div>
					<span>'s</span>
					<span> 추천 레시피</span>
				</div>
				<div className={styles.recommendRecipe}>
					<div
						className={`${styles.recommendCardImg2} ${styles.recommendCardImg}`}
					>
						{levelCircle()}
					</div>
					<div>
						<div>
							<img className={styles.heartImg} src={heartImg} />
							하트
						</div>
						<div>레시피 제목</div>
						<div>태그</div>
						<div>레시피 보러가기</div>
					</div>
				</div>
			</article>
		</section>
	);
};

export default RecommendCard;
