import styles from './RecommendCard.module.css';

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
				<div>
					<div
						className={`${styles.recommendCardImg1} ${styles.recommendCardImg}`}
					>
						{levelCircle()}
					</div>
				</div>
			</article>
			<article className={styles.recommendCardArticle}>
				<div>
					<span>'s</span>
					<span> 추천 레시피</span>
				</div>
				<div>
					<div
						className={`${styles.recommendCardImg2} ${styles.recommendCardImg}`}
					></div>
				</div>
			</article>
		</section>
	);
};

export default RecommendCard;
