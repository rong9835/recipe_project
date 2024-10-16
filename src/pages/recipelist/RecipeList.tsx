import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Pagination } from 'antd';
import RecipeCard from '../../components/recipecard/RecipeCard';
import { db } from '../../firebase/config';
import {
	collection,
	getDocs,
	query,
	orderBy,
	limit,
	startAfter,
	where,
} from 'firebase/firestore';
import { Recipe } from '../../type/type';

const RecipeList = () => {
	const [recipes, setRecipes] = useState<Recipe[]>([]); // 레시피 배열
	const [currentPage, setCurrentPage] = useState(1);
	const [lastVisible, setLastVisible] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const pageSize = 9; // 페이지당 보여줄 레시피 개수
	const location = useLocation();

	// URL 파라미터에서 검색어와 옵션을 가져와 상태 초기화
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [selectedOption, setSelectedOption] = useState<string>('레시피');

	// URL 파라미터 변경 시 상태 초기화
	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const searchParam = queryParams.get('search') || '';
		const optionParam = queryParams.get('option') || '레시피'; // 기본 옵션 설정

		setSearchTerm(searchParam);
		setSelectedOption(optionParam);
	}, [location.search]);

	// 데이터를 페이징하여 가져오는 함수
	const fetchRecipes = async (page: number) => {
		setLoading(true);
		try {
			const recipeCollectionRef = collection(db, 'recipes');
			let recipeQuery = query(
				recipeCollectionRef,
				orderBy('add_at', 'desc'),
				limit(pageSize)
			);

			// 검색어와 옵션에 따라 Firestore 쿼리 수정
			if (searchTerm) {
				if (selectedOption === '레시피') {
					// Firestore에서 처음에는 모든 레시피를 가져오고 클라이언트 측에서 필터링
					const allRecipesSnapshot = await getDocs(recipeCollectionRef);
					const allRecipes: Recipe[] = allRecipesSnapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					})) as Recipe[];

					// 클라이언트 측에서 필터링
					const filteredRecipes = allRecipes.filter(
						(recipe) =>
							recipe.recipe_name
								.toLowerCase()
								.includes(searchTerm.toLowerCase()) // 대소문자 구분 없이 포함 여부 확인
					);

					setRecipes(filteredRecipes);
					setLoading(false); // 로딩 종료
					return; // Firestore 쿼리 없이 클라이언트 측 필터링으로 결과를 처리
				} else if (selectedOption === '태그') {
					recipeQuery = query(
						recipeQuery,
						where('recipe_tags', 'array-contains', searchTerm) // 배열 내 포함
					);
				} else if (selectedOption === '재료') {
					const allRecipesSnapshot = await getDocs(recipeCollectionRef);
					const allRecipes: Recipe[] = allRecipesSnapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					})) as Recipe[];

					// 클라이언트 측에서 필터링
					const filteredRecipes = allRecipes.filter((recipe) =>
						recipe.recipe_ingredients.some(
							(ingredient) =>
								ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) // 대소문자 구분 없이 포함 여부 확인
						)
					);

					setRecipes(filteredRecipes);
					setLoading(false); // 로딩 종료
					return; // Firestore 쿼리 없이 클라이언트 측 필터링으로 결과를 처리
				}
			}

			// 페이지가 1이 아닐 경우 lastVisible을 사용하여 쿼리 수정
			if (page > 1 && lastVisible) {
				recipeQuery = query(recipeQuery, startAfter(lastVisible));
			}

			// Firestore에서 쿼리 실행
			const recipeSnapshot = await getDocs(recipeQuery);
			const recipeList: Recipe[] = recipeSnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			})) as Recipe[];

			// 마지막 문서 정보 저장
			const lastVisibleDoc =
				recipeSnapshot.docs[recipeSnapshot.docs.length - 1];
			setLastVisible(lastVisibleDoc);

			// 페이지가 1일 때는 기존 데이터를 덮어쓰고, 이후 페이지는 추가
			if (page === 1) {
				setRecipes(recipeList);
			} else {
				setRecipes((prev) => [...prev, ...recipeList]);
			}

			// 검색 결과가 없을 때의 처리
			if (recipeList.length === 0) {
				console.log('검색 결과가 없습니다.');
			}
		} catch (error) {
			console.error('Error fetching recipes:', error);
		} finally {
			setLoading(false);
		}
	};

	// 페이지 변경 시 데이터를 다시 불러옴
	useEffect(() => {
		fetchRecipes(currentPage);
		console.log(searchTerm, 'searchTerm');
		console.log(selectedOption, 'selectedOption');
	}, [currentPage, searchTerm, selectedOption]); // 검색어와 옵션이 변경될 때도 재호출

	return (
		<div>
			<div>RecipeList 화면</div>
			<div>
				{recipes.map((recipe) => (
					<RecipeCard key={recipe.id} recipe={recipe} />
				))}
			</div>
			{loading && <div>로딩 중...</div>}
			<Pagination
				current={currentPage}
				pageSize={pageSize}
				total={recipes.length} // Firestore에서 전체 개수를 가져오는 로직도 추가 가능
				onChange={(page) => {
					setCurrentPage(page);
					if (page > 1) {
						fetchRecipes(page);
					}
				}}
			/>
		</div>
	);
};

export default RecipeList;
