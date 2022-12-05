import BackBtn from "../utils/BackBtn"
import { useState, useEffect } from "react"
import "../utils/Book.css"
import { NavLink } from "react-router-dom"
import GuideBtn from "../utils/GuideBtn"
import Updated from "../components/book/Updated"
import { http } from "../api/axios"

export default function Book() {
  type pathType = {
    [key: string]: string
  }
  const path: pathType = {
    처녀자리: "virgo",
    사자자리: "leo",
    거문고자리: "lyra",
    페르세우스자리: "perseus",
    카시오페아자리: "cassiopeia",
  }
  const [page, setPage] = useState(1)

  const [stories, setStories] = useState([
    {
      constellation: "Leo",
      title: "스토리 제목",
      summary: "부제",
      finish: false,
      totalStar: 10,
      currentStar: 4,
    },
  ])

  const [story, setStory] = useState([
    {
      constellation: "Leo",
      title: "스토리 제목",
      summary: "부제",
      finish: false,
      totalStar: 10,
      currentStar: 4,
    },
  ])

  useEffect(() => {
    async function checkConstellation() {
      const data = await http.get(
        `game/story/list/id/${localStorage.getItem("memberId")}`
      )
      setStory(data.data.stories)
      setStories(data.data.stories.slice(0, 4))
    }
    checkConstellation()
  }, [])

  useEffect(() => {
    if (page === 1) {
      setStories(story.slice(0, 4))
    } else {
      setStories(story.slice(4))
    }
  }, [page])

  return (
    <div className="flex items-center justify-center w-full h-screen gowunBatang">
      <div className="w-[900px] h-[600px] flex flex-wrap rounded-3xl relative bg-neutral-100 p-5">
        {page === 1 ? (
          <img
            src="/assets/오른쪽.png"
            alt=""
            className="absolute right-[-120px] w-14 shadow-md top-[300px] transform -translate-y-1/2 cursor-pointer arrowBtn"
            onClick={() => setPage(2)}
          />
        ) : (
          <img
            src="/assets/왼쪽.png"
            alt=""
            className="absolute left-[-120px] w-14 shadow-md top-[300px] transform -translate-y-1/2 cursor-pointer arrowBtn"
            onClick={() => setPage(1)}
          />
        )}
        <BackBtn />
        <GuideBtn path={"/book/tuto"} />
        {stories.map(
          ({
            constellation,
            title,
            summary,
            finish,
            totalStar,
            currentStar,
          }) => {
            return (
              <div
                key={title}
                className="w-[50%] h-[50%] flex items-center p-1 justify-center relative"
              >
                <div
                  className="bg-white flex w-[90%] h-[90%] items-center rounded-3xl shadow-lg bg-cover bg-center"
                  style={{
                    backgroundImage: `url(/assets/main/${path[constellation]}.png)`,
                  }}
                >
                  <div className="flex flex-col w-full h-full items-start p-5  rounded-3xl bg-gradient-to-t from-[#ffffff33] via-[#ffffffcc] to-white relative">
                    {finish ? (
                      <div className="absolute top-0 left-0 w-full h-full bg-black rounded-3xl opacity-20"></div>
                    ) : null}
                    <div
                      className="font-extrabold text-3xl w-full flex justify-center text-white h-[25%] z-10"
                      style={{
                        textShadow: "0px 0px 5px #333333",
                      }}
                    >
                      {title}
                    </div>
                    <div className="font-bold text-xl flex justify-center w-full h-[15%] items-center mb-2 z-10">
                      <span className="mr-2">{constellation}</span>
                      <div className="bg-yellow-100 rounded-full h-[24px] px-2 flex items-center">
                        <img
                          src="/assets/tutorial/star.png"
                          alt=""
                          className="w-[15px] h-[15px]"
                        />
                        <span className="ml-2 text-base">
                          {currentStar} / {totalStar}
                        </span>
                      </div>
                    </div>
                    <div className="mb-4 mt-1 text-sm font-semibold h-[35%]">
                      {summary}
                    </div>
                    {finish && (
                      <img
                        src="/assets/tutorial/stamp.png"
                        alt="클리어 스탬프"
                        className="absolute right-4 bottom-[64px] w-[85px] z-10"
                      />
                    )}
                    <div className="flex h-[20%] pt-1 w-full items-center z-10">
                      <NavLink
                        to={`game/${path[constellation]}`}
                        className="px-4 py-1 rounded-xl bg-green-100 text-sm mr-3 w-[50%] flex items-center justify-center font-semibold h-full shadow-md"
                      >
                        별 보러 가기
                      </NavLink>
                      {finish ? (
                        <NavLink
                          to={`story/${path[constellation]}`}
                          className="px-4 py-1 rounded-xl bg-green-200 text-sm w-[50%] cursor-pointer flex items-center justify-center font-semibold h-full shadow-md"
                        >
                          신화 읽기
                        </NavLink>
                      ) : (
                        <div className="px-4 py-1 rounded-xl bg-gray-400 text-sm w-[50%] flex items-center justify-center font-semibold h-full border-gray-600 shadow-md">
                          신화 읽기
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        )}
        {page === 2 ? <Updated /> : null}
        {page === 2 ? <Updated /> : null}
        {page === 2 ? <Updated /> : null}
      </div>
    </div>
  )
}
