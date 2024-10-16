import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';
import pageNotFoundImage from '../../../assets/icon_page_not_found.png'

const NotFound: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src={pageNotFoundImage} alt="PAGE NOT FOUND" className={styles.notFoundImage} />
        <p className={styles.message}>
          페이지의 주소가 잘못 입력되었거나,<br />
          주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
        </p>
        <Link to="/" className={styles.link}>
          메인 화면으로 가기 ───→
        </Link>
      </div>
    </div>
  );
};

export default NotFound;