import Navbar from "../components/navbar/Navbar"

export default function Login() {
  if (localStorage.getItem("accessToken") && localStorage.getItem("memberId")) {
    window.location.replace(`/room/${localStorage.getItem("memberId")}`)
  }

  console.log(
    `${process.env.REACT_APP_KAKAO_REDIRECT_URI}?redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`
  )
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Navbar />
      <div className="flex items-center justify-center w-full h-full night">
        {" "}
        <div className="shooting_star"></div>
        <div className="shooting_star"></div>
        <div className="shooting_star"></div>
        <div className="shooting_star"></div>
        <div className="shooting_star"></div>
        <div className="shooting_star"></div>
        <div className="shooting_star"></div>
        <div className="shooting_star"></div>
        <div className="shooting_star"></div>
      </div>
      <div className="absolute flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 gowunBatang top-1/2 left-1/2">
        <div className="mb-5 text-white">
          Starry Night의 모든 서비스를 직접 즐겨보세요
        </div>
        <a
          href={`${process.env.REACT_APP_KAKAO_REDIRECT_URI}?redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`}
        >
          <div className="bg-[#fce300] w-[300px] h-[50px] mb-5 flex rounded-lg cursor-pointer">
            <div className="w-[50px] flex justify-center items-center p-2">
              <img src="/assets/kakaotalk.svg" alt="" />
            </div>
            <div className="w-[250px] flex justify-center items-center">
              카카오톡으로 로그인
            </div>
          </div>
        </a>
        <a
          href={`${process.env.REACT_APP_GOOGLE_REDIRECT_URI}?redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`}
        >
          <div className="bg-white w-[300px] h-[50px] flex rounded-lg cursor-pointer">
            <div className="w-[50px] flex justify-center items-center p-2">
              <img src="/assets/google.png" alt="" />
            </div>
            <div className="w-[250px] flex justify-center items-center">
              구글로 로그인
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}
