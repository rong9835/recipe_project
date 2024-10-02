import React, { useState } from 'react';
import styles from './Login.module.css';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('로그인 성공');
    } catch (error) {
      console.error('로그인 실패:', error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log('구글 로그인 성공');
    } catch (error) {
      console.error('구글 로그인 실패:', error.message);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>레시피 연구소</h1>
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
          <p className={styles.warning}>아이디 또는 비밀번호를 입력해주세요</p>
          <button onClick={handleGoogleLogin} className={styles.googleButton}>
            <img src="/path-to-google-icon.png" alt="Google" /> 구글로 로그인하기
          </button>
          <button type="submit" className={styles.loginButton}>로그인하기</button>
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
}

export default Login;