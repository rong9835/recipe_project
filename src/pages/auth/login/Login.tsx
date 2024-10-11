import React, { useState } from 'react';
import styles from './Login.module.css';
import { auth } from '../../../firebase/config';
import {
	signInWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
} from 'firebase/auth';
import errorIcon from '../../assets/icon_error.png';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loginError, setLoginError] = useState('');

	const handleLogin = async (e: any) => {
		e.preventDefault();
		setLoginError('');

		if (!email || !password) {
			setLoginError('아이디 또는 비밀번호를 입력해주세요');
			return;
		}

		try {
			await signInWithEmailAndPassword(auth, email, password);
			console.log('로그인 성공');
		} catch (error) {
			console.error('로그인 실패:', error.message);
			setLoginError('아이디 또는 비밀번호가 올바르지 않습니다');
		}
	};

	const handleGoogleLogin = async () => {
		const provider = new GoogleAuthProvider();
		try {
			await signInWithPopup(auth, provider);
			console.log('구글 로그인 성공');
		} catch (error) {
			console.error('구글 로그인 실패:', error.message);
			setLoginError('구글 로그인에 실패했습니다. 다시 시도해주세요.');
		}
	};

	return (
		<div className={styles.loginContainer}>
			<div className={styles.loginBox}>
				<h1 className={styles.title}>
					<img src="./src/assets/icon_logo.png" alt="" />
				</h1>
				<form onSubmit={handleLogin}>
					<input
						type="email"
						placeholder="이메일을 입력해주세요"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className={styles.input}
					/>
					<input
						type="password"
						placeholder="비밀번호를 입력해주세요"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className={styles.input}
					/>
					{loginError && (
						<p className={styles.error}>
							<img src={errorIcon} alt="Error" className={styles.errorIcon} />
							{loginError}
						</p>
					)}
					<button
						type="button"
						onClick={handleGoogleLogin}
						className={styles.googleButton}
					>
						<img src="./src/assets/icon_google.png" alt="Google" /> 구글로
						로그인하기
					</button>
					<button type="submit" className={styles.loginButton}>
						로그인하기
					</button>
				</form>
				<div className={styles.links}>
					<a href="#">아이디 찾기</a> | <a href="#">비밀번호 찾기</a>
				</div>
				<p className={styles.signup}>
					아직 회원이 아니신가요? <a href="#">회원가입</a>
				</p>
			</div>
		</div>
	);
};

export default Login;
