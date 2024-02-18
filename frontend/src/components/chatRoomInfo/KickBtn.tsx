import { FiMinusCircle } from 'react-icons/fi';

interface KickBtnProps {
	onClick: () => void;
}

const KickBtn: React.FC<KickBtnProps> = ({ onClick }) => {
	return <FiMinusCircle onClick={onClick} />;
};

export default KickBtn;
