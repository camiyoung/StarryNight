import { useRef, useState } from "react"
import Navbar from "../components/navbar/Navbar"
import "../utils/Home.css"
import { Fade } from "react-awesome-reveal"
import parse from "html-react-parser"
import { NavLink } from "react-router-dom"
import CarouselUse from "../utils/CarouselUse"

export default function Home() {
  const homeRef = useRef<HTMLDivElement>(null)
  const nightRef = useRef<HTMLDivElement>(null)
  const vrRef = useRef<HTMLDivElement>(null)
  const mythRef = useRef<HTMLDivElement>(null)
  const roomRef = useRef<HTMLDivElement>(null)

  const functionList = [
    {
      name: "밤하늘 보기",
      page: "night",
      explanation:
        "온라인 상에서 사람들과 <br/> 세계 각국의 밤하늘을 <br/> 함께 볼 수 있습니다.",
      explanation2:
        "다 같이 모여 밤하늘의 <span className='yellow-text'>별</span>을 만나보세요. <br/><br/> <p className='text-gray-400'> 캠프 파이어, 불꽃놀이, 특별한 아이템 등 <br/> 더욱 다양한 컨텐츠도 준비 되어 있습니다. </p>",
      location: nightRef,
    },
    {
      name: "VR 체험",
      page: "vr",
      explanation:
        "VR기기를 통해  <br/>별이 가득한 밤하늘을 <br/> 실감나게 체험할 수 있습니다.",
      explanation2:
        "VR로 더욱 실감나는 <span className='yellow-text'>밤하늘</span>을 볼 수 있어요. <br/> <br/> <p className='text-gray-400'>내 눈 바로 앞에 펼쳐져 있는 <br/> 별이 쏟아질 듯 한 밤하늘을 즐겨보세요. </p>",
      location: vrRef,
    },
    {
      name: "신화 게임",
      page: "myth",
      explanation:
        "별자리에 얽힌 신화를 <br/> 게임으로 직접 플레이 <br/> 해 볼 수 있습니다.",
      explanation2:
        "신화를 바탕으로 만들어진 게임을 통해 <br/> <span className='yellow-text'>별자리의 이야기</span>를 즐겨볼 수 있어요. <br/><br/> <p className='text-gray-400'>별의 소리를 들을 준비는 되셨나요? </p>",
      location: mythRef,
    },
    {
      name: "다락방",
      page: "room",
      explanation:
        "게임에서 얻은 별을 사용해서  <br/> 별을 올려다 보는 다락방을  <br/>내 맘대로 꾸밀 수 있습니다.",
      explanation2:
        "나만의 작은 <span className='yellow-text'>다락방</span>을 마음껏 꾸며봐요. <br/><br/> <p className='text-gray-400'>어린 시절 누구나 꿈꿨던 나만의 아지트처럼, <br/> 내 공간을 예쁘게 꾸미고 별을 찾아 떠나보세요. </p>",
      location: roomRef,
    },
  ]

  const [pages, setPages] = useState([0, 0, 0, 0])

  function changeIndex(item: number, index: number) {
    const newPages = [...pages]
    newPages[item] = index
    setPages(newPages)
  }

  return (
    <div className="w-full h-screen overflow-scroll non-scroll">
      <Navbar />
      <div
        className="relative flex flex-col items-center justify-center w-full h-screen bg-cover"
        style={{ backgroundImage: "url(/assets/sky.jpg)" }}
      >
        <div className="w-full h-screen bg-[#00000088] absolute"></div>
        <div className="absolute w-full h-screen bg-black fade-out-box"></div>
        <img
          src="/assets/로고세로.png"
          alt=""
          className="w-[300px] mb-2 fade-in-box z-10"
        />
        <span className="z-10 text-white gowunBatang fade-in-box">
          멀기만 했던
          <span className="pl-1 text-yellow-400">별</span>
          들과 가까워지는
          <span className="pl-1 text-yellow-400">밤</span>
        </span>
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
        className="w-full h-[700px] relative flex justify-center items-center bg-gradient-to-t from-black via-[#471e18] to-[#1f0b40] bg-cover bg-center"
        ref={homeRef}
        style={{
          backgroundImage: "url(/assets/main/home1.jpg)",
        }}
      >
        <div className="w-full h-full bg-[#00000088] absolute"></div>
        <Fade duration={2000} triggerOnce={true}>
          <span className="z-10 text-xl leading-8 text-white gowunBatang">
            <div>별을 찾기엔 너무 밝은 도시의 불빛,</div>
            <div className="flex items-center">
              <img src="/assets/로고가로.png" className="mt-1 h-9" />의 별들은
              늘 당신 곁에 있어요.
            </div>
          </span>
        </Fade>
      </div>
      <Fade duration={4000} triggerOnce={true} cascade>
        <div
          className="w-full h-[700px] relative bg-[#222222] flex flex-col justify-center items-center bg-cover bg-center"
          style={{
            backgroundImage: "url(/assets/main/home2.jpg)",
          }}
        >
          <div className="absolute w-full h-full bg-black opacity-70"></div>
          <div className="w-[60%] h-[400px] flex justify-between mt-6">
            {functionList.map(({ name, explanation, page, location }) => {
              return (
                <div
                  className="h-full w-[23%] bg-center bg-cover relative bg-white rounded-3xl hoverbox"
                  key={name}
                  style={{
                    backgroundImage: `url(/assets/main/${page}1.png)`,
                  }}
                  onClick={() => {
                    location.current?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  <div className="absolute top-[-45px] transform -translate-x-1/2 left-1/2 text-white gowunBatang text-xl hovertext w-full">
                    {name}
                  </div>
                  <div className="absolute leading-6 text-sm bottom-0 w-full h-[150px] rounded-b-3xl gowunBatang text-white flex items-center justify-center bg-gradient-to-b from-transparent to-black via-black">
                    {parse(explanation)}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="z-10 px-5 py-1 mt-8 text-lg leading-7 text-center text-white bg-black gowunBatang">
            다양한 기능을 통해
            <span className="text-[#ffcc33] ml-1">별</span>과 함께 할 수 있어요.
          </div>
        </div>
      </Fade>
      {functionList.map(({ page, explanation2, location }, index) => {
        const a = index % 2

        let div1 = "left-[100px]"
        let div2 = "right-[100px] text-right"

        if (a) {
          div1 = "right-[100px]"
          div2 = "left-[100px] text-left"
        }

        let indexs = [
          "bg-[#777777] cursor-pointer",
          "bg-[#777777] cursor-pointer",
          "bg-[#777777] cursor-pointer",
        ]
        indexs[pages[index]] = "bg-[#ffcc33]"

        return (
          <div
            className="w-full h-[700px] relative"
            ref={location}
            style={{
              backgroundColor: a ? "#111111" : "#171717",
            }}
            key={page}
          >
            <Fade duration={4000} triggerOnce={true}>
              <div>
                <div
                  className={`w-[900px] h-[500px] absolute transform -translate-y-1/2 top-1/2 ${div1} flex flex-col items-center justify-center`}
                >
                  <CarouselUse name={page} />
                </div>

                <div
                  className={`absolute text-white gowunBatang text-xl top-1/2 transform -translate-y-1/2 leading-8 ${div2}`}
                >
                  {parse(explanation2)}
                </div>
              </div>
            </Fade>
          </div>
        )
      })}
      <Fade duration={4000} triggerOnce={true}>
        <div className="w-full h-[500px] bg-gradient-to-b flex justify-center items-center text-white gowunBatang flex-col z-50">
          <p>이제, 밤하늘의 별이 보이지 않더라도</p>
          <p className="flex items-center justify-center">
            <img src="/assets/로고가로.png" className="mt-1 h-9" />
            에서 별을 만나요.
          </p>
          <NavLink
            className="mt-7 bg-gradient-to-b from-[#ffcc33] to-[#501fc2] py-2 px-5 rounded-3xl custom-btn3"
            to="/login"
          >
            지금 별 만나러 가기
          </NavLink>
        </div>
      </Fade>
      <div className="w-full h-[150px] bg-black text-white gowunBatang flex justify-center items-center text-sm leading-6">
        © 삼성청년SW아카데미 7기 서울캠퍼스 A208 자율 프로젝트 <br />
        신슬기 | 박종민 | 박희조 | 안지영 | 채송지 | 황승주
      </div>
    </div>
  )
}
