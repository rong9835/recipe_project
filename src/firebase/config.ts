import { getAuth } from 'firebase/auth'; // 이 줄을 추가합니다
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_KEY,
	authDomain: import.meta.env.VITE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_APP_ID,
	measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// 이 줄을 추가합니다
export const auth = getAuth(app);
export { db, storage };
