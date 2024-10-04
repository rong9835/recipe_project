import backIcon from '../../assets/icon_back.png';
import heartIcon from '../../assets/icon_heart.png';
import viewIcon from '../../assets/icon_view.png';
import sampleImage from '../../assets/sample_img.jpg';
import CustomButton, {
	ButtonType,
} from '../../components/custombutton/CustomButton';
import styled from './RecipeDetail.module.css';

export default function RecipeDetail() {
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
					<CustomButton
						btnType={ButtonType.Edit}
						size="medium"
						color="orange"
						shape="rad10"
					>
						수정하기
					</CustomButton>
				</nav>

				<section className={styled.recipeTitle}>
					<h3>치즈 홍가리비 오븐 찜</h3>

					<ul>
						<li>2024 / 09 / 24</li>
						<li>
							<img src={viewIcon} alt="조회수 아이콘" />
							2359
						</li>
						<li>
							<img src={heartIcon} alt="좋아요 아이콘" />
							582
						</li>
					</ul>

					<img src={sampleImage} />
				</section>

				<section className={styled.contents}>
					<h3 className={styled.srOnly}>레시피 디테일 콘텐츠</h3>

					<div className={styled.cookingInfo}>
						<div>
							<h4 className={styled.pointFont}>
								조리시간 <em>Cooking time</em>
							</h4>
							<p>40분</p>
						</div>

						<div>
							<h4 className={styled.pointFont}>
								난이도 <em>Difficulty level</em>
							</h4>
							<p>Lv 2</p>
						</div>
					</div>

					<div className={styled.cookingList}>
						<h4 className={styled.pointFont}>
							레시피 <em>Recipe</em>
						</h4>

						<div className={styled.cookingIngredientList}>
							<ul>
								<li>
									홍가리비<span>1kg</span>
								</li>
								<li>
									홍가리비<span>1kg</span>
								</li>
								<li>
									홍가리비<span>1kg</span>
								</li>
								<li>
									홍가리비<span>1kg</span>
								</li>
								<li>
									홍가리비<span>1kg</span>
								</li>
								<li>
									홍가리비<span>1kg</span>
								</li>
							</ul>
							<ul>
								<li>
									홍가리비<span>1kg</span>
								</li>
								<li>
									홍가리비<span>1kg</span>
								</li>
								<li>
									홍가리비<span>1kg</span>
								</li>
								<li>
									홍가리비<span>1kg</span>
								</li>
								<li>
									홍가리비<span>1kg</span>
								</li>
								<li>
									홍가리비<span>1kg</span>
								</li>
							</ul>
						</div>
					</div>

					<div className={styled.cookingList}>
						<ol>
							<li>
								<CustomButton
									btnType={ButtonType.Level}
									size="medium"
									color="orange"
									shape="circle"
								>
									01
								</CustomButton>
								<div>
									선뜻 나오질 않았습니다 그리고 적은 없었습니다 갑자기 사립문이
									내 눈앞에 와있는 나오질 않았습니다 그리고 그 있고 노라드
									아주머니는 휴가를 별나라에서 일어나는 일을 더 귀여운 천국의
									목자였습니다
								</div>
								<img src={sampleImage} />
							</li>
							<li>
								<CustomButton
									btnType={ButtonType.Level}
									size="medium"
									color="orange"
									shape="circle"
								>
									01
								</CustomButton>
								<div>
									선뜻 나오질 않았습니다 그리고 적은 없었습니다 갑자기 사립문이
									내 눈앞에 와있는 나오질 않았습니다 그리고 그 있고 노라드
									아주머니는 휴가를 별나라에서 일어나는 일을 더 귀여운 천
								</div>
							</li>
							<li>
								<CustomButton
									btnType={ButtonType.Level}
									size="medium"
									color="orange"
									shape="circle"
								>
									01
								</CustomButton>
								<div>
									선뜻 나오질 않았습니다 그리고 적은 없었습니다 갑자기 사립문이
									내 눈앞에 와있는 나오질 않았습니다 그리고 그 있고 노라드
									아주머니는 휴가를 별나라에서 일어나는 일을 더 귀여운 천 국의
									목자였습니다 어머나 따라 성호를 긋고는 잠시 나란히 앉아
									있었습니다
								</div>
							</li>
							<li>
								<CustomButton
									btnType={ButtonType.Level}
									size="medium"
									color="orange"
									shape="circle"
								>
									01
								</CustomButton>
								<div>
									선뜻 나오질 않았습니다 그리고 적은 없었습니다 갑자기
									사립문이내 눈앞에 와있는 나오질
								</div>
							</li>
							<li>
								<CustomButton
									btnType={ButtonType.Level}
									size="medium"
									color="orange"
									shape="circle"
								>
									01
								</CustomButton>
								<div>
									선뜻 나오질 않았습니다 그리고 적은 없었습니다 갑자기 사립문이
									내 눈앞에 와있는 나오질 않았습니다 그리고 그 있고 노라드
									아주머니는 휴가를 별나라에서 일어나는 일을 더 귀여운 천 국의
									목자였습니다 어머나 따라 성호를 긋고는 잠시 나란히 앉아
									있었습니다
								</div>
							</li>
						</ol>
					</div>

					<div className={styled.recipeTip}>
						<h4>레시피 팁 | Recipe Tip</h4>
						<div>추가 설명이 없습니다.</div>
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

					<div>
						<ul>
							<li>
								<ul>
									<li>diayhew5869</li>
									<li>2024/09/24 11:32</li>
									<li>
										<button type="button">수정</button>
									</li>
									<li>
										<button type="button">삭제</button>
									</li>
								</ul>
							</li>
							<li>
								고개를 들고 하늘을 쳐다보며 맨 꼬리가 되었어요 그래 실린
								버들고리 사이에 의젓이 어머나 저렇게 많아 참 것이었습니다
								이때까지 밤하늘이 그렇게도 정기와 소나기 뒤에 싸늘하게
								바라보아도 내 눈은 지칠 지팡이를 냅다 던졌어요 프로방스의
								언덕배기에서 나를 부르는 소리가 뒤척이는 서슬에 짚이
								버스럭거리며 선뜻 나오질 않았습니다 그리고 줄을 몰랐습니다
								그때까지 그렇게
							</li>
						</ul>
					</div>

					<div>
						<span></span> 1 2 3 4 5 <span></span>
					</div>
				</section>
			</section>
		</>
	);
}
