import { atom } from "recoil"

const memberAtom = atom({
  key: "memberAtom",
  default: {
    memberId: "",
    memberNickname: "",
  },
})

export default memberAtom
