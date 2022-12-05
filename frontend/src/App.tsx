import "./App.css"
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import LoginCheck from "./pages/LoginCheck"
import Room from "./pages/Room"
import Deco from "./pages/Deco"
import Shop from "./pages/Shop"
import Book from "./pages/Book"
import Telescope from "./pages/Telescope"
import Story from "./pages/Story"
import GameTuto from "./pages/GameTuto"
import GameTest from "./pages/GameTest"
import TelescopeTuto from "./pages/TelescopeTuto"

import Constellation from "./components/myroom/Constellation"

import "./utils/font.css"

import memberAtom from "./recoil/member/atom"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { useEffect } from "react"
import A208 from "./pages/A208"

function App() {
  const setMemberState = useSetRecoilState(memberAtom)
  const id = useRecoilValue(memberAtom)

  useEffect(() => {
    if (
      localStorage.getItem("accessToken") &&
      localStorage.getItem("memberId") &&
      localStorage.getItem("memberNickname")
    ) {
      setMemberState({
        memberId: localStorage.getItem("memberId")!,
        memberNickname: localStorage.getItem("memberNickname")!,
      })
    }
  }, [])

  const ProtectedRoute = ({
    token,
    nickname,
    redirectPath,
    children,
  }: {
    token: string
    nickname: string
    redirectPath: string
    children?: any
  }) => {
    if (!token || !nickname) {
      return <Navigate replace to={redirectPath} />
    }

    return children ? children : <Outlet />
  }

  return (
    <div className="w-screen h-screen App bg-gradient-to-b from-black to-[#241944]">
      {localStorage.getItem("memberId") &&
      localStorage.getItem("accessToken") ? (
        <Constellation></Constellation>
      ) : null}
      <div className="z-10">
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute
                  token={localStorage.getItem("accessToken")!}
                  nickname={localStorage.getItem("memberNickname")!}
                  redirectPath="/login"
                />
              }
            >
              <Route path="/room/:id" element={<Room />} />
              <Route path="/deco" element={<Deco />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/book" element={<Book />} />
              <Route path="/book/game/:name" element={<GameTest />} />
              <Route path="/book/story/:name" element={<Story />} />
              <Route path="/book/tuto" element={<GameTuto />} />
              <Route path="/telescope" element={<Telescope />} />
              <Route path="/telescope/tuto" element={<TelescopeTuto />} />
            </Route>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logined" element={<LoginCheck />} />
            <Route path="/a208" element={<A208 />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
