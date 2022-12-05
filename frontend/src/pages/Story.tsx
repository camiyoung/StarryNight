import parse from "html-react-parser"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { http } from "../api/axios"
import BackBtn from "../utils/BackBtn"

export default function Story() {
  const params: any = useParams().name!
  const navigate = useNavigate()

  useEffect(() => {
    console.log(
      `game/story/clear/id/${localStorage.getItem(
        "memberId"
      )}/constellation/${params}`
    )
    async function checkClear() {
      const data = await http.get(
        `game/story/clear/id/${localStorage.getItem(
          "memberId"
        )}/constellation/${params}`
      )
      if (!data.data) {
        navigate(`/room/${localStorage.getItem("memberId")}`)
      }
    }
    checkClear()
  }, [])

  type storyType = {
    [key: string]: {
      name: string
      story: string
      scientific: string
      location: string
      declination: string
      alpha: string
      explanation: string
    }
  }

  const story: storyType = {
    virgo: {
      name: "처녀자리",
      story:
        "　대지의 여신 데메테르의 딸 페르세포네는 지하세계의 왕인 하데스의 마음을 사로잡을 정도로 아름다운 여인이었다. 하데스는 그녀를 납치하여 자신의 아내로 삼았다.<br/><br/>　페르세포네는 지하세계에서 부족할 것 없는 생활을 하였지만 땅위의 풍경들을 생각할 때면 깊은 슬픔에 잠기곤 하였다. 한편 딸을 잃은 데메테르는 비탄에 빠진다. 대지의 여신이 슬퍼하자 대지는 황폐해졌고 사람과 동물들이 살 수 없는 지경에 이르게 되었다. 신들의 왕인 제우스는 이를 방관할 수 없어 지하세계의 왕이자 자신의 형인 하데스를 설득하였다.<br/><br/>　결국 페르세포네는 일 년의 반 동안만 지하세계에 있고 나머지 반은 지상에서 어머니와 함께 지낼 수 있게 되었다. 딸을 만나게 되어 데메테르의 슬픔이 가시게 되면 땅은 다시 활기를 찾게 된다. 봄이 되면 동쪽하늘로 떠오르는 처녀자리는 지하세계에서 올라오는 페르세포네의 모습인 것이다.<br/><br/> <b>별자리 여행, 한국천문연구원 </b>",
      scientific: "Virgo",
      location: "적경 13h 20m",
      declination: "-2°",
      alpha: "Spica<br/>(스피카)",
      explanation:
        "봄철의 별자리. 알파별인 스피카는 봄의 별자리들을 찾는데 편리하게 이용되는 봄의 대삼각형 중 하나이다.",
    },
    leo: {
      name: "사자자리",
      story:
        "　하늘이 혼란스러워 별들이 자리를 떠나고 혜성이 자주 나타나던 때 달에서 유성 하나가 황금사자의 모습으로 네메아 골짜기에 떨어졌다. 이 사자는 지구의 사자보다 훨씬 컸고, 성질도 포악하여 네메아 사람들에게 많은 고통을 주었다.<br/><br/>　그 당시 제우스와 알크메나 사이에서 태어난 헤르쿨레스는 제우스의 아내 헤라의 미움을 받아 12가지의 모험을 해야 했는데 그 중 첫 번째가 네메아 골짜기의 사자를 죽이는 일이었다. 활과 창, 방망이 등 어떤 무기도 결코 사자를 해칠 수 없었다. 헤르쿨레스는 무기를 버리고 사자와 뒤엉켜 생사를 가르는 격투를 벌인 끝에 사자를 물리칠 수 있었다.<br/><br/>　그 후로 네메아 지방 사람들은 사자의 공포에서 벗어나 평온을 되찾을 수 있었고, 헤르쿨레스는 어떠한 무기로도 뚫을 수 없는 사자 가죽을 얻게 되었다. 제우스는 아들 헤르쿨레스의 용맹을 기리기 위하여 사자를 하늘의 별자리로 만들었다. <br/><br/> <b>별자리 여행, 한국천문연구원 </b>",
      scientific: "Leo",
      location: "적경 10h 30m",
      declination: "+15°",
      alpha: "Regulus<br/>(레굴루스)",
      explanation:
        "봄철의 별자리. 베타별인 데네볼라는 봄의 별자리들을 찾는데 편리하게 이용되는 봄의 대삼각형 중 하나이다.",
    },
    lyra: {
      name: "거문고자리",
      story:
        "　오르페우스에게는 에우리디케라는 아름다운 아내가 있었는데 불행히도 그녀가 뱀에 물려 죽고 말았다. 아내를 너무너무 사랑한 오르페우스는 슬픔을 참지 못하고 지하세계로 향한다. <br/><br/>　오르페우스는 지하세계의 왕 하데스와 그의 아내 페르세포네 앞에서 거문고를 연주하며 에우리디케를 돌려줄 것을 간청했다. 오르페우스의 사랑에 감동한 페르세포네는 에우리디케를 데려가도 좋다고 허락하고 단, 땅위에 이를 때까지 뒤를 돌아보지 말라는 조건을 붙인다. 거의 땅 위에 다다를 무렵 아내가 뒤따라오는지 걱정이 되어 뒤를 돌아보는 순간 에우리디케는 다시는 돌아올 수 없는 어둠 속으로 사라지고 말았다. 그 후 오르페우스도 실의에 빠져 결국 죽고 말았다.<br/><br/>　한편, 주인을 잃은 거문고에서는 슬프고 아름다운 음악이 계속 흘러나왔고, 제우스는 그의 거문고를 하늘에 올려 모든 사람들이 영원히 그의 음악을 기억하게 하였다.<br/><br/> <b>별자리 여행, 한국천문연구원 </b>",
      scientific: "Lyra",
      location: "적경 18h 45m",
      declination: "+36°",
      alpha: "Vega<br/>(베가)",
      explanation:
        "여름철 별자리. 알파별인 베가는 하늘에서 네 번째로 밝은 별이며 우리나라에선 '직녀성'이라 부르기도 한다.",
    },
    perseus: {
      name: "페르세우스자리",
      story:
        "　어느 날 페르세우스가 사는 섬을 다스리는 폴리덱테스 왕이 페르세우스의 어머니에게 반해 그녀를 차지하려했는데, 페르세우스 때문에 실패하고 말았다. 이 사건으로 폴리덱테스 왕의 미움을 받게 된 페르세우스는 메두사를 없애야 하는 벌을 받게 되었다. 메두사는 자신의 아름다움을 자랑하다가 아테네의 미움을 사 머리카락이 모두 뱀으로 변해 버렸고, 그녀의 눈을 쳐다본 사람은 모두 돌로 변해 버리는 마력을 갖게 된 괴물이다. 페르세우스는 아테네 여신이 준 거울처럼 빛나는 방패와 전령의 신 헤르메스가 준 날개 달린 신발로 무장을 하고 메두사를 무찔렀다. 메두사의 머리를 잘라 돌아가던 길에 바다 괴물의 제물이 될 뻔한 안드로메다 공주를 구하고 세페우스와 카시오페이아의 사위가 되었다.<br/><br/>　훗날 페르세우스와 안드로메다가 죽게 되었을 때 아테네 여신은 이들을 세페우스, 카시오페이아, 고래가 있는 곳에 두 개의 별자리로 만들어 주었다.<br/><br/> <b>별자리 여행, 한국천문연구원 </b>",
      scientific: "Perseus",
      location: "적경 3h 20m",
      declination: "+42°",
      alpha: "Mirfak<br/>(미르파크)",
      explanation:
        "가을철 별자리. 베타별인 알골은 정확히 2.87일마다 규칙적으로 밝기가 바뀌는 변광성이다.",
    },
    cassiopeia: {
      name: "카시오페아자리",
      story:
        "　에티오피아의 공주인 안드로메다는 카시오페이아와 세페우스 사이에서 태어났다. 카시오페이아는 허영심이 많은 왕비로 자신이 바다의 요정보다 예쁘다고 떠벌리고 다녀서 바다 요정들을 화나게 만들었다. 화가 난 바다 요정들은 바다의 신 포세이돈에게 카시오페이아를 혼내줄 것을 요청한다. 포세이돈은 괴물 고래를 보내 에티오피아를 황폐하게 만들었다. <br/><br/>　세페우스 왕과 카시오페아 왕비는 이 재앙을 해결하기 위해 그의 아름다운 딸 안드로메다를 제물로 바쳐야했다. 안드로메다는 괴물 고래에게 희생되려는 찰나에 페르세우스에게 구출되어 후에 페르세우스의 아내가 되었다.<br/><br/> <b>별자리 여행, 한국천문연구원 </b>",
      scientific: "Cassiopeia",
      location: "적경 0h 52m",
      declination: "+60°",
      alpha: "Schedar<br/>(쉐다르)",
      explanation:
        "사계절 내내 관측이 가능하다. 북두칠성과 함께 북극성을 찾는 중요한 길잡이별의 역할을 한다.",
    },
  }

  return (
    <div className="flex items-center justify-center w-full h-screen gowunBatang">
      <div className="w-[900px] h-[600px] flex rounded-3xl relative bg-neutral-100">
        <BackBtn />
        <div className="absolute h-[85%] w-[1.2px] bg-neutral-300 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"></div>
        <div className="flex flex-col justify-between w-1/2 h-full p-12">
          <div
            className="flex justify-center text-4xl font-bold text-white"
            style={{
              textShadow: "0px 0px 5px #ff9900",
            }}
          >
            {story[params].name}
          </div>
          <img
            src={`/assets/constellation/${story[params].scientific}.gif`}
            alt=""
            className="w-[354px] h-[50%] rounded-xl"
          />
          <div className="w-full h-[18%]">
            <div className="w-full h-[50%] flex justify-center items-center">
              <div className="w-[20%] font-bold">학명</div>
              <div className="w-[30%]">{story[params].scientific}</div>
              <div className="w-[20%] font-bold">알파별</div>
              <div className="w-[30%]">{parse(story[params].alpha)}</div>
            </div>
            <div className="w-full h-[50%] flex justify-center items-center">
              <div className="w-[20%] font-bold">위치</div>
              <div className="w-[30%]">{story[params].location}</div>
              <div className="w-[20%] font-bold">적위</div>
              <div className="w-[30%]">{parse(story[params].declination)}</div>
            </div>
          </div>
          <div className="text-sm leading-loose text-left">
            {story[params].explanation}
          </div>
        </div>
        <div className="w-1/2 h-full p-12 text-sm leading-loose text-left">
          {parse(story[params].story)}
        </div>
      </div>
    </div>
  )
}
