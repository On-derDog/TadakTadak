import styled from '@emotion/styled';
import { MdPublishedWithChanges } from 'react-icons/md';

const ChangeBtn = () => {
	return (
		<BtnWrapper>
			<MdPublishedWithChanges />
		</BtnWrapper>
	);
};

export default ChangeBtn;

const BtnWrapper = styled.div``;
