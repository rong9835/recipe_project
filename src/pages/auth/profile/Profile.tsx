import { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import { auth, db } from '../../../firebase/config';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

export default function Profile() {
	
	const [userNickname, setUserNickname] = useState<string | null>(null);

	const [userRecipes, setUserRecipes] = useState<any[]>([]);

	useEffect(() => {
		const fetchUserData = async () => {
			const user = auth.currentUser;
			if (user) {
				// Firestore에서 사용자 닉네임 가져오기
				const userDocRef = doc(db, 'users', user.uid);
				const userDocSnap = await getDoc(userDocRef);
				
				if (userDocSnap.exists()) {
					setUserNickname(userDocSnap.data().user_nickname);
				} else {
					setUserNickname("Unknown User");
				}
			} else {
				setUserNickname("Unknown User");
			}

			// Firestore에서 사용자가 작성한 게시물 가져오기
			const recipesCollectionRef = collection(db, 'recipes');
			const q = query(recipesCollectionRef, where('email', '==', user?.email));
			const recipesSnapshot = await getDocs(q);

			const recipesData = recipesSnapshot.docs.map(doc => ({
				id:doc.id,
				...doc.data()
			}));
			setUserRecipes(recipesData);
		};
		
		fetchUserData();
	}, []);
	
	return (
		<main className={styles.container}>
			<div className={styles.logo}>
				<img src="./src/assets/icon_mypage.png" alt="" />
				<h1>마이페이지</h1>
			</div>
			<div className={styles.profileBox}>
				<section className={styles.profile}>
					<div className={styles.user}>
						<div className={styles.userImg}></div>
						<h2>{userNickname}</h2>
						<span>회원소개</span>
					</div>
					<div className={styles.userPostsContainer}>
						<div className={styles.userPost}>
							<div><img src="./src/assets/icon_posts.png" alt="" /></div>
							<span>등록된 게시물</span>
							<h3>{userRecipes.length}</h3>
						</div>
						<div className={styles.userDivider}></div>
						<div className={styles.userClass}>
							<div><img src="./src/assets/icon_spoon.png" alt="" /></div>
							<span>뱃지 등급</span>
							<h3>스푼</h3>
						</div>
					</div>
				</section>
				<div className={styles.sectionDivider}></div>
				<section className={styles.userInformation}>
					<div className={styles.userRecipe}>
						<span>레시피 | Recipe</span>
						<div>
							<button>등록한 레시피<img src="./src/assets/icon_profileButton.png" alt="" /></button>
							<button>좋아요 누른 레시피<img src="./src/assets/icon_profileButton.png" alt="" /></button>
						</div>
					</div>
					<div className={styles.userInfo}>
						<span>회원정보 | User Info</span>
						<div>
							<button>정보수정<img src="./src/assets/icon_profileButton.png" alt="" /></button>
							<button>비밀번호 변경<img src="./src/assets/icon_profileButton.png" alt="" /></button>
							<button>회원탈퇴<img src="./src/assets/icon_profileButton.png" alt="" /></button>
						</div>
					</div>
				</section>
			</div>
		</main>
	);
}
