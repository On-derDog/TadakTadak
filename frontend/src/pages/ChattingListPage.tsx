import ChattingRoomList from "../components/roomPreview/RoomPreviewList";


const ChattingList: React.FC = () => {
	return (
		<main className="ChattingListPage-wrapper">
			<section className="ChattingListPage-container">
				<h1>This is ChattingRoomPage!</h1>
				<ChattingRoomList/>
			</section>
		</main>
	)
};

export default ChattingList;
