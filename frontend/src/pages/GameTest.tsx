import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Unity, useUnityContext } from "react-unity-webgl"
import "../utils/Game.css"

function GameTest() {
  const params = useParams().name
  const navigate = useNavigate()
  const [GameStart, setGameStart] = useState(false)
  const {
    unityProvider,
    loadingProgression,
    isLoaded,
    sendMessage,
    addEventListener,
    removeEventListener,
    unload,
    requestFullscreen,
  } = useUnityContext({
    dataUrl: `Build/${params}/${params}.data`,
    loaderUrl: `Build/${params}/${params}.loader.js`,
    frameworkUrl: `Build/${params}/${params}.framework.js`,
    codeUrl: `Build/${params}/${params}.wasm`,
  })
  function handleUserId() {
    console.log("아이디 전송 ")
    sendMessage(
      "Manager",
      "getPlayerId",
      parseInt(localStorage.getItem("memberId")!)
    )
  }

  const movePage = () => {
    console.log("game over 이벤트 수신 ")
    navigate(`/room/${localStorage.getItem("memberId")}`)
  }

  const finishUnity = async () => {
    movePage()
  }
  const onGameStart = () => {
    handleUserId()
    setTimeout(() => {
      handleUserId()
    }, 3000)
  }

  useEffect(() => {
    addEventListener("GameOver", finishUnity)
  }, [addEventListener, removeEventListener])

  const onGameStartButton = () => {
    handleUserId()
    setGameStart(true)
  }

  window.onpopstate = function (event) {
    if (event) {
      sendMessage("Manager", "requestGameExit")
    }
  }

  return (
    <div className="flex items-center justify-center w-full h-screen ">
      {!isLoaded && (
        <div className="absolute text-white transform -translate-x-1/2 -translate-y-1/2 loading-overlay gowunBatang top-1/2 left-1/2">
          {" "}
          <div className="spinner-container">
            <div className="spinner">
              <span className="spinner-ball"></span>
            </div>
          </div>
          <div className="mt-10 text-lg">
            신화를 연결하고 있어요… {Math.ceil(loadingProgression * 100)}%
          </div>
        </div>
      )}
      <div className="relative flex items-center justify-center w-full h-full">
        {isLoaded && !GameStart && (
          <div className="absolute z-50 flex flex-col items-center justify-center w-full h-full">
            <div className="rounded-full " onClick={onGameStartButton}>
              <div className="h-[500px] w-[240px] door z-100" />
            </div>
            <div className="mt-3 text-white gowunBatang">
              신화 속에 들어갈 준비를 마쳤어요!
            </div>
          </div>
        )}
        <Unity
          unityProvider={unityProvider}
          style={{
            width: 1280,
            height: 720,
            visibility: isLoaded && GameStart ? "visible" : "hidden",
            zIndex: 100,
          }}
          className="rounded-3xl"
        />
        <div
          style={{
            visibility: isLoaded && GameStart ? "visible" : "hidden",
          }}
          className="h-[720px] ml-3"
        >
          <button
            className="flex items-center justify-center bg-black rounded-2xl w-[50px] h-[50px] custom-btn2 border-2 border-red-900 hover:border-[#ffffff00]"
            onClick={() => {
              sendMessage("Manager", "requestGameExit")
              navigate(`/room/${localStorage.getItem("memberId")}`)
            }}
          >
            <img src="/assets/tutorial/x.png" alt="" className="w-5" />
          </button>
          <button
            className="flex items-center justify-center bg-black rounded-2xl w-[50px] h-[50px] custom-btn2 border-2 border-gray-700 hover:border-[#ffffff00] mt-3"
            onClick={() => requestFullscreen(true)}
          >
            <img src="/assets/fullscreen.png" alt="" className="w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default GameTest
