import { ReactNode } from 'react';
import styles from './CustomButton.module.css';

export enum ButtonType {
	Search = 'search',
	Plus = 'plus',
	Login = 'login',
	Signup = 'signup',
	Edit = 'edit',
	Delete = 'delete',
	Save = 'save',
	Level = 'level',
}

export interface ButtonProps {
	btnType: ButtonType;
	size?: 'small' | 'medium' | 'large';
	color?: 'orange' | 'gray' | 'white' | 'ivory';
	shape?: 'circle' | 'rad10' | 'rad20' | 'rad30';
	onClick?: () => void;
	children?: ReactNode;
}

const CustomButton = ({
	btnType,
	size,
	color,
	shape,
	onClick,
	children,
}: ButtonProps) => {
	const buttonStyles: Record<ButtonType, string> = {
		[ButtonType.Search]: styles.searchBtn,
		[ButtonType.Plus]: styles.plusBtn,
		[ButtonType.Login]: styles.loginBtn,
		[ButtonType.Signup]: styles.signupBtn,
		[ButtonType.Edit]: styles.editBtn,
		[ButtonType.Delete]: styles.deleteBtn,
		[ButtonType.Save]: styles.saveBtn,
		[ButtonType.Level]: styles.levelBtn,
	};

	// size가 undefined일 경우에 빈 문자열 반환
	const sizeClass = size ? styles[size] : '';

	// color가 undefined일 경우에 빈 문자열 반환
	const colorClass = color ? styles[color] : '';

	// shape가 undefined일 경우에 빈 문자열 반환
	const shapeClass = shape ? styles[shape] : '';

	return (
		<button
			className={`${buttonStyles[btnType]} ${sizeClass} ${colorClass} ${shapeClass}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default CustomButton;
