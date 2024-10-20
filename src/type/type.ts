export interface Recipe {
	id: string; // Firestore 문서 ID
	recipe_name: string; // 레시피 이름
	recipe_tags: string[]; // 태그 배열
	recipe_ingredients: RecipeIngredient[];
	recipe_difficulty: number;
	recipe_hearts: number;
	thumbnail_url: string;

	recipe_create_time: RecipeCreateTime;
	recipe_time: {
		hours: number;
		minutes: number;
	};
	recipe_steps: Array<{ step_description: string; step_image_url: string }>;
	recipe_tips: string;
	recipe_description: string;

	hearts: number;
	views: number;
	author: Author;
}

export interface RecipeCreateTime {
	seconds: number;
	nanoseconds: number;
}

interface Author {
	user_emain: string;
	user_nickname: string | undefined;
}

interface RecipeIngredient {
	name: string;
	volume: string;
}
