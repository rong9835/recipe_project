import styles from './Profile.module.css';

export default function Profile () {
    return(
        <main>
            <h1>마이페이지</h1>
            <section>
                <div>
                    <div>이미지 부분</div>
                    <span>회원이름</span>
                    <span>회원소개</span>
                </div>
                <div>
                    <div>이미지 부분</div>
                    <span>등록된 게시물</span>
                    <span>갯수</span>
                </div>
                <div>
                    <div>이미지 부분</div>
                    <span>뱃지 등급</span>
                    <span>갯수</span>
                </div>
            </section>
            <section>
                <div>
                    <div>레시피 | Recipe</div>
                    <div>
                        <button>등록한 레시피</button>
                        <button>좋아요 누른 레시피</button>
                    </div>
                </div>
                <div>
                    <div>회원정보 | User Info</div>
                    <div>
                        <button>정보수정</button>
                        <button>비밀번호 변경</button>
                        <button>회원탈퇴</button>
                    </div>                    
                </div>
            </section>
        </main>
    );
}
