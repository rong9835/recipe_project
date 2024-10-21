import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './RecipeAi.module.css';

const RecipeAi: React.FC = () => {
	const [ingredients, setIngredients] = useState('');
	const [cookingMethod, setCookingMethod] = useState('');
	const [additionalInfo, setAdditionalInfo] = useState('');
	const [recommendedRecipe, setRecommendedRecipe] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const formatRecipe = (recipe: string) => {
		return recipe.replace(/\. /g, '.\n');
	};

	const handleFindRecipe = async () => {
		setIsLoading(true);
		const url = import.meta.env.VITE_AI_API_URL;

		const data = [
			{
				role: 'system',
				content:
					'당신은 요리 전문가입니다. 사용자가 제공한 재료, 조리방법, 추가사항을 바탕으로 적절한 레시피를 추천해주세요.',
			},
			{
				role: 'user',
				content: `재료: ${ingredients}\n조리방법: ${cookingMethod}\n추가사항: ${additionalInfo}\n이 정보를 바탕으로 레시피를 추천해주세요.`,
			},
		];

		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});

			const result = await response.json();
			const recipe = result.choices[0].message.content;
			setRecommendedRecipe(formatRecipe(recipe));
		} catch (error) {
			console.error('Error:', error);
			setRecommendedRecipe(
				'레시피를 가져오는 중 오류가 발생했습니다. 다시 시도해 주세요.'
			);
		} finally {
			setIsLoading(false);
		}
	};

	const handleAdditionalInfoKeyDown = (
		e: React.KeyboardEvent<HTMLTextAreaElement>
	) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleFindRecipe();
		}
	};

	return (
		<div className={styles.pageWrapper}>
			<div className={styles.container}>
				<header className={styles.header}>
					<h1 className={styles.title}>
						<Link to="/">
							<img
								src="/assets/icon_logo.png"
								alt="홈으로 가기"
								className={styles.logo}
							/>
						</Link>
					</h1>
				</header>
				<main className={styles.main}>
					<section className={styles.inputSection}>
						<div className={styles.inputGroup}>
							<label htmlFor="ingredients" className={styles.label}>
								재료
							</label>
							<textarea
								id="ingredients"
								className={styles.input}
								placeholder="예) 돼지고기, 양파, 당근, 감자, 대파"
								value={ingredients}
								onChange={(e) => setIngredients(e.target.value)}
							/>
						</div>
						<div className={styles.inputGroup}>
							<label htmlFor="cookingMethod" className={styles.label}>
								조리방법
							</label>
							<textarea
								id="cookingMethod"
								className={styles.input}
								placeholder="예) 볶음, 찜, 데침, 튀김"
								value={cookingMethod}
								onChange={(e) => setCookingMethod(e.target.value)}
							/>
						</div>
						<div className={styles.inputGroup}>
							<label htmlFor="additionalInfo" className={styles.label}>
								추가사항
							</label>
							<textarea
								id="additionalInfo"
								className={styles.input}
								placeholder="예: 저염식, 글루텐 프리, 매운맛 선호, 10분 이내 요리"
								value={additionalInfo}
								onChange={(e) => setAdditionalInfo(e.target.value)}
								onKeyDown={handleAdditionalInfoKeyDown}
							/>
						</div>
						<button
							className={styles.findButton}
							onClick={handleFindRecipe}
							disabled={isLoading}
						>
							{isLoading ? '레시피 찾는 중...' : '레시피 찾기'}
						</button>
					</section>
					<section className={styles.recipeSection}>
						<h2 className={styles.recipeTitle}>AI 추천 레시피</h2>
						<div className={styles.recipeBox}>
							{isLoading ? (
								<div className={styles.recipeGuide}>
									레시피를 생성하고 있습니다...
								</div>
							) : recommendedRecipe ? (
								<div className={styles.recipeContent}>{recommendedRecipe}</div>
							) : (
								<div className={styles.recipeGuide}>
									레시피 찾기 버튼을 클릭하면
									<br />
									AI가 추천한 레시피가 여기에 표시됩니다.
								</div>
							)}
						</div>
					</section>
				</main>
			</div>
		</div>
	);
};

export default RecipeAi;
