export const ChattingRoom = () =>{

  return(
    <main className="ChattingRoom-wrapper">
      <section className="ChattingRoom-container">
        {/* 이미지 썸네일 */}
        <h2>썸네일</h2>
        <div className="ChattingRoom-image">

        </div>

        {/* 채팅룸 설명 */}
        <div className="ChattingRoom-detail">
          <span className="ChattingRoom-title">
            방제목
          </span><br/>

          <span className="ChattingRoom-bookmark">
            즐겨찾기
          </span><br/>

          <span className="ChattingRoom-info">
            방설명
          </span><br/>

          <span className=" ChattingRoom-category">
            #카테고리
          </span>
        </div>
      </section>
    </main>
  )
}