import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Search.module.css';
import CustomButton, { ButtonType } from '../custombutton/CustomButton';

const Search = () => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState(
		queryParams.get('option') || '레시피'
	);
	const [searchTerm, setSearchTerm] = useState(queryParams.get('search') || '');
	const [placeholder, setPlaceholder] = useState('검색어를 입력해주세요');
	const menuRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();

	const options = ['레시피', '태그', '재료'];

	// 드롭다운을 토글하는 함수
	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	// 메뉴 외부 클릭 시 드롭다운을 닫는 함수
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	// 쿼리 파라미터가 변경될 때 상태 초기화
	useEffect(() => {
		const search = queryParams.get('search');
		const option = queryParams.get('option');

		if (search !== null) {
			setSearchTerm(search);
		} else {
			setSearchTerm('');
		}

		if (option !== null) {
			setSelectedOption(option);
		} else {
			setSelectedOption('레시피');
		}
	}, [location.search]);

	// 옵션을 선택하는 함수
	const handleOptionSelect = (option: string) => {
		setSelectedOption(option);
		setIsOpen(false); // 선택 후 드롭다운 닫기
		// 선택된 옵션에 따라 placeholder 업데이트
		switch (option) {
			case '레시피':
				setPlaceholder('검색어를 입력해주세요');
				break;
			case '태그':
				setPlaceholder('여러개의 태그는 , 로 구분해주세요');
				break;
			case '재료':
				setPlaceholder('여러개의 재료는 , 로 구분해주세요');
				break;
			default:
				setPlaceholder('검색어를 입력해주세요');
		}
	};

	// 엔터 키 누를 시 검색 수행
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			navigate(`/recipelist?search=${searchTerm}&option=${selectedOption}`);
		}
	};

	return (
		<div className={styles.searchSection}>
			{/* 드롭다운 버튼 */}
			<div ref={menuRef} className={styles.dropDownContainer}>
				<button
					onClick={toggleMenu}
					className={`${styles.dropDownBtn} ${isOpen ? styles.open : ''}`}
				>
					{selectedOption}
				</button>

				{/* 드롭다운 메뉴 */}
				{isOpen && (
					<ul className={styles.dropDownMenu}>
						{options
							.filter((option: string) => option !== selectedOption)
							.map((option: string) => (
								<li
									key={option}
									onClick={() => handleOptionSelect(option)}
									className={styles.dropDownItem}
								>
									{option}
								</li>
							))}
					</ul>
				)}
			</div>

			{/* 검색 입력 및 링크 */}
			<input
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder={placeholder}
				className={styles.searchInput}
				onKeyDown={handleKeyDown}
			/>
			<Link to={`/recipelist?search=${searchTerm}&option=${selectedOption}`}>
				<CustomButton btnType={ButtonType.Search} color="orange">
					검색
				</CustomButton>
			</Link>
		</div>
	);
};

export default Search;
