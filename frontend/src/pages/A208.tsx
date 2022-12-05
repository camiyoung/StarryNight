import { useRef } from "react"
import { Fade } from "react-awesome-reveal"
import Navbar from "../components/navbar/Navbar"

export default function A208() {
  const homeRef = useRef<HTMLDivElement>(null)
  const teamList = [
    {
      name: "신슬기",
      job: "프로젝트 팀장",
      github: "https://github.com/seulgi9834",
      words: "SSAFY 최강 A208 팀! 프로젝트 고생하셨습니다.",
    },
    {
      name: "박종민",
      job: "게임 팀장",
      github: "https://github.com/qooktree1",
      words:
        "유니티가 너무 재밌었습니다. 프로젝트를 새롭게 하는 분들께 추천드립니다.",
    },
    {
      name: "박희조",
      job: "UCC 팀장",
      github: "https://github.com/joy96817",
      words: "저랑.. 별 보러 가지 않으실래요?",
    },
    {
      name: "안지영",
      job: "VR 팀장",
      github: "https://github.com/camiyoung",
      words: "팀플이 재미있을 수 있다는 것을 느끼게 해준 우리 팀 최고!",
    },
    {
      name: "채송지",
      job: "디자인 팀장",
      github: "https://github.com/youthful15",
      words: "야 너두 디자인 할 수 있어",
    },
    {
      name: "황승주",
      job: "BE 팀장",
      github: "https://github.com/chu1214",
      words: "우리 팀 실력이 아주 없지는 않은 것 같다",
    },
  ]

  const pjtList = [
    {
      pjt: "공통",
      name: "집에서 운동중",
      youtube: "https://youtu.be/60iz58dWdfY",
      bg: "bg-[#8ccfd530]",
    },
    {
      pjt: "특화",
      name: "드림멍즈",
      youtube: "https://youtu.be/eVtlH42FHsQ",
      bg: "bg-[#EEE3C830]",
    },
    {
      pjt: "자율",
      name: "Starry Night",
      youtube: "/",
      bg: "bg-[#000000]",
    },
  ]

  return (
    <div className="w-full h-screen overflow-scroll non-scroll">
      <Navbar />
      <div
        className="bg-gradient-to-b from-black to-[#241944] w-full h-full flex items-center justify-center bg-center bg-cover relative fade-in-box"
        style={{
          backgroundImage: "url(/assets/team2.jpg)",
        }}
      >
        <div className="w-[30%] absolute top-[200px]">
          <img src="/assets/로고가로.png" alt="" className="" />
          <span className="text-white gowunBatang">
            별들의 이야기를 담아낸 6명의 팀원들을 소개합니다!
          </span>
        </div>

        <Fade duration={3000} triggerOnce={true}>
          <img
            src="/assets/tutorial/down-arrow.png"
            className="absolute w-8 cursor-pointer bottom-10 arrowBtn2"
            onClick={() => {
              homeRef.current?.scrollIntoView({ behavior: "smooth" })
            }}
            alt=""
          />
        </Fade>
      </div>
      <div
        className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-b from-black to-[#241944] z-20"
        ref={homeRef}
      >
        <div className="from-black to-[#241944] z-20 bg-gradient-to-b w-full h-full flex justify-center items-center flex-col">
          <div className="flex">
            <div className="bg-center bg-cover rounded-3xl h-[526px] w-72 relative mr-16 flex">
              <div
                className="absolute top-0 left-0 w-full h-full bg-center bg-cover opacity-25 rounded-3xl hover:opacity-50"
                style={{ backgroundImage: "url(/assets/team5.jpg)" }}
              ></div>
              <img
                src="/assets/로고세로.png"
                alt=""
                className="absolute scale-75"
              />
            </div>
            <div className="flex w-[820px] h-[550px] flex-wrap justify-between gowunBatang">
              {teamList.map(({ name, job, github, words }) => {
                return (
                  <div
                    className="w-[400px] h-[160px] rounded-3xl flex justify-center items-center p-5 relative shadow-md bg-gradient-to-b from-[#ffffff05] to-[#ffffff10] hover:from-[#ffffff15] hover:to-[#ffffff30]"
                    key={words}
                  >
                    <a href={github} target="_blank">
                      <img
                        src="/assets/github.png"
                        alt=""
                        className="absolute rounded-full w-7 right-4 bottom-4"
                      />
                    </a>
                    <img
                      src={`/assets/team/팀_${name}.png`}
                      alt=""
                      className="h-full rounded-full"
                    />
                    <div className="w-[260px] text-left h-full ml-5">
                      <div className="flex items-end">
                        <span className="text-2xl font-bold text-white">
                          {name}
                        </span>{" "}
                        <span className="ml-2 text-gray-300">{job}</span>
                      </div>
                      <p className="mt-2 text-gray-400 prettyNight">{words}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="w-[1172px] flex justify-between mt-5">
            {pjtList.map(({ pjt, name, youtube, bg }) => {
              return (
                <a
                  href={youtube}
                  target="_blank"
                  className={`w-[370px] h-10 rounded-2xl flex ${bg} justify-center items-center gowunBatang text-white custom-btn2`}
                  key={name}
                >
                  <div className="flex items-center justify-center">
                    {pjt} 프로젝트
                    <span className="ml-2 font-bold">{name}</span>
                    <img
                      src="/assets/youtube.png"
                      alt=""
                      className="w-6 ml-2 opacity-50"
                    />
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
