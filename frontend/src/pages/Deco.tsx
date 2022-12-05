import React, { useState, useEffect } from "react"
import Draggable from "react-draggable"
import { useNavigate } from "react-router-dom"
import { categories } from "./Shop"
import "../utils/Deco.css"

import { http } from "../api/axios"

interface onlyFurnitures {
  name: string
  x: number
  y: number
  use: boolean
  category: string
}

type furnitureList = {
  wall: string
  floor: string
  furnitures: Array<onlyFurnitures>
}

export default function Deco() {
  const navigate = useNavigate()
  const [tap, setTap] = useState("벽지")
  const [wall, setWall] = useState("화이트 벽지")
  const [floor, setFloor] = useState("기본 바닥")

  const [furnitures, setFurnitures] = useState([
    {
      name: "1번 가구",
      x: 577,
      y: 170,
      use: true,
      reflect: false,
      category: "대형",
    },
  ])

  const [position, setPosition] = useState([{ x: 1, y: 1 }])

  useEffect(() => {
    async function getFurnitures() {
      const data = await http.get(`room/id/${localStorage.getItem("memberId")}`)
      setFurnitures(data.data.furnitures)
      setWall(data.data.wall)
      setFloor(data.data.floor)
      const positionSet = new Array(data.data.furnitures.length)
        .fill(0)
        .map((item, index) => {
          return {
            x: data.data.furnitures[index].x,
            y: data.data.furnitures[index].y,
          }
        })
      setPosition(positionSet)
    }
    getFurnitures()
  }, [])

  async function sendFurnitures(data: furnitureList) {
    await http.post(`room/id/${localStorage.getItem("memberId")}`, data)
    navigate(`/room/${localStorage.getItem("memberId")}`)
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="w-[800px] h-[520px] flex flex-col items-center justify-between">
        <div className="w-full h-[300px] relative rounded-2xl">
          <div className="absolute top-[-30px] right-0 text-gray-400 prettyNight">
            * 망원경과 책장의 위치는 변경되지 않습니다.
          </div>
          <img
            src={`/assets/furniture/${wall}.png`}
            alt=""
            className={`absolute rounded-2xl`}
          />
          <img
            src={`/assets/furniture/${floor}.png`}
            alt=""
            className={`absolute top-[250px] rounded-b-2xl`}
          />

          <img
            src={`/assets/furniture/망원경최종.png`}
            alt=""
            className={`absolute top-[100px] left-[255px] rounded-2xl -scale-x-100`}
          />
          <img
            src={`/assets/furniture/책장최종.png`}
            alt=""
            className={`absolute top-[28px] left-[430px] rounded-2xl`}
          />

          {furnitures.map(({ name, x, y, use, reflect, category }, index) => {
            if (use && category !== "벽지" && category !== "바닥")
              return (
                <Draggable
                  key={index}
                  onStop={(e, data) => {
                    const temp = [...position]
                    temp[index].x = data.x
                    temp[index].y = data.y
                    console.log(data)
                    setPosition(temp)
                  }}
                  bounds="parent"
                >
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
                        className={`cursor-move`}
                        style={{
                          transform: "scaleX(-1)",
                        }}
                      />
                    ) : (
                      <img
                        src={`/assets/furniture/${name}.png`}
                        alt=""
                        className={`cursor-move`}
                      />
                    )}
                    <div className="overlay bottom-[-23px] absolute flex transform -translate-x-1/2 left-1/2">
                      <div
                        className="overlay cursor-pointer bg-white text-xs rounded-lg border-2 right-6 w-[20px] h-[20px] flex justify-center items-center mr-1"
                        onClick={() => {
                          let temp = [...furnitures]
                          temp[index].reflect = !temp[index].reflect
                          setFurnitures(temp)
                        }}
                      >
                        <img
                          src="/assets/tutorial/반전.png"
                          alt=""
                          className="w-[14px]"
                        />
                      </div>
                      <div
                        className="overlay cursor-pointer p-1 bg-white text-xs rounded-lg border-2 w-[20px] h-[20px] flex justify-center items-center"
                        onClick={() => {
                          let temp = [...furnitures]
                          temp[index].use = false
                          setFurnitures(temp)
                        }}
                      >
                        ❌
                      </div>
                    </div>
                  </div>
                </Draggable>
              )
          })}
        </div>

        <div>
          <div className="flex justify-between w-full">
            {categories.map((item, index) => {
              if (item === tap)
                return (
                  <div
                    key={index}
                    className="z-10 flex justify-center w-full bg-[#dee9ff] border-t-2 border-r-2 rounded-t-lg gowunBatang text-sm font-semibold py-1"
                  >
                    {item}
                  </div>
                )
              else
                return (
                  <div
                    key={index}
                    className="z-10 flex justify-center w-full py-1 text-sm font-semibold border-t-2 border-r-2 rounded-t-lg cursor-pointer gowunBatang bg-[#85a2db] border-[#6a8bcf]"
                    onClick={() => {
                      setTap(item)
                    }}
                  >
                    {item}
                  </div>
                )
            })}
          </div>
          <div className="w-[800px] h-[120px] flex p-2 from-[#dee9ff]  bg-gradient-to-b to-[#b3c7ff] rounded-b-lg overflow-scroll z-10 non-scroll py-5">
            <div className="flex flex-wrap">
              {furnitures.map(({ name, use, category }, index) => {
                if (!use && category === tap)
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        if (category !== "벽지" && category !== "바닥") {
                          let temp = [...furnitures]
                          temp[index].x = 0
                          temp[index].y = 0
                          temp[index].use = true
                          setFurnitures(temp)
                        } else if (category === "벽지") {
                          let temp = [...furnitures]
                          const findIndex = temp.findIndex(
                            (e) => e.name === wall
                          )
                          temp[findIndex].use = false
                          temp[index].use = true
                          setFurnitures(temp)
                          setWall(name)
                        } else {
                          let temp = [...furnitures]
                          const findIndex = temp.findIndex(
                            (e) => e.name === floor
                          )
                          temp[findIndex].use = false
                          temp[index].use = true
                          setFurnitures(temp)
                          setFloor(name)
                        }
                      }}
                      className="cursor-pointer h-[80px] w-[80px] mx-2 relative mb-4"
                    >
                      <div className="absolute top-0 w-full h-full rounded-xl">
                        <img
                          src={`/assets/thumbnail/${name}.png`}
                          alt=""
                          className="w-full h-full rounded-xl"
                        />
                      </div>
                    </div>
                  )
                if (use && category === tap)
                  return (
                    <div
                      key={index}
                      className="h-[80px] w-[80px] relative mx-2 rounded-xl mb-4"
                    >
                      <img
                        src={`/assets/thumbnail/${name}.png`}
                        alt=""
                        className="w-full h-full rounded-xl"
                      />
                      <div className="absolute top-0 w-full h-full bg-black opacity-30 rounded-xl"></div>
                    </div>
                  )
              })}
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full font-bold gowunBatang">
          <div
            onClick={() => navigate(-1)}
            className="w-[390px] h-[40px] rounded-xl border-white border-2 bg-gray-200 items-center flex justify-center shadow-md cursor-pointer z-10 hover:bg-gray-300 hover:border-gray-200"
          >
            돌아가기
          </div>
          <div
            className="w-[390px] h-[40px] rounded-xl border-white border-2 bg-blue-200 flex items-center justify-center shadow-md cursor-pointer z-10 hover:bg-blue-300 hover:border-blue-200"
            onClick={() => {
              {
                let temp = [...furnitures]
                position.map(({ x, y }, index) => {
                  if (temp[index].x !== x) {
                    temp[index].x += x
                  }
                  if (temp[index].y !== y) {
                    temp[index].y += y
                  }
                })
                const data = { wall, floor, furnitures }
                sendFurnitures(data)
              }
            }}
          >
            저장하기
          </div>
        </div>
      </div>
    </div>
  )
}
