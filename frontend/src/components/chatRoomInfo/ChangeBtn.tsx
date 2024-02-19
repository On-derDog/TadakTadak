import { BsPersonFillCheck } from 'react-icons/bs';

interface ChangeBtnProps {
  onClick: () => void;
}

const ChangeBtn: React.FC<ChangeBtnProps> = ({ onClick }) => {
  return <BsPersonFillCheck onClick={onClick} />;
};

export default ChangeBtn;
