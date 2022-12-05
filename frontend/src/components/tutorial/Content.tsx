import { Carousel } from "flowbite-react"

export default function Content() {
  return (
    <div className="w-full h-full">
      <Carousel slide={false}>
        <img src="/assets/main/content1.png" alt="..." />
        <img src="/assets/main/content2.png" alt="..." />
        <img src="/assets/main/content3.png" alt="..." />
        <img src="/assets/main/content4.png" alt="..." />
      </Carousel>
    </div>
  )
}
