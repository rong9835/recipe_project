import backIcon from '../../assets/icon_back.png';
import heartIcon from '../../assets/icon_heart.png';
import viewIcon from '../../assets/icon_view.png';
import sampleImage from '../../assets/sample_img.jpg';
import heartEmpty from '../../assets/icon_heart_empty.png';
import heartPull from '../../assets/icon_heart_pull.png';
import CustomButton, {
	ButtonType,
} from '../../components/custombutton/CustomButton';
import styled from './RecipeDetail.module.css';

import { getFirestore, getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GroupedIngredientList from '../../components/recipedetailpage/GroupedIngredientList';
import RecipeSteps from './../../components/recipedetailpage/RecipeSteps';

interface RecipeTime {
	hours: number;
	minutes: number;
}

interface RecipeCreateTime {
	seconds: number;
	nanoseconds: number;
}

interface RecipeIngredient {
	name: string;
	volume: number | string;
}

interface RecipeStep {
	step_description: string;
	step_image_url: string | number;
}

interface Recipe {
	recipe_name: string;
	recipe_create_time: RecipeCreateTime;
	recipe_time: RecipeTime;
	recipe_difficulty: string | number;
	recipe_ingredients: RecipeIngredient[];
	recipe_steps: RecipeStep[];
	recipe_tips: string;

	image_url: string;
	hearted: boolean;
	hearts: number;
	views: number;
}

export default function RecipeDetail() {
	const [recipeData, setRecipeData] = useState<Recipe | null>(null);

	const db = getFirestore();
	const auth = getAuth();
	const navigate = useNavigate();

	useEffect(() => {
		const getRecipe = async () => {
			try {
				const docRef = doc(db, 'recipes', 'ClSPjrXxycVbzNW8ZXrR');
				const recipeDoc = await getDoc(docRef);

				if (recipeDoc.exists()) {
					setRecipeData(recipeDoc.data() as Recipe);
				} else {
					navigate('/404');
				}
			} catch (error) {
				navigate('/404');
				console.log('데이터 전송 오류', error);
			}
		};

		getRecipe();
	}, [db, navigate]);

	console.log(recipeData);

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

	return (
		<>
			<section className={styled.recipeDetailPage}>
				<h2 className={styled.srOnly}>레시피 디테일 페이지</h2>

				<nav>
					<img src={backIcon} alt="뒤로 가기" />
					<ul className={styled.pageTitle}>
						<li className={styled.pointFont}>Special Cooking Recipe</li>
						<li>
							<em>아인맘 's</em> 레시피
						</li>
					</ul>
					<CustomButton btnType={ButtonType.Edit} color="orange" shape="rad10">
						수정하기
					</CustomButton>
				</nav>

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

					<img src={recipeData?.image_url} alt="레시피 메인 이미지" />
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
							<p>{recipeData?.recipe_difficulty}</p>
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
				</section>

				<section className={styled.comment}>
					<h3>댓글 | Comment</h3>
					<div className={styled.commentInput}>
						<label htmlFor="comment">
							<textarea
								id="comment"
								placeholder="특별한 레시피를 남겨준 `@{user}` 에게 따듯한 댓글을 남겨주세요 ♥"
							/>
						</label>

						<button type="submit">등록</button>
					</div>

					<div className={styled.commentList}>
						<ul className={styled.commentWriterInfo}>
							<li>diayhew5869</li>
							<li>2024/09/24 11:32</li>
						</ul>
						<div className={styled.commentSettingsBtn}>
							<CustomButton
								btnType={ButtonType.Edit}
								color="orange"
								shape="rad30"
							>
								수정
							</CustomButton>
							<CustomButton
								btnType={ButtonType.Delete}
								color="white"
								shape="rad30"
							>
								삭제
							</CustomButton>
						</div>
						<p>
							고개를 들고 하늘을 쳐다보며 맨 꼬리가 되었어요 그래 실린 버들고리
							사이에 의젓이 어머나 저렇게 많아 참 것이었습니다 이때까지 밤하늘이
							그렇게도 정기와 소나기 뒤에 싸늘하게 바라보아도 내 눈은 지칠
							지팡이를 냅다 던졌어요 프로방스의 언덕배기에서 나를 부르는 소리가
							뒤척이는 서슬에 짚이 버스럭거리며 선뜻 나오질 않았습니다 그리고
							줄을 몰랐습니다 그때까지 그렇게
						</p>
					</div>

					<div className={styled.pagenation}>
						<span></span> 1 2 3 4 5 <span></span>
					</div>
				</section>
			</section>

			<aside className={styled.stickyHeartIcon}>
				<img src={heartEmpty} alt="비어있는 좋아요 아이콘" />
			</aside>
		</>
	);
}
