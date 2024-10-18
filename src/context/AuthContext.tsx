import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase/config';
import {
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	GoogleAuthProvider,
	User,
} from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';

// 로그인 상태와 관련된 context 값의 타입 정의
interface AuthContextProps {
	user: User | null;
	nickname: string | null;
	loading: boolean;
	login: (email: string, password: string) => Promise<void>;
	googleLogin: () => Promise<void>;
	logout: () => Promise<void>;
}

// AuthContext 생성
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Context 사용을 위한 커스텀 훅
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth는 AuthProvider 안에서만 사용할 수 있습니다.');
	}
	return context;
};

// AuthProvider 컴포넌트
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [nickname, setNickname] = useState<string | null>(null); // 닉네임 상태 추가
	const [loading, setLoading] = useState(true);

	// Firebase Auth 상태를 확인하고 로그인 여부 관리
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
			setUser(currentUser);
			setLoading(false);

			// 유저가 로그인된 경우 Firestore에서 닉네임을 가져옴
			if (currentUser) {
				try {
					const fetchedNickname = await getUserNicknameByEmail(
						currentUser.email!
					);

					setNickname(fetchedNickname); // 닉네임 설정
				} catch (error) {
					console.error('닉네임을 가져오는데 실패했습니다:', error);
				}
			} else {
				setNickname(null); // 로그아웃된 경우 닉네임 초기화
			}
		});

		return () => unsubscribe();
	}, []);

	// 이메일/비밀번호 로그인 함수
	const login = async (email: string, password: string) => {
		setLoading(true);
		try {
			await signInWithEmailAndPassword(auth, email, password);
			console.log(email);
		} catch (error) {
			console.error('로그인 실패:', error);
			throw error; // 로그인 컴포넌트에서 처리할 수 있도록 예외를 던짐
		} finally {
			setLoading(false);
		}
	};

	// 구글 로그인 함수
	const googleLogin = async () => {
		const provider = new GoogleAuthProvider();
		setLoading(true);
		try {
			await signInWithPopup(auth, provider);
		} catch (error) {
			console.error('구글 로그인 실패:', error);
			throw error; // 로그인 컴포넌트에서 처리할 수 있도록 예외를 던짐
		} finally {
			setLoading(false);
		}
	};

	// 로그아웃 함수
	const logout = async () => {
		try {
			await signOut(auth);
		} catch (error) {
			console.error('로그아웃 실패:', error);
		}
	};

	// 이메일로 유저 닉네임을 조회하는 함수
	const getUserNicknameByEmail = async (email: string) => {
		try {
			const userCollectionRef = collection(db, 'users'); // 'users'는 Firestore의 컬렉션 이름
			const q = query(userCollectionRef, where('user_email', '==', email)); // email 필드로 쿼리
			const querySnapshot = await getDocs(q);

			if (!querySnapshot.empty) {
				const userDoc = querySnapshot.docs[0]; // 첫 번째 일치하는 도큐먼트
				const userData = userDoc.data();
				return userData.user_nickname; // 닉네임 반환
			} else {
				throw new Error('일치하는 유저가 없습니다.');
			}
		} catch (error) {
			console.error('Firestore에서 닉네임 조회 실패:', error);
			throw error;
		}
	};

	return (
		<AuthContext.Provider
			value={{ user, nickname, loading, login, googleLogin, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};
