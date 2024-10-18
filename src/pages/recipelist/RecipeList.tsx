import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Pagination } from 'antd';
import RecipeCard from '../../components/recipecard/RecipeCard';
import { auth, db } from '../../firebase/config';
import {
	collection,
	getDocs,
	query,
	orderBy,
	limit,
	startAfter,
} from 'firebase/firestore';
import { Recipe } from '../../type/type';
import PlusMenuBtn from '../../components/plusmenubutton/PlusMenuBtn';
import { onAuthStateChanged } from 'firebase/auth';
import styles from './RecipeList.module.css';
import CustomButton, {
	ButtonType,
} from '../../components/custombutton/CustomButton';

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
	// URL 파라미터에서 검색어와 옵션을 가져와 상태 초기화
	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const searchParam = queryParams.get('search') || '';
		const optionParam = queryParams.get('option') || '레시피'; // 기본 옵션 설정

		setSearchTerm(searchParam);
		setSelectedOption(optionParam);
		fetchRecipes(currentPage); // URL 파라미터가 변경될 때마다 데이터를 가져옵니다.
	}, [location.search]); // URL 파라미터가 변경될 때마다 호출

	// 데이터를 페이징하여 가져오는 함수
	const fetchRecipes = async (page: number) => {
		setLoading(true);
		try {
			const recipeCollectionRef = collection(db, 'recipes');
			let recipeQuery = query(
				recipeCollectionRef,
				orderBy('recipe_create_time', 'desc'),
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
					const allRecipesSnapshot = await getDocs(recipeCollectionRef);
					const allRecipes: Recipe[] = allRecipesSnapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					})) as Recipe[];

					// 클라이언트 측에서 필터링
					const filteredRecipes = allRecipes.filter((recipe) =>
						recipe.recipe_tags.some(
							(recipe_tag) =>
								recipe_tag.toLowerCase().includes(searchTerm.toLowerCase()) // 대소문자 구분 없이 포함 여부 확인
						)
					);

					setRecipes(filteredRecipes);
					setLoading(false); // 로딩 종료
					return;
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
					return;
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
			window.scrollTo(0, 0);
		}
	};

	// 페이지 변경 시 데이터를 다시 불러옴
	useEffect(() => {
		fetchRecipes(currentPage);
	}, [currentPage, searchTerm, selectedOption]); // 검색어와 옵션이 변경될 때도 재호출

	const [isOpen, setIsOpen] = useState(false);
	const plusRef = useRef<HTMLUListElement>(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();

	const handleOptionClick = (path: string) => {
		if (!isLoggedIn) {
			navigate('/login'); // 로그인되지 않았다면 로그인 페이지로 리다이렉트
		} else {
			navigate(path); // 로그인된 경우 해당 경로로 이동
		}
	};

	useEffect(() => {
		const currentUrl = window.location.href;

		if (currentUrl.includes('/recipelist')) {
			document.body.style.marginTop = '200px';
			document.body.style.backgroundColor = '#FFF9E9';
		}

		const handleClickOutside = (event: MouseEvent) => {
			if (plusRef.current && !plusRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setIsLoggedIn(!!user); // user가 존재하면 true, 아니면 false
		});

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.body.style.backgroundColor = '';
			document.body.style.marginTop = '';
			unsubscribe();
		};
	}, []);

	const options = [
		{ label: '레시피 작성하기', path: '/create' },
		{ label: 'AI 추천 레시피', path: '/' },
		{ label: '마이페이지', path: '/profile' },
	];

	const filterOptions = [
		{ label: '전체보기', value: '전체보기' },
		{ label: 'Lv 1', value: 1 },
		{ label: 'Lv 2', value: 2 },
		{ label: 'Lv 3', value: 3 },
	];

	// 상태 초기화: 전체보기로 기본값 설정
	const [selectedFilter, setSelectedFilter] = useState<string | number>(
		filterOptions[0].value
	);

	const handleFilterClick = (fOption: any) => {
		setSelectedFilter(fOption.value);
		console.log(selectedFilter);
	};

	// 필터링된 레시피 생성
	const filteredRecipes = recipes.filter((recipe) => {
		if (selectedFilter === '전체보기') {
			return true;
		} else if (selectedFilter === recipe.recipe_difficulty) {
			return true;
		}
		return false;
	});

	return (
		<div>
			<div>
				<div className={styles.filterBtnWrapper}>
					{filterOptions.map((fOption) => (
						<CustomButton
							btnType={ButtonType.Filter}
							shape="rad30"
							color={selectedFilter === fOption.value ? 'orange' : 'white'}
							onClick={() => handleFilterClick(fOption)}
							key={fOption.value}
						>
							{fOption.label}
						</CustomButton>
					))}
				</div>
				<div></div>
			</div>
			<div className={styles.recipeGrid}>
				{filteredRecipes.map((recipe) => (
					<RecipeCard key={recipe.id} recipe={recipe} />
				))}
			</div>
			{loading && <div className={styles.loading}>로딩 중...</div>}
			<Pagination
				className={styles.pagination}
				current={currentPage}
				pageSize={pageSize}
				total={filteredRecipes.length} // Firestore에서 전체 개수를 가져오는 로직도 추가 가능
				onChange={(page) => {
					setCurrentPage(page);
					if (page > 1) {
						fetchRecipes(page);
					}
				}}
			/>
			<PlusMenuBtn isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			{isOpen && (
				<ul className={styles.plusMenu} ref={plusRef}>
					{/* 각 옵션을 Link로 감싸 경로를 추가 */}
					{options.map((option) => (
						<li key={option.label}>
							<span
								className={styles.plusMenuList}
								onClick={() => handleOptionClick(option.path)}
							>
								{option.label}
							</span>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default RecipeList;
