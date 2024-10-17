import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import CustomButton, {
	ButtonType,
} from '../../components/custombutton/CustomButton';

interface PlusMenuBtnProps {
	isOpen: boolean;
	onClick: () => void;
}

const PlusMenuBtn = ({ isOpen, onClick }: PlusMenuBtnProps) => {
	return (
		<CustomButton
			btnType={ButtonType.Menu}
			shape="circle"
			color="orange"
			size="large"
			onClick={onClick}
		>
			{isOpen ? <CloseOutlined /> : <PlusOutlined />}
		</CustomButton>
	);
};

export default PlusMenuBtn;
