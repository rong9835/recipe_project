import {
	doc,
	collection,
	addDoc,
	deleteDoc,
	query,
	where,
	getDocs,
	updateDoc,
	increment,
} from 'firebase/firestore';
import { db } from '../../../firebase/config';
import heartEmpty from '../../../assets/icon_heart_empty.png';
import heartPull from '../../../assets/icon_heart_pull.png';
import { useAuth } from '../../../context/AuthContext';
import styled from './LikeButton.module.css';
import { useState, useEffect } from 'react';

const LikeButton = ({ recipeId }: { recipeId: string }) => {
	const user = useAuth();
	const [isHearted, setIsHearted] = useState(false);

	// 이미 좋아요를 눌렀는지 확인
	const checkIfHearted = async () => {
		if (user && user.user) {
			const heartedCollectionRef = collection(
				db,
				'recipes',
				recipeId,
				'hearted'
			);
			const heartedQuery = query(
				heartedCollectionRef,
				where('uid', '==', user.user!.uid)
			);
			const heartedDocs = await getDocs(heartedQuery);

			return !heartedDocs.empty;
		}
		return false;
	};

	// 페이지 로드 시 좋아요 상태 확인
	useEffect(() => {
		const fetchHeartedStatus = async () => {
			const hearted = await checkIfHearted();
			setIsHearted(hearted);
		};

		fetchHeartedStatus();
	}, [user, recipeId]);

	const toggleLike = async () => {
		if (!user) {
			alert('로그인이 필요합니다.');
			return;
		}

		const recipeDocRef = doc(db, 'recipes', recipeId);
		const hearted = await checkIfHearted();

		if (!hearted && user.user) {
			// 좋아요 추가
			const heartedCollectionRef = collection(
				db,
				'recipes',
				recipeId,
				'hearted'
			);
			await addDoc(heartedCollectionRef, {
				email: user.user.email,
				uid: user.user.uid,
				nickname: user.nickname,
			});

			await updateDoc(recipeDocRef, { hearts: increment(1) });

			alert('좋아요를 눌렀습니다.');
			setIsHearted(true);
		} else {
			// 좋아요 취소 (해당 문서 삭제)
			const heartedCollectionRef = collection(
				db,
				'recipes',
				recipeId,
				'hearted'
			);
			const heartedQuery = query(
				heartedCollectionRef,
				where('uid', '==', user.user!.uid)
			);
			const heartedDocs = await getDocs(heartedQuery);
			const heartedDocId = heartedDocs.docs[0].id;

			const heartedDocRef = doc(
				db,
				'recipes',
				recipeId,
				'hearted',
				heartedDocId
			);
			await deleteDoc(heartedDocRef);
			await updateDoc(recipeDocRef, { hearts: increment(-1) });

			alert('좋아요를 취소했습니다.');
			setIsHearted(false);
		}
	};

	return (
		<aside className={styled.stickyHeartIcon} onClick={toggleLike}>
			<img src={isHearted ? heartPull : heartEmpty} alt="좋아요 아이콘" />
		</aside>
	);
};

export default LikeButton;
