import { useSwiper } from "swiper/react"

const NextButton = () => {
  const swiper = useSwiper();
  return (
    <>
      <button className="p-3 bg-red-50" onClick={() => swiper.slideNext()}>incrementor</button> <br />
    </>
  )
}

export default NextButton