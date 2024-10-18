import backIcon from '../../assets/icon_back.png';
import heartIcon from '../../assets/icon_heart.png';
import viewIcon from '../../assets/icon_view.png';
import heartEmpty from '../../assets/icon_heart_empty.png';
import heartPull from '../../assets/icon_heart_pull.png';
import styled from './RecipeDetail.module.css';

import { getFirestore, getDoc, doc, deleteDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GroupedIngredientList from '../../components/recipedetailpage/GroupedIngredientList';

import RecipeSteps from './../../components/recipedetailpage/RecipeSteps';
import Comments from '../../components/recipedetailpage/Comments';
import CustomButton, {
	ButtonType,
} from '../../components/custombutton/CustomButton';
import { Tag } from 'antd';
import { Recipe } from '../../type/type';
import { useAuth } from '../../context/AuthContext';

export default function RecipeDetail() {
	const [recipeData, setRecipeData] = useState<Recipe | null>(null);
	const [isAuthor, setIsAuthor] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const { id: recipeId } = useParams<{ id: string }>();
	console.log(recipeId);

	const db = getFirestore();

	const user = useAuth();

	const navigate = useNavigate();

	const getRecipe = async () => {
		try {
			// recipeId를 doc 함수에 제대로 전달
			if (recipeId) {
				const docRef = doc(db, 'recipes', recipeId);
				const recipeDoc = await getDoc(docRef);

				if (recipeDoc.exists()) {
					const recipe = recipeDoc.data() as Recipe;
					setRecipeData(recipe);

					// 사용자가 레시피 작성자인지 확인
					if (user.nickname === recipe.author.user_nickname) {
						setIsAuthor(true);
					}
				} else {
					navigate('/404');
				}
			}
		} catch (error) {
			navigate('/404');
			console.log('데이터 전송 오류', error);
		} finally {
			setIsLoading(false);
		}
	};

	const recipeAuthor = recipeData?.author?.user_nickname;

	useEffect(() => {
		getRecipe();
	}, [db, navigate, user]);

	// 작성한 날짜 데이터 받아오기
	function createTime(seconds: number | undefined): string {
		if (typeof seconds === 'undefined') {
			return '비어있는 값입니다.';
		}
		const date = new Date(seconds * 1000);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');

		return `${year}-${month}-${day}`;
	}

	const times = {
		seconds: recipeData?.recipe_create_time.seconds,
		nanoseconds: recipeData?.recipe_create_time.nanoseconds,
	};
	const formatDay = createTime(times.seconds);

	// 레시피 팁 데이터의 여부를 확인하고 있으면 데이터를 넣고, 없으면 문구를 넣는다.
	const recipeTip: () => string = () => {
		return recipeData?.recipe_tips
			? recipeData.recipe_tips
			: '추가 설명이 없습니다.';
	};

	// 레시피 수정하기
	const updateRecipeHandler = (
		e: React.MouseEvent<HTMLButtonElement>
	): void => {
		navigate(`/edit/:${recipeId}`);
	};

	// 레시피 삭제하기
	const deleteRecipeHandler = async (
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		const isConfirmed = window.confirm('정말로 삭제하시겠습니까?');

		if (isConfirmed && recipeId) {
			try {
				const docRef = doc(db, 'recipes', recipeId);
				await deleteDoc(docRef);
				alert('삭제되었습니다.');
				navigate(-1);
			} catch (error) {
				console.error('문서 삭제 오류', error);
			}
		}
	};

	const backBtn = () => {
		navigate(-1);
	};

	// url에 따라 스타일 적용하기
	useEffect(() => {
		const currentUrl = window.location.href;

		if (currentUrl.includes('/recipedetail')) {
			document.body.style.marginTop = '100px';
			document.body.style.backgroundColor = '#fff9e9';
		}

		window.scrollTo(0, 0);
		return () => {
			document.body.style.marginTop = '';
			document.body.style.backgroundColor = '';
		};
	}, []);

	return (
		<>
			<section className={styled.recipeDetailPage}>
				<h2 className={styled.srOnly}>레시피 디테일 페이지</h2>

				<header className={styled.navWrap}>
					<nav>
						<div className={styled.imgWrap} onClick={backBtn}>
							<img src={backIcon} alt="뒤로 가기" />
						</div>
						<ul className={styled.pageTitle}>
							<li className={styled.pointFont}>Special Cooking Recipe</li>
							<li>
								<em>{recipeData?.author.user_nickname} 's</em> 레시피
							</li>
						</ul>

						{isLoading ? (
							<></>
						) : (
							<div className={styled.udBtn}>
								{isAuthor && (
									<>
										<CustomButton
											btnType={ButtonType.Edit}
											color="orange"
											shape="rad10"
											onClick={updateRecipeHandler}
										>
											수정하기
										</CustomButton>
										<CustomButton
											btnType={ButtonType.Edit}
											color="white"
											shape="rad10"
											onClick={deleteRecipeHandler}
										>
											삭제하기
										</CustomButton>
									</>
								)}
							</div>
						)}
					</nav>
				</header>

				<section className={styled.recipeTitle}>
					<h3>{recipeData?.recipe_name}</h3>

					<ul>
						<li>{formatDay}</li>
						<li>
							<img src={viewIcon} alt="조회수 아이콘" />
							{recipeData?.views}
						</li>
						<li>
							<img src={heartIcon} alt="좋아요 아이콘" />
							{recipeData?.hearts}
						</li>
					</ul>

					<p className={styled.recipeDescription}>
						{recipeData?.recipe_description}
					</p>

					<img src={recipeData?.thumbnail_url} alt="레시피 메인 이미지" />
				</section>

				<section className={styled.contents}>
					<h3 className={styled.srOnly}>레시피 디테일 콘텐츠</h3>

					<div className={styled.cookingInfo}>
						<div>
							<h4 className={styled.pointFont}>
								조리시간 <em>Cooking time</em>
							</h4>
							<p>
								{recipeData?.recipe_time.hours}시간{' '}
								{recipeData?.recipe_time.minutes}분{' '}
							</p>
						</div>

						<div>
							<h4 className={styled.pointFont}>
								난이도 <em>Difficulty level</em>
							</h4>
							<p>Lv {recipeData?.recipe_difficulty}</p>
						</div>
					</div>

					<div className={styled.cookingList}>
						<h4 className={styled.pointFont}>
							레시피 <em>Recipe</em>
						</h4>

						<div>
							{recipeData && (
								<GroupedIngredientList
									ingredients={recipeData.recipe_ingredients}
									className={styled.cookingIngredientList}
								/>
							)}
						</div>
					</div>

					<div className={styled.cookingList}>
						<RecipeSteps recipeData={recipeData || { recipe_steps: [] }} />
					</div>

					<div className={styled.recipeTip}>
						<h4>레시피 팁 | Recipe Tip</h4>
						<div>{recipeTip()}</div>
					</div>

					<div className={styled.recipeTag}>
						<h4>레시피 태그 | Recipe Tag</h4>
						{recipeData?.recipe_ingredients.map((ing: any, index: number) => (
							<Tag className={styled.customTag} key={index}>
								{ing.name}
							</Tag>
						))}
					</div>
				</section>

				<section className={styled.comment}>
					{recipeId && (
						<Comments
							recipeId={recipeId}
							recipeAuthor={recipeAuthor}
							users={user}
						/>
					)}
				</section>
			</section>

			{/* <aside className={styled.stickyHeartIcon} onClick={toggleHeart}>
				<img src={isHearted ? heartPull : heartEmpty} alt="좋아요 아이콘" />
			</aside> */}
		</>
	);
}
