import styled from './RecipeDetail.module.css';
import react from '../../assets/react.svg';

export default function RecipeDetail() {
	return (
		<>
			<section>
				<h2 className={styled.srOnly}>레시피 디테일 페이지</h2>

				<nav>
					<span></span>
					<ul>
						<li>Special Cooking Recipe</li>
						<li>아인맘 's 레시피</li>
					</ul>
					<button type="button">수정하기</button>
				</nav>

				<section className={styled.title}>
					<h3>치즈 홍가라비 오븐 찜</h3>

					<ul>
						<li>2024 / 09 / 24</li>
						<li>
							<span></span>2359
						</li>
						<li>
							<span></span>582
						</li>
					</ul>

					<img src={react} />
				</section>

				<section className={styled.contents}>
					<h3 className={styled.srOnly}>레시피 디테일 콘텐츠</h3>

					<ul>
						<li>조리시간 | Cooking time</li>
						<li>40분</li>
						<li>난이도 | Dirriculty level</li>
						<li>Lv 2</li>
					</ul>

					<h4>레시피 | Recipe</h4>
					<div>
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

					<div>
						<ol>
							<li>
								<span>01</span>
								<div>
									선뜻 나오질 않았습니다 그리고 적은 없었습니다 갑자기 사립문이
									내 눈앞에 와있는 나오질 않았습니다 그리고 그 있고 노라드
									아주머니는 휴가를 별나라에서 일어나는 일을 더 귀여운 천국의
									목자였습니다
								</div>
								<img />
							</li>
							<li>
								<span>01</span>
								<div>
									선뜻 나오질 않았습니다 그리고 적은 없었습니다 갑자기 사립문이
									내 눈앞에 와있는 나오질 않았습니다 그리고 그 있고 노라드
									아주머니는 휴가를 별나라에서 일어나는 일을 더 귀여운 천
								</div>
								<img />
							</li>
							<li>
								<span>01</span>
								<div>
									선뜻 나오질 않았습니다 그리고 적은 없었습니다 갑자기 사립문이
									내 눈앞에 와있는 나오질 않았습니다 그리고 그 있고 노라드
									아주머니는 휴가를 별나라에서 일어나는 일을 더 귀여운 천 국의
									목자였습니다 어머나 따라 성호를 긋고는 잠시 나란히 앉아
									있었습니다
								</div>
								<img />
							</li>
							<li>
								<span>01</span>
								<div>
									선뜻 나오질 않았습니다 그리고 적은 없었습니다 갑자기
									사립문이내 눈앞에 와있는 나오질
								</div>
								<img />
							</li>
							<li>
								<span>01</span>
								<div>
									선뜻 나오질 않았습니다 그리고 적은 없었습니다 갑자기 사립문이
									내 눈앞에 와있는 나오질 않았습니다 그리고 그 있고 노라드
									아주머니는 휴가를 별나라에서 일어나는 일을 더 귀여운 천 국의
									목자였습니다 어머나 따라 성호를 긋고는 잠시 나란히 앉아
									있었습니다
								</div>
								<img />
							</li>
						</ol>
					</div>

					<div>
						<h4>레시피 팁 | Recipe Tip</h4>
						<div>추가 설명이 없습니다.</div>
					</div>
				</section>

				<section>
					<h3>댓글 | Comment</h3>
					<div>
						<label htmlFor="comment">
							<input
								type="text"
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
