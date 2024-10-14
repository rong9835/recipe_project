import { useState } from 'react';
import styles from './SignUp.module.css'

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

    const signUpInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUpValues({
            ...signUpValues,
            [name]: value,
        });
    };

    const signUpFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(signUpValues);
    };
    
    return(
        <main>
            <div>Logo</div>
            <form onSubmit={signUpFormSubmit}>
                <div>
                    <input type="email" name='email' value={signUpValues.email} onChange={signUpInputChange} placeholder="이메일" />
                    <input type="password" name='password' value={signUpValues.password} onChange={signUpInputChange} placeholder="비밀번호" />
                    <input type="password" name='confirmPassword' value={signUpValues.confirmPassword} onChange={signUpInputChange} placeholder="비밀번호 확인" />
                    <input type="text" name='name' value={signUpValues.name} onChange={signUpInputChange} placeholder="이름" />
                    <input type="text" name='nickname' value={signUpValues.nickname} onChange={signUpInputChange} placeholder="닉네임" />
                    <input type="tel" name='phone' value={signUpValues.phone} onChange={signUpInputChange} placeholder="연락처" />
                </div>
                <div>
                    <button type='submit'>회원가입 버튼</button>
                </div>
            </form>
            <div>
                로그인 페이지 이동
            </div>
        </main>
    );
}