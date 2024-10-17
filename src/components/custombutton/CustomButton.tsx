import { ReactNode } from 'react';
import styles from './CustomButton.module.css';

export enum ButtonType {
	Search = 'search',
	Plus = 'plus',
	Login = 'login',
	Signup = 'signup',
	Edit = 'edit',
	Delete = 'delete',
	Move = 'move',
	Menu = 'menu',
	Share = 'share',
	Step = 'step',
	Back = 'back',
	Level = 'level',
	Filter = 'filter',
}

export interface ButtonProps {
	btnType: ButtonType;
	size?: 'small' | 'medium' | 'large';
	color?: 'orange' | 'gray' | 'white' | 'ivory';
	shape?: 'circle' | 'rad10' | 'rad20' | 'rad30';
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	children?: ReactNode;
	disabled?: boolean;
}

const CustomButton = ({
	btnType,
	size,
	color,
	shape,
	onClick,
	children,
	disabled,
}: ButtonProps) => {
	const buttonStyles: Record<ButtonType, string> = {
		[ButtonType.Search]: styles.searchBtn,
		[ButtonType.Plus]: styles.plusBtn,
		[ButtonType.Login]: styles.loginBtn,
		[ButtonType.Signup]: styles.signupBtn,
		[ButtonType.Edit]: styles.editBtn,
		[ButtonType.Delete]: styles.deleteBtn,
		[ButtonType.Move]: styles.moveBtn,
		[ButtonType.Menu]: styles.menuBtn,
		[ButtonType.Share]: styles.shareBtn,
		[ButtonType.Step]: styles.stepBtn,
		[ButtonType.Back]: styles.backBtn,
		[ButtonType.Level]: styles.levelBtn,
		[ButtonType.Filter]: styles.filterBtn,
	};

	// size가 undefined일 경우에 빈 문자열 반환
	const sizeClass = size ? styles[size] : '';

	// color가 undefined일 경우에 빈 문자열 반환
	const colorClass = color ? styles[color] : '';

	// shape가 undefined일 경우에 빈 문자열 반환
	const shapeClass = shape ? styles[shape] : '';

	return (
		<button
			type="button"
			className={`${buttonStyles[btnType]} ${sizeClass} ${colorClass} ${shapeClass}`}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default CustomButton;
