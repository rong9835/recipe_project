import React from 'react';
import CustomButton, {
	ButtonType,
} from '../../components/custombutton/CustomButton';

interface RecipeStep {
	step_description: string;
	step_image_url?: string | number;
}

interface RecipeStepsProps {
	recipeSteps: RecipeStep[];
}

const RecipeSteps: React.FC<RecipeStepsProps> = ({ recipeSteps }) => {
	return (
		<div className="cookingList">
			<ol>
				{recipeSteps.map((step, index) => (
					<li key={index}>
						<CustomButton
							btnType={ButtonType.Level}
							size="medium"
							color="orange"
							shape="circle"
						>
							{(index + 1).toString().padStart(2, '0')}
						</CustomButton>
						<div>{step.step_description}</div>
						{step.step_image_url && (
							<img
								src={step.step_image_url.toString()}
								alt={`Step ${index + 1}`}
							/>
						)}
					</li>
				))}
			</ol>
		</div>
	);
};

export default RecipeSteps;
