import React from 'react';
import CustomButton, {
	ButtonType,
} from '../../components/custombutton/CustomButton';

interface RecipeData {
	recipe_steps: {
		step_description: string;
		step_image_url: string | number | null;
	}[];
}

interface RecipeStepsProps {
	recipeData: RecipeData;
	className?: string;
}

const RecipeSteps: React.FC<RecipeStepsProps> = ({ recipeData }) => {
	const steps = recipeData.recipe_steps;

	return (
		// <div className={className}>
		<ol>
			{steps.map((step, index) => (
				<li key={index}>
					<CustomButton
						btnType={ButtonType.Level}
						size="medium"
						color="orange"
						shape="circle"
					>
						{index + 1}
					</CustomButton>
					<div>{step.step_description}</div>
					{step.step_image_url && (
						<img
							src={
								typeof step.step_image_url === 'number'
									? String(step.step_image_url)
									: step.step_image_url
							}
							alt={`레시피 단계 ${index + 1} 이미지`}
						/>
					)}
				</li>
			))}
		</ol>
		// </div>
	);
};

export default RecipeSteps;
