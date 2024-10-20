import styles from './Spoon.module.css';

interface SpoonProps {
	onClose: () => void;
}

export default function Spoon({ onClose }: SpoonProps) {
	return (
		<main className={styles.container}>
			<div className={styles.modalContent}>
				<div className={styles.header}>
					<img
						src="/assets/icon_logoSpoon.png"
						alt="스푼 로고이미지"
						className={styles.logo}
					/>
					<img
						src="/assets/icon_close.png"
						alt="닫기 버튼"
						className={styles.closeButton}
						onClick={onClose}
					/>
				</div>
				<h1 className={styles.title}>회원 등급별 뱃지</h1>
				<div className={styles.spoonBox}>
					<div className={styles.spoon1}>
						<img src="/assets/icon_spoon.png" alt="" />
						<h3>스푼 Spoon</h3>
						<span>게시물</span>
						<p>0개</p>
					</div>
					<div className={styles.spoon1}>
						<img src="/assets/icon_spoon2.png" alt="" />
						<h3>포크 Fork</h3>
						<span>게시물</span>
						<p>10개 등록 시</p>
					</div>
					<div className={styles.spoon1}>
						<img src="/assets/icon_spoon3.png" alt="" />
						<h3>챕스 Chopsticks</h3>
						<span>게시물</span>
						<p>20개 등록 시</p>
					</div>
					<div className={styles.spoon1}>
						<img src="/assets/icon_spoon4.png" alt="" />
						<h3>터너 Turner</h3>
						<span>게시물</span>
						<p>30개 등록 시</p>
					</div>
					<div className={styles.spoon1}>
						<img src="/assets/icon_spoon5.png" alt="" />
						<h3>나이프 Knif</h3>
						<span>게시물</span>
						<p>40개 등록 시</p>
					</div>
				</div>
			</div>
		</main>
	);
}
