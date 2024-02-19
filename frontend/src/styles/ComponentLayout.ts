export const ChattingRoomHeader = `
	background-color: var(--color-pumpkin);
	color: var(--color-white);
	border-radius: 5px 5px 0px 0px;
`;

export const ColumnDisplay = `
	display: flex;
	flex-direction: column;
`;

export const OverFlowScrollbar = `
	overflow: auto;

	&::-webkit-scrollbar {
		width: 0.5rem;
		height: 0rem;
	}

	&::-webkit-scrollbar-thumb {
		background-color: var(--color-crusta);
		border-radius: 0.25rem;
	}

	&::-webkit-scrollbar-track {
		background-color: transparent;
	}

	&::-webkit-scrollbar-thumb:hover {
		background-color: var(--color-pumpkin);
	}
`;
