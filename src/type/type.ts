export interface Recipe {
	id: string; // Firestore 문서 ID
	recipe_name: string; // 레시피 이름
	recipe_tags: string[]; // 태그 배열
	recipe_ingredients: { name: string }[];
	recipe_difficulty: number;
	recipe_hearts: number;
	thumbnail_url: string;
	add_at: string;
}
