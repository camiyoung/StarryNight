import { useEffect, useState } from "react"
import { http } from "../../api/axios"

export default function Constellation() {
  const [stars, setStars] = useState([
    {
      constellation: "처녀자리",
      title: "사라진 페르세포네",
      summary:
        "제우스와 대지의 여신 데메테르의 딸 페르세포네. 그런데 어느 날 페르세포네가 갑자기 사라졌고, 데메테르가 슬픔에 빠지자 추운 겨울이 온 대지를 뒤덮었다.",
      finish: true,
      totalStar: 13,
      currentStar: 0,
    },
  ])

  const [showStars, setShowStars] = useState([[], [], [], [], []])
  const [num, setNum] = useState(1)

  const starList = ["virgo", "leo", "lyra", "perseus", "cassiopeia"]

  async function checkConstellation() {
    const data = await http.get(
      `game/story/list/id/${localStorage.getItem("memberId")}`
    )
    setStars(data.data.stories)
    console.log(data)
    setNum(num + 1)
  }

  function setBackground() {
    const newShowStars = [[], [], [], [], []] as any
    stars.forEach(({ currentStar }, i) => {
      for (let j = 0; j < currentStar; j++) {
        newShowStars[i].push(starList[i])
      }
    })
    setShowStars(newShowStars)
  }

  useEffect(() => {
    checkConstellation()
  }, [])

  useEffect(() => {
    setBackground()
    console.log("별 배치 확인")
  }, [num])

  return (
    <div className="fixed w-screen h-screen overflow-hidden">
      {localStorage.getItem("memberId") ? (
        <div className="w-[800px] h-[360px] rounded-2xl absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          {/* 처녀자리 */}
          <img
            src="/assets/constellation/Virgo.png"
            className="absolute left-[-273px] top-[90px] -rotate-12 opacity-20"
            alt=""
          />
          <div>
            <div
              className={`${showStars[0][0]} top-[110px] left-[-108px]`}
            ></div>
            <div
              className={`${showStars[0][1]} top-[148px] left-[-99px]`}
            ></div>
            <div
              className={`${showStars[0][2]} top-[180px] left-[-102px]`}
            ></div>
            <div
              className={`${showStars[0][3]} top-[193px] left-[-130px]`}
            ></div>
            <div
              className={`${showStars[0][4]} top-[187px] left-[-172px]`}
            ></div>
            <div
              className={`${showStars[0][5]} top-[221px] left-[-89px]`}
            ></div>
            <div
              className={`${showStars[0][6]} top-[247px] left-[-66px]`}
            ></div>
            <div
              className={`${showStars[0][7]} top-[240px] left-[-120px]`}
            ></div>
            <div
              className={`${showStars[0][8]} top-[297px] left-[-84px]`}
            ></div>
            <div
              className={`${showStars[0][9]} top-[294.5px] left-[-99px]`}
            ></div>
            <div
              className={`${showStars[0][10]} top-[326px] left-[-109px]`}
            ></div>
            <div
              className={`${showStars[0][11]} top-[267.5px] left-[-140.5px]`}
            ></div>
            <div
              className={`${showStars[0][12]} top-[316px] left-[-156px]`}
            ></div>
          </div>

          {/* 사자자리 */}
          <img
            src="/assets/constellation/Leo.png"
            className="absolute left-[-300px] bottom-[280px] opacity-30 -rotate-45"
            alt=""
          />
          <div>
            <div
              className={`${showStars[1][0]} top-[-123px] left-[-127px]`}
            ></div>
            <div
              className={`${showStars[1][1]} top-[-123px] left-[-150px]`}
            ></div>
            <div
              className={`${showStars[1][2]} top-[-78px] left-[-153px]`}
            ></div>
            <div
              className={`${showStars[1][3]} top-[-52px] left-[-136px]`}
            ></div>
            <div
              className={`${showStars[1][4]} top-[-55px] left-[-108px]`}
            ></div>
            <div
              className={`${showStars[1][5]} top-[-33px] left-[-76px]`}
            ></div>
            <div
              className={`${showStars[1][6]} top-[-55px] left-[-36px]`}
            ></div>
            <div
              className={`${showStars[1][7]} top-[-75px] left-[-36px]`}
            ></div>
            <div
              className={`${showStars[1][8]} top-[17px] left-[-202px]`}
            ></div>
            <div
              className={`${showStars[1][9]} top-[42px] left-[-171px]`}
            ></div>
            <div
              className={`${showStars[1][10]} top-[93px] left-[-210px]`}
            ></div>
          </div>

          {/* 거문고자리 */}
          <div>
            <img
              src="/assets/constellation/Lyra.png"
              className="absolute left-[710px] top-[-90px] opacity-20 rotate-30"
              alt=""
            />
            <div
              className={`${showStars[2][0]} top-[-46px] left-[924px]`}
            ></div>
            <div
              className={`${showStars[2][1]} top-[-30px] left-[952px]`}
            ></div>
            <div className={`${showStars[2][2]} top-[-4px] left-[921px]`}></div>
            <div className={`${showStars[2][3]} top-[6px] left-[886px]`}></div>
            <div className={`${showStars[2][4]} top-[74px] left-[902px]`}></div>
            <div className={`${showStars[2][5]} top-[86px] left-[866px]`}></div>
          </div>

          {/* 페르세우스 */}
          <div className="">
            <img
              src="/assets/constellation/Perseus.png"
              className="absolute left-[800px] top-[170px] opacity-20 -rotate-[34deg]"
              alt=""
            />
            <div
              className={`${showStars[3][0]} top-[138px] left-[981px]`}
            ></div>
            <div
              className={`${showStars[3][1]} top-[210px] left-[900px]`}
            ></div>
            <div
              className={`${showStars[3][2]} top-[235px] left-[899px]`}
            ></div>
            <div
              className={`${showStars[3][3]} top-[272px] left-[907px]`}
            ></div>
            <div
              className={`${showStars[3][4]} top-[280px] left-[950px]`}
            ></div>
            <div
              className={`${showStars[3][5]} top-[300px] left-[979px]`}
            ></div>
            <div
              className={`${showStars[3][6]} top-[308px] left-[998px]`}
            ></div>
            <div
              className={`${showStars[3][7]} top-[303px] left-[905px]`}
            ></div>
            <div
              className={`${showStars[3][8]} top-[335px] left-[869px]`}
            ></div>
            <div
              className={`${showStars[3][9]} top-[334px] left-[852px]`}
            ></div>
            <div
              className={`${showStars[3][10]} top-[309px] left-[848px]`}
            ></div>
            <div
              className={`${showStars[3][11]} top-[398px] left-[858px]`}
            ></div>
            <div
              className={`${showStars[3][12]} top-[359px] left-[936.5px]`}
            ></div>
            <div
              className={`${showStars[3][13]} top-[389px] left-[956px]`}
            ></div>
            <div
              className={`${showStars[3][14]} top-[406px] left-[985px]`}
            ></div>
            <div
              className={`${showStars[3][15]} top-[390px] left-[1002px]`}
            ></div>
          </div>

          {/* 화살자리 */}
          {/* <div>
          <img
            src="/assets/constellation/Sagitta.png"
            className="absolute left-[640px] -top-[280px] opacity-30 rotate-[27deg]"
            alt=""
          />
          <div className="sagitta -top-[50px] left-[912px]"></div>
          <div className="sagitta -top-[37px] left-[891px]"></div>
          <div className="sagitta -top-[73px] left-[875px]"></div>
          <div className="sagitta -top-[130px] left-[822px]"></div>
        </div> */}

          {/* 카시오페이아자리 */}
          <div>
            <img
              src="/assets/constellation/Cassiopeia.png"
              className="absolute left-[-200px] -top-[-300px] opacity-20 rotate-[60deg]"
              alt=""
            />
            <div
              className={`${showStars[4][0]} -top-[-417px] left-[20px]`}
            ></div>
            <div
              className={`${showStars[4][1]} -top-[-482px] left-[-27px]`}
            ></div>
            <div
              className={`${showStars[4][2]} -top-[-429px] left-[-79px]`}
            ></div>
            <div
              className={`${showStars[4][3]} -top-[-449px] left-[-135px]`}
            ></div>
            <div
              className={`${showStars[4][4]} -top-[-400px] left-[-197px]`}
            ></div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
