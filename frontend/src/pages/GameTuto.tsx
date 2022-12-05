import BackBtn from "../utils/BackBtn"

export default function GameTuto() {
  return (
    <div className="w-full h-screen flex justify-center items-center gowunBatang overflow-hidden">
      <div className="w-[900px] h-[600px] rounded-3xl relative bg-gradient-to-b to-black from-gray-800">
        <BackBtn />
        <div className="w-full h-full border-4 rounded-3xl flex flex-col justify-center items-center border-neutral-700">
          <div className="text-white mt-10">
            별자리 신화 속으로 직접 들어가 신화를 체험해보세요.
          </div>
          <div className="text-white mt-1">
            게임 속에 숨겨진 별을 찾으면 가구를 구매해 다락방을 꾸밀 수
            있습니다.
          </div>
          <img
            src="/assets/tutorial/게임 가이드.png"
            alt="게임 가이드"
            className="h-[80%] rounded-3xl"
          />
        </div>
      </div>
    </div>
  )
}
