import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth'; // Firebase Authentication에서 getAuth 가져오기
import {
	collection,
	query,
	where,
	getDocs,
	Firestore,
} from 'firebase/firestore';

const useUserNickname = (db: Firestore): string | null => {
	const [currentUserNickname, setCurrentUserNickname] = useState<string | null>(
		null
	);
	const auth = getAuth();
	const currentUser = auth.currentUser;

	useEffect(() => {
		const fetchUserData = async () => {
			if (currentUser) {
				try {
					const userQuery = query(
						collection(db, 'users'),
						where('user_email', '==', currentUser.email) // 이메일 필드를 기준으로 검색
					);

					const querySnapshot = await getDocs(userQuery);

					if (!querySnapshot.empty) {
						const userDoc = querySnapshot.docs[0];
						const userData = userDoc.data();
						setCurrentUserNickname(userData.user_nickname as string);
					} else {
						console.log('사용자가 없습니다.');
					}
				} catch (error) {
					console.error('데이터 전송 중 오류', error);
				}
			}
		};

		fetchUserData();
	}, [currentUser, db]);

	return currentUserNickname;
};

export default useUserNickname;
