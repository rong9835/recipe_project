import styles from './RecommendCard.module.css';
import heartImg from '../../assets/icon_heart.svg';

import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useEffect, useState } from 'react';
import { Tag } from 'antd'; // antd의 Tag 컴포넌트 임포트

const getTopHeartsRecipes = async () => {
	try {
		const recipesRef = collection(db, 'recipes');
		const q = query(recipesRef, orderBy('hearts', 'desc'), limit(2));
		const querySnapshot = await getDocs(q);

		const topRecipes = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));

		return topRecipes;
	} catch (error) {
		console.error('Error fetching recipes: ', error);
		return [];
	}
};

const RecommendCard = () => {
	const [topRecipes, setTopRecipes] = useState<any[]>([]);

	useEffect(() => {
		const fetchTopRecipes = async () => {
			try {
				console.log('Fetching top recipes...');
				const recipes = await getTopHeartsRecipes();
				console.log('Recipes fetched:', recipes);
				setTopRecipes(recipes);
			} catch (error) {
				console.error('Error fetching recipes:', error);
			}
		};

		fetchTopRecipes();
	}, []);

	const levelCircle = (recipe_difficulty: number) => {
		return (
			<div className={styles.outerCircle}>
				<div className={styles.innerCircle}>
					<span>Lv {recipe_difficulty}</span>
				</div>
			</div>
		);
	};

	return (
		<div className={styles.recommendCardSection}>
			{topRecipes.map((recipe) => (
				<article key={recipe.id} className={styles.recommendCardArticle}>
					<div>
						<span>{recipe.author.user_nickname}'s</span>
						<span> 추천 레시피</span>
					</div>
					<div className={styles.recommendRecipe}>
						<div className={styles.recommendCardImgSection}>
							<img
								className={styles.recommendCardImg}
								src={recipe.thumbnail_url}
							/>
							{levelCircle(recipe.recipe_difficulty)}
						</div>
						<div className={styles.recipeDescription}>
							<div className={styles.heartImgAndText}>
								<img className={styles.heartImg} src={heartImg} alt="heart" />{' '}
								<span className={styles.heartText}>{recipe.hearts}</span>
							</div>
							<div className={styles.recipeNameAndIng}>
								<div className={styles.recipeName}>{recipe.recipe_name}</div>
								<div className={styles.recipeTags}>
									{/* antd의 Tag 컴포넌트를 사용하여 태그들을 분할하여 표시 */}
									{recipe.recipe_ingredients.map((ing: any, index: number) => (
										<Tag className={styles.customTag} key={index}>
											{ing.name}
										</Tag>
									))}
								</div>
							</div>
							<div className={styles.recipeDetailLinkWrapper}>
								<button className={styles.recipeDetailLinkBtn}>
									레시피 보러가기
								</button>
							</div>
						</div>
					</div>
				</article>
			))}
		</div>
	);
};

export default RecommendCard;
