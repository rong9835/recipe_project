import React from 'react';

interface RecipeIngredient {
	name: string;
	volume: number | string;
}

interface GroupIngredientList {
	ingredients: RecipeIngredient[];
	className?: string;
}

const GroupedIngredientList: React.FC<GroupIngredientList> = ({
	ingredients,
	className,
}) => {
	const groupIngredients = (
		ingredients: RecipeIngredient[]
	): RecipeIngredient[][] => {
		const groups: RecipeIngredient[][] = [];
		for (let i = 0; i < ingredients.length; i += 6) {
			groups.push(ingredients.slice(i, i + 6));
		}
		return groups;
	};

	const groupedIngredients = groupIngredients(ingredients);

	return (
		<div className={className}>
			{groupedIngredients.map((group, groupIndex) => (
				<ul key={groupIndex}>
					{group.map((ingredient, index) => (
						<li key={index}>
							{ingredient.name} <span>{ingredient.volume}</span>
						</li>
					))}
				</ul>
			))}
		</div>
	);
};

export default GroupedIngredientList;
