import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import styles from './ForgotPassword.module.css';
import { Link } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [isPasswordReset, setIsPasswordReset] = useState(true);
  const [error, setError] = useState('');

  const auth = getAuth();
  const db = getFirestore();

  const findEmail = async (name: string, contact: string) => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('user_name', '==', name), where('user_phone_number', '==', contact));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      return userDoc.data().user_email;
    }
    return null;
  };

  const verifyEmailAndContact = async (email: string, contact: string) => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('user_email', '==', email), where('user_phone_number', '==', contact));
    const querySnapshot = await getDocs(q);
    
    return !querySnapshot.empty;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isPasswordReset) {
      if (!email || !contact) {
        setError('이메일과 연락처를 모두 입력해주세요.');
        return;
      }

      try {
        const isVerified = await verifyEmailAndContact(email, contact);
        if (isVerified) {
          await sendPasswordResetEmail(auth, email);
          alert('비밀번호 재설정 이메일을 보냈습니다. 이메일을 확인해주세요.');
        } else {
          setError('입력한 정보와 일치하는 계정을 찾을 수 없습니다.');
        }
      } catch (error: unknown) {
        console.error('Error resetting password:', error);
        setError('비밀번호 재설정 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } else {
      if (!name || !contact) {
        setError('이름과 연락처를 입력해주세요.');
        return;
      }

      try {
        const foundEmail = await findEmail(name, contact);
        if (foundEmail) {
          const maskedEmail = `${foundEmail.substring(0, 3)}***@${foundEmail.split('@')[1]}`;
          alert(`일치하는 이메일: ${maskedEmail}`);
        } else {
          setError('등록된 회원정보가 없습니다.');
        }
      } catch (error) {
        console.error('Error finding email:', error);
        setError('오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <img src="./src/assets/icon_logo.png" alt="" />
      </h2>
      <div className={styles.toggleContainer}>
        <button
          className={`${styles.toggleButton} ${!isPasswordReset ? styles.active : ''}`}
          onClick={() => {
            setIsPasswordReset(false);
            setError('');
          }}
        >
          가입한 이메일 찾기
        </button>
        <button
          className={`${styles.toggleButton} ${isPasswordReset ? styles.active : ''}`}
          onClick={() => {
            setIsPasswordReset(true);
            setError('');
          }}
        >
          비밀번호 찾기
        </button>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        {!isPasswordReset ? (
          <>
            <label className={styles.inputLabel}>이름</label>
            <input
              type="text"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              placeholder="이름을 입력해주세요"
              className={styles.input}
            />
          </>
        ) : (
          <>
            <label className={styles.inputLabel}>이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              placeholder="이메일을 입력해주세요"
              className={styles.input}
            />
          </>
        )}
        <label className={styles.inputLabel}>연락처</label>
        <input
          type="tel"
          value={contact}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setContact(e.target.value)
          }
          placeholder="등록한 연락처를 입력해주세요"
          className={styles.input}
        />

        {error && <div className={styles.errorMessage}>{error}</div>}
        <button type="submit" className={styles.submitButton}>
          {isPasswordReset ? '비밀번호 재설정' : '이메일 찾기'}
        </button>
      </form>
      <div className={styles.footer}>
        <Link to="/login">로그인</Link> <span>|</span> <Link to="/signup">회원가입</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;