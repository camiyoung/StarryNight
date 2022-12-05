import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Navbar() {
  const [navList, setNavList] = useState([
    {
      name: "A208",
      path: "/a208",
    },
    {
      name: "로그인",
      path: "/login",
    },
  ])

  useEffect(() => {
    if (localStorage.getItem("memberId")) {
      const newNavList = [...navList]
      newNavList[1] = {
        name: "다락방",
        path: `/room/${localStorage.getItem("memberId")}`,
      }
      setNavList(newNavList)
    }
  }, [])

  return (
    <div className="w-full h-[80px] bg-black fixed top-0 flex justify-between pr-20 pl-10 items-center prettyNight text-lg z-50">
      <NavLink to="/">
        <img src="/assets/로고가로.png" alt="" className="w-[25%]" />
      </NavLink>
      <div className="flex">
        {navList.map(({ name, path }, index) => (
          <div className="pl-4 text-white" key={index}>
            <NavLink to={path}>{name}</NavLink>
          </div>
        ))}
      </div>
    </div>
  )
}
