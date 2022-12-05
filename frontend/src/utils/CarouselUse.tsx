import { Carousel } from "flowbite-react"

export default function CarouselUse({ name }: { name: string }) {
  console.log(name)
  return (
    <Carousel slide={true}>
      <img src={`/assets/main/${name}1.png`} alt="..." />
      <img src={`/assets/main/${name}2.png`} alt="..." />
      <img src={`/assets/main/${name}3.png`} alt="..." />
    </Carousel>
  )
}
