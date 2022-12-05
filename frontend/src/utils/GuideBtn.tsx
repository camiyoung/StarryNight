import { useNavigate } from "react-router-dom"

export default function GuideBtn({ path }: { path: string }) {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(path)}
      className="cursor-pointer absolute top-[-40px] w-10 h-10 flex justify-center items-center right-20 bg-lime-100"
    >
      <img src="/assets/tutorial/인포2.png" alt="" className="w-[20px]" />
    </div>
  )
}
