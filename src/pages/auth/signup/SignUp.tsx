import { useState } from 'react';
import styles from './SignUp.module.css';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../firebase/config';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';

interface SignUpValues {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    nickname: string;
    phone: string;
}

export default function SignUp() {
    const [signUpValues, setSignUpValues] = useState<SignUpValues>({
        email: '',
        password: '',
        confirmPassword: '',
        name:'',
        nickname:'',
        phone:''
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errMsg, setErrMsg] = useState<string>("");
    const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);
    const [nicknameAvailable, setNicknameAvailable] = useState<boolean | null>(null);
    const [phoneAvailable, setPhoneAvailable] = useState<boolean | null>(null);

    const signUpInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUpValues({
            ...signUpValues,
            [name]: value,
        });
    };

    const checkEmailAvailability = async () => {
        const q = query(collection(db, 'users'), where('email', '==', signUpValues.email));
        const querySnapshot = await getDocs(q);
        setEmailAvailable(querySnapshot.empty);
    }

    const checkNicknameAvailability = async () => {
        const q = query(collection(db, 'users'), where('nickname', '==', signUpValues.nickname));
        const querySnapshot = await getDocs(q);
        setNicknameAvailable(querySnapshot.empty); 
    };

    const checkPhoneAvailability = async () => {
        const q = query(collection(db, 'users'), where('phone', '==', signUpValues.phone));
        const querySnapshot = await getDocs(q);
        setPhoneAvailable(querySnapshot.empty); 
    };


    const signUpFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrMsg("");        
        
        if (isLoading || 
            signUpValues.email === "" || 
            signUpValues.password === "" || 
            signUpValues.confirmPassword === "" || 
            signUpValues.name === "" || 
            signUpValues.nickname === "" || 
            signUpValues.phone === "") { 
            return;
        }

        if (signUpValues.password !== signUpValues.confirmPassword) {
            setErrMsg("비밀번호가 일치하지 않습니다.");
            return;
        }

        if(!emailAvailable){
            setErrMsg("이미 사용 중인 이메일입니다.");
            return;
        }

        if (!nicknameAvailable){
            setErrMsg("이미 사용 중인 닉네임입니다.");
            return;
        }

        if(!phoneAvailable){
            setErrMsg("이미 사용 중인 번호입니다.");
            return;
        }

        try {
            setIsLoading(true);
            const userCreate = await createUserWithEmailAndPassword(
                auth,
                signUpValues.email,
                signUpValues.password
            );
            console.log("회원가입 성공:", userCreate.user);
        } catch (e) {
            if (e instanceof FirebaseError) {
                setErrMsg(e.message); 
            }
        } finally {
            setIsLoading(false); // 로딩 상태 해제
        }
    };
    
    return (
        <main className={styles.container}>
            <div className={styles.logo}>
                <img src="./src/assets/icon_logo.png" alt="" />
            </div>
            <form onSubmit={signUpFormSubmit}>
                <input type="email" name="email" value={signUpValues.email} onChange={signUpInputChange} onBlur={checkEmailAvailability} placeholder="이메일 형식으로 입력해 주세요." required className={styles.input}/>
                {emailAvailable === false && <div>{errMsg}</div>}
                <input type="password" name="password" value={signUpValues.password} onChange={signUpInputChange} placeholder="비밀번호 6자리 이상 입력해 주세요." required className={styles.input}/>
                <input type="password" name="confirmPassword" value={signUpValues.confirmPassword} onChange={signUpInputChange} placeholder="비밀번호 확인" required className={styles.input}/>
                <input type="text" name="name" value={signUpValues.name} onChange={signUpInputChange} placeholder="이름을 입력해 주세요." required className={styles.input}/>
                <input type="text" name="nickname" value={signUpValues.nickname} onChange={signUpInputChange} onBlur={checkNicknameAvailability} placeholder="닉네임을 입력해 주세요." required className={styles.input}/>
                {nicknameAvailable === false && <div>{errMsg}</div>}
                <input type="tel" name="phone" value={signUpValues.phone} onChange={signUpInputChange} onBlur={checkPhoneAvailability} placeholder="연락처를 입력해 주세요." required className={styles.input}/>
                {phoneAvailable === false && <div>{errMsg}</div>}
                <div className={styles.signupBtn}>
                    <button type="submit" disabled={isLoading}><span>회원가입</span></button> 
                </div>
                {errMsg && <div>{errMsg}</div>}
            </form>
            <div className={styles.pageLogin}>
                <Link to={'/login'}>
                    로그인하기
                </Link>
            </div>
        </main>
    );
}