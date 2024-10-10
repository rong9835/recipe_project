import { useState } from 'react';
import styles from './SignUp.module.css';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/config';

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

    const signUpInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUpValues({
            ...signUpValues,
            [name]: value,
        });
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
        <main>
            <div>Logo</div>
            <form onSubmit={signUpFormSubmit}>
                <div>
                    <input type="email" name="email" value={signUpValues.email} onChange={signUpInputChange} placeholder="이메일 형식으로 입력해 주세요." required /> 
                    <input type="password" name="password" value={signUpValues.password} onChange={signUpInputChange} placeholder="비밀번호 6자리 이상 입력해 주세요." required />
                    <input type="password" name="confirmPassword" value={signUpValues.confirmPassword} onChange={signUpInputChange} placeholder="비밀번호 확인" required />
                    <input type="text" name="name" value={signUpValues.name} onChange={signUpInputChange} placeholder="이름을 입력해 주세요." required />
                    <input type="text" name="nickname" value={signUpValues.nickname} onChange={signUpInputChange} placeholder="닉네임을 입력해 주세요." required />
                    <input type="tel" name="phone" value={signUpValues.phone} onChange={signUpInputChange} placeholder="연락처를 입력해 주세요." required />
                </div>
                <div>
                    <button type="submit" disabled={isLoading}>회원가입 버튼</button> 
                </div>
                {errMsg && <div>{errMsg}</div>}
            </form>
            <div>
                로그인 페이지 이동
            </div>
        </main>
    );
}
