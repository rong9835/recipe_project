export interface Recipe {
	id: string; // Firestore 문서 ID
	recipe_name: string; // 레시피 이름
	recipe_tags: string[]; // 태그 배열
	recipe_ingredients: RecipeIngredient[];
	recipe_difficulty: number;
	recipe_hearts: number;
	thumbnail_url: string;
	add_at: string;

	recipe_create_time: RecipeCreateTime;
	recipe_time: RecipeTime;
	recipe_steps: RecipeStep[];
	recipe_tips: string;
	recipe_description: string;

	hearts: number;
	views: number;
	author: Author;
}

interface RecipeTime {
	hours: number;
	minutes: number;
}

interface RecipeCreateTime {
	seconds: number;
	nanoseconds: number;
}

interface RecipeStep {
	step_description: string;
	step_image_url: string | number;
}

interface Author {
	user_emain: string;
	user_nickname: string | undefined;
}

interface RecipeIngredient {
	name: string;
	volume: string;
}
