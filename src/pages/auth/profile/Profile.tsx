import { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import { auth, db } from '../../../firebase/config';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';
import Spoon from './spoon/Spoon';
import {
	EmailAuthProvider,
	reauthenticateWithCredential,
	updatePassword,
} from 'firebase/auth';

interface Badge {
	image: string;
	name: string;
	count: number;
}

// 사용자 게시글 수에 따라 배지 제공하기 위한 데이터
const badgeData: Badge[] = [
	{ image: './src/assets/icon_spoon.png', name: '스푼 Spoon', count: 0 },
	{ image: './src/assets/icon_spoon2.png', name: '포크 Fork', count: 10 },
	{ image: './src/assets/icon_spoon3.png', name: '챕스 Chopsticks', count: 20 },
	{ image: './src/assets/icon_spoon4.png', name: '터너 Turner', count: 30 },
	{ image: './src/assets/icon_spoon5.png', name: '나이프 Knife', count: 40 },
];

export default function Profile() {
	const [userEmail, setUserEmail] = useState<string | null>(null);
	const [userName, setUserName] = useState<string | null>(null);
	const [userNickname, setUserNickname] = useState<string | null>(null);
	const [userPhoneNumber, setUserPhoneNumber] = useState<string | null>(null);
	const [userRecipes, setUserRecipes] = useState<any[]>([]);
	const [spoonModalOpen, setSpoonModalOpen] = useState<boolean>(false);
	const [showEditInfo, setShowEditInfo] = useState<boolean>(false);
	const [userIntroduction, setUserIntroduction] = useState<string | null>('');
	const [editIntroduction, setEditIntroduction] = useState<boolean>(false);
	const [showEditPassword, setShowEditPassword] = useState<boolean>(false);
	const [nowPassword, setNowPassword] = useState<string>('');
	const [newPassword, setNewPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');

	useEffect(() => {
		const fetchUserData = async () => {
			const user = auth.currentUser;

			if (user) {
				// Firestore에서 사용자 닉네임 가져오기
				const userDocRef = doc(db, 'users', user.uid);
				const userDocSnap = await getDoc(userDocRef);

				if (userDocSnap.exists()) {
					setUserEmail(userDocSnap.data().user_email);
					setUserName(userDocSnap.data().user_name);
					setUserNickname(userDocSnap.data().user_nickname);
					setUserPhoneNumber(userDocSnap.data().user_phone_number);
					setUserIntroduction(userDocSnap.data().user_info);
				} else {
					setUserNickname('Unknown User');
				}
			} else {
				setUserNickname('Unknown User');
			}

			// Firestore에서 사용자가 작성한 게시물 가져오기
			const recipesCollectionRef = collection(db, 'recipes');
			const q = query(recipesCollectionRef, where('email', '==', user?.email));
			const recipesSnapshot = await getDocs(q);

			const recipesData = recipesSnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setUserRecipes(recipesData);
		};

		fetchUserData();
	}, []);

	// 게시글 수를 기준으로 현재 배지를 반환하는 함수
	const getCurrentBadge = (postsCount: number): Badge => {
		return (
			badgeData
				.slice()
				.reverse()
				.find((badgeData) => postsCount >= badgeData.count) || badgeData[0]
		);
	};

	// 현재 사용자의 게시물 수에 따라 배지 계산
	const currentBadge = getCurrentBadge(userRecipes.length);

	// 정보수정 업데이트 부분
	const userInfoUpdate = async () => {
		const user = auth.currentUser;
		if (user) {
			const userDocRef = doc(db, 'users', user.uid);

			try {
				await updateDoc(userDocRef, {
					user_name: userName,
					user_nickname: userNickname,
					user_phone_number: userPhoneNumber,
				});
				alert('사용자 정보가 업데이트되었습니다.');
				setShowEditInfo(false);
			} catch (error) {
				console.error('사용자 정보 업데이트 오류:', error);
			}
		}
	};

	// 자기소개 업데이트 부분
	const userIntroductionUpdate = async () => {
		if (auth.currentUser) {
			const userDocRef = doc(db, 'users', auth.currentUser.uid);

			try {
				await updateDoc(userDocRef, {
					user_info: userIntroduction,
				});
				setEditIntroduction(false);
			} catch (error) {
				console.error('사용자 소개 업데이트 오류:', error);
			}
		}
	};

	// 비밀번호 변경 부분
	const userPasswordChange = async () => {
		const user = auth.currentUser;

		if (!user) {
			alert('사용자가 로그인되어 있지 않습니다. 다시 로그인 후 시도해주세요.');
			return;
		}

		if (newPassword !== confirmPassword) {
			alert('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
			return;
		}

		try {
			const credential = EmailAuthProvider.credential(
				user?.email!,
				nowPassword
			);
			await reauthenticateWithCredential(user, credential);

			await updatePassword(user, newPassword);
			setNowPassword('');
			setNewPassword('');
			setConfirmPassword('');
			setShowEditPassword(false);

			alert('비밀번호가 변경되었습니다.');
		} catch (error: any) {
			if (error.code === 'auth/wrong-password') {
				alert('현재 비밀번호가 잘못되었습니다. 다시 입력해주세요.');
			} else {
				console.error('비밀번호 변경 오류:', error);
				alert('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
			}
		}
	};

	return (
		<main className={styles.container}>
			<div className={styles.logo}>
				{
					showEditInfo ? (
						<>
							<img src="./src/assets/icon_userInfo.png" alt="정보수정 아이콘" />
							<h1>정보수정</h1>
						</>
					) : showEditPassword ? (
						<>
							<img src="./src/assets/icon_userInfo.png" alt="비밀번호 변경 아이콘" />
							<h1>비밀번호 변경</h1>
						</>
					) : (
						<>
							<img src="./src/assets/icon_mypage.png" alt="마이페이지 아이콘" />
							<h1>마이페이지</h1>
						</>
					)
				}
			</div>
			<div className={styles.profileBox}>
				<section className={styles.profile}>
					<div className={styles.user}>
						<img src="./src/assets/icon_profileImg.png" alt="" />
						<h2>
							{userNickname}
							<img src="./src/assets/icon_nicknameImg.png" alt="" />
						</h2>
						{editIntroduction ? (
							<div className={styles.userEditIntroduction}>
								<input
									type="text"
									value={userIntroduction || ''}
									onChange={(e) => setUserIntroduction(e.target.value)}
								/>
								<button onClick={userIntroductionUpdate}>저장</button>
								<button onClick={() => setEditIntroduction(false)}>취소</button>
							</div>
						) : (
							<span onClick={() => setEditIntroduction(true)}>
								{userIntroduction
									? userIntroduction
									: '자기소개를 작성해주세요.'}
								<img src="./src/assets/icon_infoImg.png" alt="" />
							</span>
						)}
					</div>
					<div className={styles.userPostsContainer}>
						<div className={styles.userPost}>
							<div>
								<img src="./src/assets/icon_posts.png" alt="" />
							</div>
							<span>등록된 게시물</span>
							<h3>{userRecipes.length}</h3>
						</div>
						<div className={styles.userDivider}></div>
						<div className={styles.userClass}>
							<div onClick={() => setSpoonModalOpen(true)}>
								<img src={currentBadge.image} alt={currentBadge.name} />
							</div>
							<span>뱃지 등급</span>
							<h3>{currentBadge.name}</h3>
						</div>
					</div>
				</section>
				<div className={styles.sectionDivider}></div>
				{!showEditInfo && !showEditPassword ? (
					// 기본 화면: 회원 정보 및 버튼들
					<section className={styles.userInformation}>
						<div className={styles.userRecipe}>
							<span>레시피 | Recipe</span>
							<div>
								<button>
									등록한 레시피
									<img src="./src/assets/icon_profileButton.png" alt="" />
								</button>
								<button>
									좋아요 누른 레시피
									<img src="./src/assets/icon_profileButton.png" alt="" />
								</button>
							</div>
						</div>
						<div className={styles.userInfo}>
							<span>회원정보 | User Info</span>
							<div>
								<button onClick={() => setShowEditInfo(true)}>
									정보수정
									<img src="./src/assets/icon_profileButton.png" alt="" />
								</button>
								<button onClick={() => setShowEditPassword(true)}>
									비밀번호 변경
									<img src="./src/assets/icon_profileButton.png" alt="" />
								</button>
								<button>
									회원탈퇴
									<img src="./src/assets/icon_profileButton.png" alt="" />
								</button>
							</div>
						</div>
					</section>
				) : null}
				{showEditInfo && !showEditPassword ? (
					// 정보 수정 화면
					<section className={styles.userEditInfo}>
						<div
							className={styles.editBack}
							onClick={() => setShowEditInfo(false)}
						>
							<img src="./src/assets/icon_infoback.png" alt="" />
							<span>뒤로가기</span>
						</div>
						<div className={styles.editInput}>
							<span>이메일</span>
							<input
								type="email"
								className={styles.editInputEmail}
								readOnly
								value={userEmail || ''}
							/>
						</div>
						<div className={styles.editInput}>
							<span>이름</span>
							<input
								type="text"
								value={userName || ''}
								onChange={(e) => setUserName(e.target.value)}
							/>
						</div>
						<div className={styles.editInput}>
							<span>닉네임</span>
							<input
								type="text"
								value={userNickname || ''}
								onChange={(e) => setUserNickname(e.target.value)}
							/>
						</div>
						<div className={styles.editInput}>
							<span>연락처</span>
							<input
								type="tel"
								value={userPhoneNumber || ''}
								onChange={(e) => setUserPhoneNumber(e.target.value)}
							/>
						</div>
						<div className={styles.editBtn}>
							<button onClick={userInfoUpdate}>수정완료</button>
							<p>회원탈퇴</p>
						</div>
					</section>
				) : null}
				{!showEditInfo && showEditPassword ? (
					// 비밀번호 변경 화면
					<section className={styles.userEditInfo}>
						<div
							className={styles.editBack}
							onClick={() => setShowEditPassword(false)}
						>
							<img src="./src/assets/icon_infoback.png" alt="" />
							<span>뒤로가기</span>
						</div>
						<div className={styles.editInput}>
							<span>현재 비밀번호</span>
							<input
								type="password"
								value={nowPassword}
								onChange={(e) => setNowPassword(e.target.value)}
							/>
						</div>
						<div className={styles.editInput}>
							<span>새 비밀번호</span>
							<input
								type="password"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
							/>
						</div>
						<div className={styles.editInput}>
							<span>새 비밀번호 확인</span>
							<input
								type="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
						</div>
						<div className={styles.editPwBtn}>
							<button onClick={userPasswordChange}>비밀번호 변경하기</button>
						</div>
					</section>
				) : null}
			</div>
			{spoonModalOpen && <Spoon onClose={() => setSpoonModalOpen(false)} />}
		</main>
	);
}
