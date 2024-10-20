import React from 'react';
import styles from './NotFound.module.css';
import pageNotFoundImage from '/assets/icon_page_not_found.png';

const PageNotFound: React.FC = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<img
					src={pageNotFoundImage}
					alt="Page Not Found"
					className={styles.image}
				/>
				<p className={styles.message}>
					페이지의 주소가 잘못 입력되었거나,
					<br />
					주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
				</p>
				<a href="/" className={styles.link}>
					메인 화면으로 가기 <span className={styles.arrow}>→</span>
				</a>
			</div>
		</div>
	);
};

export default PageNotFound;
