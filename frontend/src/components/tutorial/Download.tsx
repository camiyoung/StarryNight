export default function Download() {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex items-center justify-between w-full p-5 bg-gradient-to-r from-white to-indigo-50 h-[30%] rounded-3xl shadow-md">
        <div className="font-bold text-8xl w-[15%] text-indigo-700">1</div>
        <div className="w-[45%] text-left pl-3 font-semibold">
          플레이 하고 싶은 버전을 다운로드 합니다. <br />
          <span className="text-sm">
            * VR 버전은 VR 기기를 컴퓨터와 연결해주세요.
          </span>
        </div>
        <div className="w-[40%] flex justify-end h-full">
          <img
            src="/assets/tutorial/download1.png"
            alt=""
            className="h-full shadow-lg rounded-xl"
          />
        </div>
      </div>
      <div className="flex items-center justify-between w-full p-5 h-[30%] rounded-3xl bg-gradient-to-r from-indigo-50 to-indigo-100 shadow-md">
        <div className="font-bold text-8xl w-[15%] text-indigo-800">2</div>
        <div className="w-[45%] text-left pl-3 font-semibold">
          다운로드 된 zip 파일의 압축을 해제한 후, <br /> 동명의 폴더를
          열어줍니다.
        </div>
        <div className="w-[40%] flex justify-end h-full">
          <img
            src="/assets/tutorial/download2.png"
            alt=""
            className="h-full shadow-lg rounded-xl"
          />
        </div>
      </div>
      <div className="flex items-center justify-between w-full p-5 bg-gradient-to-r from-indigo-100 to-indigo-200 h-[30%] rounded-3xl shadow-md">
        <div className="font-bold text-8xl w-[15%] text-indigo-900">3</div>
        <div className="w-[45%] text-left pl-3 font-semibold">
          폴더 안의 StarryNight.exe 파일을 실행시킵니다. <br /> 닉네임과
          캐릭터를 선택 후 밤하늘을 즐겨보세요!
        </div>
        <div className="w-[40%] flex justify-end h-full">
          <img
            src="/assets/tutorial/download3.png"
            alt=""
            className="h-full shadow-lg rounded-xl"
          />
        </div>
      </div>
    </div>
  )
}
