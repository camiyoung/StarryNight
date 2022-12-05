import { NavLink } from "react-router-dom"
import BackBtn from "../utils/BackBtn"
import GuideBtn from "../utils/GuideBtn"

export default function Telescope() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="w-[900px] h-[600px] flex flex-col rounded-3xl relative bg-neutral-100 p-8 justify-between items-center">
        <BackBtn />
        <GuideBtn path={"/telescope/tuto"} />
        <div className="w-full py-2 text-sm leading-6 text-black bg-white gowunBatang rounded-2xl">
          환경에 맞는 파일을 다운로드 한 후 <br />{" "}
          <span className="ml-1 font-bold text-green-500">물음표 버튼</span>을
          눌러 튜토리얼을 따라 친구들과 함께 멋진
          <span className="ml-1 font-bold yellow-text">밤하늘</span>을
          즐겨보세요!
        </div>
        <div
          className="w-full h-[40%] bg-gradient-to-b from-black to-[#000044] flex justify-between items-center rounded-2xl bg-cover bg-center relative px-10"
          style={{ backgroundImage: "url(/assets/main/night2.png)" }}
        >
          <div className="w-full h-full absolute top-0 left-0 bg-[#00000077] rounded-2xl"></div>
          <div className="z-10 w-[70%] pr-10 text-left">
            <div
              className="text-3xl font-bold text-white rounded-lg gowunBatang"
              style={{
                textShadow: "0px 0px 10px #ffffff",
              }}
            >
              PC로 별 보기
            </div>
            <div className="mt-5 leading-7 text-white gowunBatang">
              컴퓨터 화면을 통해 아름다운 밤하늘을 <br /> 동시에 접속한 친구들과
              함께 즐기실 수 있습니다.
            </div>
          </div>
          <div className="z-10 flex flex-col items-center">
            <a
              href={"/Download/PC.zip"}
              download={"StarryNight_PC"}
              className="px-5 py-3 text-white bg-black rounded-full custom-btn2 gowunBatang w-[350px] border-gray-800 hover:border-[#ffffff00] border-2 font-bold text-xl"
            >
              PC 버전 다운로드
            </a>
          </div>
        </div>
        <div
          className="w-full h-[40%] bg-gradient-to-b from-black to-[#000044] flex justify-between items-center rounded-2xl bg-cover bg-center relative px-10"
          style={{ backgroundImage: "url(/assets/main/vr1.png)" }}
        >
          <div className="w-full h-full absolute top-0 left-0 bg-[#00000077] rounded-2xl"></div>
          <div className="z-10 flex flex-col items-center">
            <a
              href={"/Download/VR.zip"}
              download={"StarryNight_VR"}
              className="px-5 py-3 text-white bg-black rounded-full custom-btn2 gowunBatang w-[350px] border-gray-800 hover:border-[#ffffff00] border-2 font-bold text-xl"
            >
              VR 버전 다운로드
            </a>
          </div>
          <div className="z-10 w-[70%] text-right">
            <div
              className="text-3xl font-bold text-white rounded-lg gowunBatang"
              style={{
                textShadow: "0px 0px 10px #ffffff",
              }}
            >
              VR로 별 보기
            </div>
            <div className="mt-5 leading-7 text-white gowunBatang">
              VR 기기를 통해 실감나는 밤하늘이 <br /> 내 눈 앞에 있는 것처럼
              바라볼 수 있습니다.
            </div>
            <div className="mt-3 text-sm text-red-200 gowunBatang">
              * VR 기기를 소지하고 계셔야 플레이가 가능합니다!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
