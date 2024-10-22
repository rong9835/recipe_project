import { useEffect } from 'react';

export const usePageStyle = () => {
	useEffect(() => {
		// 이전 스타일을 저장
		const originalStyles = {
			html: document.documentElement.style.cssText,
			body: document.body.style.cssText,
			root: document.getElementById('root')?.style.cssText || '',
		};

		// HTML과 body 스타일 설정
		document.documentElement.style.cssText = `
            height: 100%;
            overflow: hidden;
        `;

		document.body.style.cssText = `
            height: 100%;
            margin: 0;
            padding: 0;
            background-color: #FFF9E9;
            font-family: 'SUIT Variable', sans-serif;
            overflow: hidden;
        `;

		// root 요소 스타일 설정
		const rootElement = document.getElementById('root') as HTMLElement | null;
		if (rootElement) {
			rootElement.style.height = '100%';
			rootElement.style.overflowY = 'auto';
		}

		// loginContainer 스타일 수정
		const loginContainer = document.querySelector(
			'.loginContainer'
		) as HTMLElement | null;
		if (loginContainer) {
			loginContainer.style.maxHeight = 'none';
			loginContainer.style.height = 'auto';
			loginContainer.style.overflowY = 'visible';
		}

		// 클린업 함수
		return () => {
			// 원래 스타일로 복원
			document.documentElement.style.cssText = originalStyles.html;
			document.body.style.cssText = originalStyles.body;
			if (rootElement) {
				rootElement.style.cssText = originalStyles.root;
			}
			if (loginContainer) {
				loginContainer.style.maxHeight = '';
				loginContainer.style.height = '';
				loginContainer.style.overflowY = '';
			}
		};
	}, []);
};
