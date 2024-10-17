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
      overflow: hidden;
      background-color: #FFF9E9;
      font-family: 'SUIT Variable', sans-serif;
    `;

    // root 요소 스타일 설정
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.style.cssText = `
        height: 100%;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
      `;
    }

    // 클린업 함수
    return () => {
      // 원래 스타일로 복원
      document.documentElement.style.cssText = originalStyles.html;
      document.body.style.cssText = originalStyles.body;
      if (rootElement) {
        rootElement.style.cssText = originalStyles.root;
      }
    };
  }, []);
};