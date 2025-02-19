"use client"
import { AllImageArray } from "../lib/types";
import { Swiper, SwiperSlide,} from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import 'swiper/css';
import { MouseEvent, useRef } from "react";

interface MobileSwiperProps {
  project: string | null;
  allImages: AllImageArray[];
  next: () => void;
  prev: () => void;
}


const MobileSwiper = ({ allImages, project, next, prev, }: MobileSwiperProps,) => {
  const swiperRef = useRef<SwiperType | null>(null)

  const handleSwiperNav = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (window.innerWidth < 768) { return }
    const breakPoint = e.currentTarget.offsetWidth / 2;
    const clickPoint = e.nativeEvent.offsetX;

    if (clickPoint < breakPoint) {
      if (swiperRef.current) {swiperRef?.current.slidePrev();};
    } else {
      if (swiperRef.current) {swiperRef.current.slideNext();};
    }
  }

  return (
    <Swiper
      id="initialized"
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      onSlideNextTransitionStart={() => next()}
      onSlidePrevTransitionStart={() => prev()}
      slidesPerView={1}
      loop={true}
      className="w-full h-full md:h-screen"
    >
      <button className="w-full h-full bg-red-400" onClick={(e) => handleSwiperNav(e)}>SHIT PISS</button>
      {allImages?.map((photo) => (
        <SwiperSlide key={photo.asset?._id}>
          <Image
            className="w-full"
            src={urlFor(photo)
              // .width(500)
              // .height(500)
              .url()
            }
            loading="lazy"
            width={500}
            height={500}
            alt={`Photo of ${project}`}
            placeholder="blur"
            blurDataURL={photo.asset?.metadata?.lqip}
            onClick={e => handleSwiperNav(e)}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default MobileSwiper;