import { useEffect, useState } from "react"
import { http } from "../api/axios"
import BackBtn from "../utils/BackBtn"
import Swal from "sweetalert2"

export const categories = ["벽지", "바닥", "벽걸이", "대형", "중형", "소형"]

// 보낼 것: 카테고리, 페이지, 멤버 id

export default function Shop() {
  const [tap, setTap] = useState("벽지")
  const [page, setPage] = useState(0)
  const [totalPage, setTotalPage] = useState(1)
  const [pages, setPages] = useState([1])
  const [coin, setCoin] = useState(1)
  const [furnitures, setfurnites] = useState([
    { name: "1번 가구", price: 4, sell: true },
  ])

  async function furnituresGet() {
    const data = await http.get(
      `store/id/${localStorage.getItem("memberId")}/category/${
        categories.indexOf(tap) + 1
      }/page/${page}`
    )
    console.log(data)

    setfurnites(data.data.furnitures)
    setTotalPage(data.data.totalPage)
  }

  useEffect(() => {
    const newPages = []
    for (let i = 0; i < totalPage; i++) {
      newPages.push(i)
    }
    setPages(newPages)
  }, [totalPage])

  async function findCoin() {
    const data = await http.get(
      `game/starcoin/count/id/${localStorage.getItem("memberId")}`
    )
    setCoin(data.data.count)
  }

  useEffect(() => {
    findCoin()
    furnituresGet()
  }, [])

  useEffect(() => {
    furnituresGet()
  }, [page, tap])

  async function buyItem(name: string) {
    const data = await http.post(`store/order`, {
      id: window.localStorage.getItem("memberId"),
      name: name,
    })
    await furnituresGet()
    console.log(data)
    findCoin()
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="w-[900px] h-[600px] flex flex-col items-center justify-between from-[#dee9ff]  bg-gradient-to-r to-[#edf2fa] rounded-r-3xl relative p-6 px-10">
        <div className="flex items-center justify-end w-full">
          <span className="mr-3 text-sm opacity-50 gowunBatang">
            신화 속에서 숨어있는 별들을 획득할 수 있습니다!
          </span>
          <div className="flex items-center px-3 text-lg font-semibold bg-white rounded-full shadow-md gowunBatang">
            <span className="mr-2 text-base font-medium">보유 별 :</span>
            {coin}
            <img
              src="/assets/tutorial/star.png"
              alt=""
              className="w-[18px] h-[18px] ml-1"
            />
          </div>
        </div>
        <BackBtn />
        <div
          className="absolute left-[-40px] transform -translate-y-1/2 top-1/2 gowunBatang font-semibold h-full
        "
        >
          {categories.map((item, index) => {
            if (item === tap)
              return (
                <div
                  className="py-3 px-4 bg-[#dee9ff] w-[40px] rounded-l-lg h-1/6 flex justify-center items-center border-b-2 border-l-2 border-[#dee9ff]"
                  key={index}
                >
                  {item}
                </div>
              )
            else
              return (
                <div
                  className="py-3 px-4 bg-[#85a2db] border-[#6a8bcf] w-[40px] cursor-pointer rounded-l-lg h-1/6 flex justify-center items-center border-b-2 border-l-2"
                  onClick={() => {
                    setPage(0)
                    setTap(item)
                  }}
                  key={index}
                >
                  {item}
                </div>
              )
          })}
        </div>
        <div className="flex flex-wrap w-full h-[90%] p-2 px-3 rounded-2xl">
          {furnitures.map(({ name, price, sell }) => (
            <div className="w-[25%] h-[50%] p-2" key={name}>
              <div className="flex flex-col items-center w-full h-full p-3 bg-white shadow-md rounded-xl gowunBatang">
                <img
                  src={`/assets/thumbnail/${name}.png`}
                  alt=""
                  className="w-[130px] h-[130px]"
                />
                <div className="mt-3 mb-[6px] font-semibold ">{name}</div>
                <div className="flex justify-between w-full px-5">
                  <div className="w-[30%] flex items-center">
                    <img
                      src="/assets/tutorial/star.png"
                      alt=""
                      className="w-[15px] h-[15px] mr-1"
                    />
                    {price}
                  </div>
                  {!sell ? (
                    <button
                      className="w-[65%] font-semibold bg-yellow-100 rounded-full text-sm border-2 border-yellow-200"
                      onClick={() => {
                        if (coin >= price) {
                          buyItem(name)
                          return Swal.fire({
                            icon: "success",
                            text: "구매 되었습니다.",
                            showConfirmButton: false,
                            timer: 1500,
                          })
                        } else {
                          return Swal.fire({
                            icon: "error",
                            text: "코인이 부족합니다!",
                            showConfirmButton: false,
                            timer: 1500,
                          })
                        }
                      }}
                    >
                      구매
                    </button>
                  ) : (
                    <button className="w-[65%] font-semibold bg-gray-300 rounded-full text-sm border-2 border-gray-400">
                      구매 완료
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex">
          {pages.map((item, index) => {
            return (
              <div>
                {index === page ? (
                  <div
                    className="w-3 h-3 mx-1 bg-white border border-yellow-500 rounded-full shadow-xl"
                    key={index}
                  ></div>
                ) : (
                  <div
                    className="w-3 h-3 mx-1 bg-gray-400 border rounded-full shadow-xl cursor-pointer"
                    key={index}
                    onClick={() => {
                      setPage(index)
                    }}
                  ></div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
