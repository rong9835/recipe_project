import styles from './RecipeCard.module.css'; // 필요한 스타일 모듈 임포트
import heartImg from '../../assets/icon_heart.svg'; // 하트 아이콘 임포트
import CustomButton, { ButtonType } from '../custombutton/CustomButton';
import { Recipe } from '../../type/type';
import { Link } from 'react-router-dom';

interface RecipeCardProps {
	recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
	const levelCircle = (difficulty: number) => {
		return (
			<CustomButton
				btnType={ButtonType.Level}
				shape="circle"
				color="orange"
				size="medium"
			>
				<span>Lv {difficulty}</span>
			</CustomButton>
		);
	};

	return (
		<Link to={`/recipedetail/${recipe.id}`} className={styles.recipeCard}>
			<div className={styles.thumbnailContainer}>
				<img
					src={recipe.thumbnail_url}
					alt={recipe.recipe_name}
					className={styles.thumbnail}
				/>
				<div className={styles.levelBtnWrapper}>
					{levelCircle(recipe.recipe_difficulty)}
				</div>
			</div>

			<div className={styles.recipeInfo}>
				<h3 className={styles.recipeTitle}>{recipe.recipe_name}</h3>
				<div className={styles.recipeDetails}>
					<img src={heartImg} alt="heart" className={styles.heartIcon} />
					<span>{recipe.recipe_hearts}</span>
				</div>
				<div className={styles.recipeIngredients}>
					{recipe.recipe_ingredients.map((ingredient, index) => (
						<span key={index} className={styles.ingredient}>
							{ingredient.name}
						</span>
					))}
				</div>
			</div>
		</Link>
	);
};

export default RecipeCard;
