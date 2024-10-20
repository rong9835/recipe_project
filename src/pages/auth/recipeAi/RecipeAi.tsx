import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './RecipeAi.module.css';

const RecipeAi: React.FC = () => {
  const [ingredients, setIngredients] = useState('');
  const [cookingMethod, setCookingMethod] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [recommendedRecipe, setRecommendedRecipe] = useState('');

  const handleFindRecipe = () => {
    // 여기에 AI 레시피 추천 로직을 구현할 예정입니다.
    setRecommendedRecipe('AI가 추천한 레시피가 여기에 표시됩니다.');
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            <Link to="/">
              <img src="./src/assets/icon_logo.png" alt="홈으로 가기" className={styles.logo} />
            </Link>
          </h1>
        </header>
        <main className={styles.main}>
          <section className={styles.inputSection}>
            <div className={styles.inputGroup}>
              <label htmlFor="ingredients" className={styles.label}>재료</label>
              <textarea
                id="ingredients"
                className={styles.input}
                placeholder="예) 돼지고기, 양파, 당근, 감자, 대파"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="cookingMethod" className={styles.label}>조리방법</label>
              <textarea
                id="cookingMethod"
                className={styles.input}
                placeholder="예) 볶음, 찜, 데침, 튀김"
                value={cookingMethod}
                onChange={(e) => setCookingMethod(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="additionalInfo" className={styles.label}>추가사항</label>
              <textarea
                id="additionalInfo"
                className={styles.input}
                placeholder="예: 저염식, 글루텐 프리, 매운맛 선호"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
              />
            </div>
            <button className={styles.findButton} onClick={handleFindRecipe}>
              레시피 찾기
            </button>
          </section>
          <section className={styles.recipeSection}>
            <h2 className={styles.recipeTitle}>AI 추천 레시피</h2>
            <div className={styles.recipeBox}>
              {recommendedRecipe || '레시피 찾기 버튼을 클릭하면 AI가 추천한 레시피가 여기에 표시됩니다.'}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default RecipeAi;