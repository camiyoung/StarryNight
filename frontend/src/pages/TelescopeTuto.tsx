import { useState } from "react"
import Content from "../components/tutorial/Content"
import Download from "../components/tutorial/Download"
import Manual from "../components/tutorial/Manual"
import BackBtn from "../utils/BackBtn"

export default function GameTuto() {
  const tutoList = ["다운로드", "컨텐츠 소개", "조작 방법"]
  const [tap, setTap] = useState("다운로드")

  return (
    <div className="flex items-center justify-center w-full h-screen overflow-hidden gowunBatang">
      <div className="w-[900px] h-[600px] rounded-r-3xl relative bg-neutral-100 p-10">
        <BackBtn />
        <div className="absolute left-[-40px] transform -translate-y-1/2 top-1/2 gowunBatang font-semibold h-full">
          {tutoList.map((item) => {
            let bg = "bg-neutral-300 cursor-pointer"
            if (item === tap) {
              bg = "bg-neutral-100"
            }

            return (
              <div
                className={`py-3 px-4 w-[40px] rounded-l-lg h-1/3 flex justify-center items-center border-b-2 border-l-2 border-neutral-200 ${bg}`}
                key={item}
                onClick={() => setTap(item)}
              >
                {item}
              </div>
            )
          })}
        </div>
        {tap === "다운로드" && <Download />}
        {tap === "컨텐츠 소개" && <Content />}
        {tap === "조작 방법" && <Manual />}
      </div>
    </div>
  )
}
