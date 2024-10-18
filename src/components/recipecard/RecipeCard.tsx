import styles from './RecipeCard.module.css'; // 필요한 스타일 모듈 임포트
import heartImg from '../../assets/icon_heart.svg'; // 하트 아이콘 임포트
import viewImg from '../../assets/icon_views.svg';
import { Recipe } from '../../type/type';
import { useNavigate } from 'react-router-dom';
import { Tag } from 'antd';
import CustomButton, { ButtonType } from '../custombutton/CustomButton';
import cardArrowImg from '../../assets/icon_card_arrow.svg';
import ellipsisImg from '../../assets/icon_ellipsis.svg';
import { useAuth } from '../../context/AuthContext';

interface RecipeCardProps {
	recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
	const navigate = useNavigate();
	const { user } = useAuth();

	const levelCircle = (difficulty: number) => {
		return (
			<div className={styles.outerCircle}>
				<div className={styles.innerCircle}>
					<span>Lv {difficulty}</span>
				</div>
			</div>
		);
	};

	// 클릭 시 경로 이동 함수
	const handleNavigate = () => {
		if (!user) {
			alert('로그인 하셔야합니다.');
			navigate('/login');
		} else {
			navigate(`/recipedetail/${recipe.id}`);
		}
	};

	return (
		<div className={styles.recipeCard} onClick={handleNavigate}>
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
				<div className={styles.recipeInfoHeader}>
					<h3 className={styles.recipeTitle}>{recipe.recipe_name}</h3>
					<div className={styles.viewsAndHearts}>
						<div className={styles.recipeViews}>
							<img src={viewImg} alt="views" className={styles.viewIcon} />
							<span className={styles.viewText}>{recipe.views}</span>
						</div>
						<span className={styles.seperator}></span>
						<div className={styles.recipeHearts}>
							<img src={heartImg} alt="heart" className={styles.heartIcon} />
							<span className={styles.heartText}>{recipe.hearts}</span>
						</div>
					</div>
				</div>
				<div className={styles.recipeDesc}>
					<span className={styles.recipeDescText}>
						{recipe.recipe_description}
					</span>
				</div>
				<div className={styles.recipeIngAndBtn}>
					<div className={styles.recipeIngredients}>
						{recipe.recipe_ingredients.map((ingredient, index) => (
							<Tag key={index} className={styles.ingredient}>
								{ingredient.name}
							</Tag>
						))}
					</div>
					<img src={ellipsisImg} alt="말 줄임표" />
					<CustomButton
						btnType={ButtonType.Move}
						shape="circle"
						color="orange"
						size="small"
					>
						<img src={cardArrowImg} alt="카드 화살표" />
					</CustomButton>
				</div>
			</div>
		</div>
	);
};

export default RecipeCard;
