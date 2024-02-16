import { MdPublishedWithChanges } from 'react-icons/md';

interface ChangeBtnProps {
	onClick: () => void;
}

const ChangeBtn: React.FC<ChangeBtnProps> = ({ onClick }) => {
	return <MdPublishedWithChanges onClick={onClick} />;
};

export default ChangeBtn;
