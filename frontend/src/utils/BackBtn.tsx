import { useNavigate } from "react-router-dom"

export default function BackBtn() {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(-1)}
      className="cursor-pointer absolute top-[-40px] w-10 h-10 flex justify-center items-center right-8 bg-red-50"
    >
      <img src="/assets/tutorial/x.png" alt="" className="w-[18px]" />
    </div>
  )
}
