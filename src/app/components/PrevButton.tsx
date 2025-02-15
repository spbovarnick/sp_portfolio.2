import { useSwiper } from "swiper/react"

const PrevButton = ({  }) => {
  const swiper = useSwiper();

  return (
    <>
      <button className="p-3 bg-red-50" onClick={() => swiper.slidePrev()}>decrementor</button>
    </>
  )
};

export default PrevButton;