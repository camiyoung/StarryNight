import { NavLink, useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import "../utils/btn.css"
import "../utils/Star.css"
import "../utils/Room.css"
import { http } from "../api/axios"
import { useRecoilState } from "recoil"
import memberAtom from "../recoil/member/atom"

const btnList = [
  { name: "책 펼치기", path: "/book" },
  { name: "밤하늘 보기", path: "/telescope" },
  { name: "방 꾸미기", path: "/deco" },
  { name: "상점 가기", path: "/shop" },
]

export default function Room() {
  const params = useParams()
  const [personal, setPersonal] = useRecoilState(memberAtom)
  const [room, setRoom] = useState({
    wall: "화이트 벽지",
    floor: "기본 바닥",
    furnitures: [
      {
        name: "1번 가구",
        x: 577,
        y: 170,
        use: true,
        category: "대형",
        reflect: false,
      },
    ],
  })

  const [nickname, setNickname] = useState(false)
  const [validation, setValidation] = useState(false)
  const [newNickname, setNewNickname] = useState(
    localStorage.getItem("memberNickname")
  )

  const [meteorNickname, setMeteorNickname] = useState("")

  const navigate = useNavigate()

  // 닉네임 중복 확인 로직
  async function checkNickname() {
    const data = await http.get(`member/nickname/duplicated/${newNickname}`)
    if (data.data) {
      setValidation(true)
    } else {
      setNickname(false)
      setValidation(false)
      await http.put(`member/nickname`, {
        newNickname,
        originalNickname: localStorage.getItem("memberNickname"),
      })
      setPersonal({ memberId: personal.memberId, memberNickname: newNickname! })
      localStorage.setItem("memberNickname", newNickname!)
      getNickname()
    }
  }

  // 가구 받아오기
  useEffect(() => {
    async function getFurnitures() {
      const data = await http.get(`room/id/${params.id}`)
      setRoom(data.data)
    }
    getFurnitures()
    getNickname()
  }, [])

  // 유성 타기
  async function meteor() {
    const data = await http.get(
      `room/random/${localStorage.getItem("memberId")}`
    )
    await window.location.replace(`/room/${data.data}`)
  }

  async function getNickname() {
    const data = await http.get(`member/nickname/${params.id}`)
    setMeteorNickname(data.data)
  }

  return (
    <div className="relative flex items-center justify-center w-full h-screen overflow-hidden">
      <div className="w-[800px] h-[360px] flex flex-col items-center justify-between relative rounded-2xl">
        <div className="w-full h-[300px] relative">
          <img
            src={`/assets/furniture/${room.wall}.png`}
            alt=""
            className={`absolute top-0 rounded-2xl`}
          />
          <img
            src={`/assets/furniture/${room.floor}.png`}
            alt=""
            className={`absolute top-[250px] rounded-b-2xl`}
          />

          {/* 망원경 책장 띄우는 위치 */}

          <div className="roomStar top-[80px] left-[365px]"></div>
          <div className="roomStar top-[90px] left-[380px]"></div>

          <NavLink to="/telescope">
            <img
              src={`/assets/furniture/망원경최종.png`}
              alt=""
              className={`absolute top-[100px] left-[255px] rounded-2xl -scale-x-100 telescopeShow`}
            />
          </NavLink>
          <NavLink to="/book">
            <img
              src={`/assets/furniture/책장최종.png`}
              alt=""
              className={`absolute top-[28px] left-[430px] rounded-2xl bookShow`}
            />
          </NavLink>

          {room.furnitures.map(
            ({ name, x, y, use, category, reflect }, index) => {
              if (use && category !== "벽지" && category !== "바닥")
                return (
                  <div key={index}>
                    <div
                      className="absolute furniture"
                      style={{
                        left: `${x}px`,
                        top: `${y}px `,
                      }}
                    >
                      {reflect ? (
                        <img
                          src={`/assets/furniture/${name}.png`}
                          alt=""
                          style={{
                            transform: "scaleX(-1)",
                          }}
                        />
                      ) : (
                        <img src={`/assets/furniture/${name}.png`} alt="" />
                      )}
                    </div>
                  </div>
                )
            }
          )}
        </div>
        <NavLink to="/">
          <img
            src="/assets/로고가로.png"
            alt=""
            className="w-[200px] absolute left-0 top-[-50px]"
          />
        </NavLink>
        <div
          className="bg-[#000044] custom-btn2 absolute top-[-45px] left-[200px] gowunBatang p-1 px-2 text-sky-100 rounded-2xl flex items-center justify-center cursor-pointer text-sm"
          onClick={() => meteor()}
        >
          <img
            src="/assets/tutorial/유성 타기.png"
            alt=""
            className="w-[20px] mr-2"
          />{" "}
          유성 타기{" "}
        </div>
        {nickname && (
          <div className="flex absolute top-[-40px] right-0 prettyNight text-xl justify-center items-center">
            {validation ? (
              <span className="mr-4 text-sm text-white opacity-60">
                중복 닉네임은 사용할 수 없습니다.
              </span>
            ) : null}
            <input
              type="text"
              className="text-lg w-[150px] text-center"
              value={newNickname!}
              maxLength={8}
              onChange={(e) => setNewNickname(e.target.value)}
            />
            <img
              src="/assets/tutorial/취소.png"
              alt=""
              className="w-5 ml-2 cursor-pointer"
              onClick={() => {
                setNickname(false)
                setValidation(false)
                setNewNickname(localStorage.getItem("memberNickname"))
              }}
            />
            <img
              src="/assets/tutorial/확인.png"
              alt="닉네임 중복시 setValidation(true)"
              className="w-5 ml-2 cursor-pointer"
              onClick={() => {
                if (localStorage.getItem("memberNickname") !== newNickname) {
                  checkNickname()
                } else {
                  setNickname(false)
                  setValidation(false)
                }
              }}
            />
          </div>
        )}
        {!nickname &&
          localStorage.getItem("memberNickname") === meteorNickname && (
            <div className="flex absolute top-[-45px] right-0 text-white prettyNight text-xl justify-end items-center nickname">
              <span className="pt-1 cursor-pointer">
                {localStorage.getItem("memberNickname")} 님
              </span>
              <img
                src="/assets/수정.png"
                className="w-[30px] p-2 cursor-pointer"
                alt=""
                onClick={() => setNickname(true)}
              />
              <div
                className="absolute px-3 text-base text-red-300 bg-[#ffffff44] shadow-md left-0 bottom-8 rounded-xl logout w-full cursor-pointer"
                onClick={() => {
                  window.localStorage.clear()
                  setPersonal({
                    memberId: "",
                    memberNickname: "",
                  })
                  navigate("/")
                }}
              >
                Logout
              </div>
            </div>
          )}
        {!nickname &&
          localStorage.getItem("memberNickname") !== meteorNickname && (
            <div className="flex absolute top-[-45px] right-0 text-white prettyNight text-xl justify-end items-center nickname pt-1">
              {meteorNickname} 님의 다락방을 구경 중입니다!
            </div>
          )}
        {params.id === localStorage.getItem("memberId") ? (
          <div className="flex justify-between w-full">
            {btnList.map(({ name, path }, index) => (
              <NavLink to={path} key={index}>
                <button className="w-[180px] h-[40px] custom-btn prettyNight rounded-full">
                  {name}
                </button>
              </NavLink>
            ))}
          </div>
        ) : (
          <div className="w-[800px] absolute bottom-[-110px] h-[160px]">
            <div className="flex justify-between gowunBatang items-center h-[40px] mb-2">
              <div className="text-white">
                {meteorNickname} 님이 사용하신 가구
              </div>
              <button
                className="w-[180px] h-[30px] custom-btn prettyNight rounded-full text-sm"
                onClick={() =>
                  window.location.replace(
                    `/room/${localStorage.getItem("memberId")}`
                  )
                }
              >
                내 다락방 돌아가기
              </button>
            </div>
            <div className="w-[800px] h-[105px] flex p-2 py-3 from-[#dee9ff] bg-gradient-to-b to-[#b3c7ff] rounded-lg overflow-scroll non-scroll">
              <div className="flex flex-wrap">
                {room.furnitures.map(({ name, use }) => {
                  if (use)
                    return (
                      <div
                        key={name}
                        className="h-[80px] w-[80px] relative mx-2 rounded-xl mb-2"
                      >
                        <img
                          src={`/assets/thumbnail/${name}.png`}
                          alt=""
                          className="w-full h-full rounded-xl"
                        />
                        <div className="absolute top-0 w-full h-full rounded-xl"></div>
                      </div>
                    )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
