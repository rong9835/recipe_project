import { useState } from 'react';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const useStepImgUpload = () => {
	const storage = getStorage();
	const [uploadProgress, setUploadProgress] = useState<{
		[key: number]: number;
	}>({}); // 단계별 진행률 상태 추가

	const uploadStepImage = (file: File, index: number) => {
		return new Promise<string>((resolve, reject) => {
			const uniqueFileName = `${uuidv4()}_${file.name}`;
			const storageRef = ref(storage, `images/step/${uniqueFileName}`);
			const uploadTask = uploadBytesResumable(storageRef, file);

			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					setUploadProgress((prev) => ({ ...prev, [index]: progress })); // 단계별 진행률 업데이트
				},
				(error) => {
					console.error('Error uploading image:', error);
					reject(error);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						setUploadProgress((prev) => ({ ...prev, [index]: 0 })); // 업로드 완료 후 진행률 초기화
						resolve(downloadURL);
					});
				}
			);
		});
	};

	return {
		uploadStepImage,
		uploadProgress, // 단계별 업로드 진행률 반환
	};
};

export default useStepImgUpload;
