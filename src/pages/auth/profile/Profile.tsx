import { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import { auth } from '../../../firebase/config';

export default function Profile() {
	
	const [userName, setUserName] = useState<string | null>(null);

	useEffect(() => {
		const user = auth.currentUser;
		if(user){
			setUserName(user.displayName);
		} else {
			setUserName("Unknown User");
		}
	}, []);
	
	return (
		<main className={styles.container}>
			<div className={styles.logo}>
				<img src="./src/assets/icon_mypage.png" alt="" />
				<h1>마이페이지</h1>
			</div>
			<section className={styles.profile}>
				<div className={styles.user}>
					<div>이미지 부분</div>
					<span>{userName}</span>
					<span>회원소개</span>
				</div>
				<div className={styles.userPost}>
					<div>이미지 부분</div>
					<span>등록된 게시물</span>
					<span>갯수</span>
				</div>
				<div className={styles.userClass}>
					<div>이미지 부분</div>
					<span>뱃지 등급</span>
					<span>갯수</span>
				</div>
			</section>
			<section className={styles.userInformation}>
				<div className={styles.userRecipe}>
					<div>레시피 | Recipe</div>
					<div>
						<button>등록한 레시피</button>
						<button>좋아요 누른 레시피</button>
					</div>
				</div>
				<div className={styles.userInfo}>
					<div>회원정보 | User Info</div>
					<div>
						<button>정보수정</button>
						<button>비밀번호 변경</button>
						<button>회원탈퇴</button>
					</div>
				</div>
			</section>
		</main>
	);
}
