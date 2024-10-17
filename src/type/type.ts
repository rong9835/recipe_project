export interface Recipe {
	id: string; // Firestore 문서 ID
	recipe_name: string; // 레시피 이름
	recipe_tags: string[]; // 태그 배열
	recipe_ingredients: { name: string; volume: string }[];
	recipe_steps: Array<{ step_description: string; step_image_url: string }>;
	recipe_difficulty: number;
	recipe_hearts: number;
	thumbnail_url: string;
	recipe_create_time: string;
	views: number;
	hearts: number;
	recipe_description: string;
	recipe_time: {
		hours: number;
		minutes: number;
	};
	recipe_tips: string;
}
