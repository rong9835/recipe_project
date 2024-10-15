// useAddRecipe.ts
import { useCallback } from 'react';
import { db } from '../firebase/config'; // Firebase 초기화 모듈 경로에 맞게 수정
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const useAddRecipe = () => {
	const addRecipe = useCallback(async (recipeData: any) => {
		try {
			const docRef = await addDoc(collection(db, 'recipes'), {
				...recipeData,
				recipe_create_time: Timestamp.now(),
			});
			console.log('Document written with ID: ', docRef.id);
		} catch (error) {
			console.error('Error adding document: ', error);
		}
	}, []);

	return { addRecipe };
};

export default useAddRecipe;
