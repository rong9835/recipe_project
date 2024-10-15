import { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import {
	collection,
	getDocs,
	addDoc,
	updateDoc,
	deleteDoc,
	doc,
	DocumentData,
	Timestamp,
} from 'firebase/firestore';
import CustomButton, { ButtonType } from '../custombutton/CustomButton';
import styled from '../../pages/recipedetail/RecipeDetail.module.css';
import { getAuth } from 'firebase/auth';

const Comments: React.FC = () => {
	const [comments, setComments] = useState<DocumentData[]>([]);
	const auth = getAuth();
	const currentUser = auth.currentUser;
	const recipeId = 'ClSPjrXxycVbzNW8ZXrR';

	// 댓글 불러오기
	const getComments = async () => {
		const commentsCollection = collection(db, 'recipes', recipeId, 'comment');
		const commentSnapshot = await getDocs(commentsCollection);
		const commentList = commentSnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		setComments(commentList);
	};

	useEffect(() => {
		getComments();
	}, []);

	// 댓글 작성일 변환
	const formatDate = (timestamp: Timestamp) => {
		const date = timestamp.toDate();
		return date.toLocaleString();
	};

	// 댓글 수정하기
	const updateComment = async (id: string, updatedContent: string) => {
		const commnetDoc = doc(db, 'recipes', recipeId, 'comments', id);
		await updateDoc(commnetDoc, {
			content: updatedContent,
		});
		getComments();
	};

	// 댓글 삭제하기
	const deleteComment = async (id: string) => {
		const commentDoc = doc(db, 'recipes', recipeId, 'comments', id);
		await deleteDoc(commentDoc);
		getComments();
	};

	return (
		<div>
			{comments.map((comment) => (
				<div key={comment.id} className={styled.commentBlock}>
					<ul className={styled.commentWriterInfo}>
						<li>{comment.user_nickname}</li>
						<li>{formatDate(comment.comment_create_time)}</li>
					</ul>

					{currentUser?.displayName === comment.user_nickname && (
						<div className={styled.commentSettingsBtn}>
							<CustomButton
								btnType={ButtonType.Edit}
								color="orange"
								shape="rad30"
								onClick={() => updateComment(comment.id, '수정')}
							>
								수정
							</CustomButton>
							<CustomButton
								btnType={ButtonType.Delete}
								color="white"
								shape="rad30"
								onClick={() => deleteComment(comment.id)}
							>
								삭제
							</CustomButton>
						</div>
					)}
					<p>{comment.comment_description}</p>
				</div>
			))}
		</div>
	);
};

export default Comments;
