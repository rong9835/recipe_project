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
			<section className={styles.profile}>
				<div className={styles.user}>
					<div>이미지 부분</div>
					<span>{userNickname}</span>
					<span>회원소개</span>
				</div>
				<div className={styles.userPost}>
					<div>이미지 부분</div>
					<span>등록된 게시물</span>
					<span>{userRecipes.length}</span>
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
