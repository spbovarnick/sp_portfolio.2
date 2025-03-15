"use client"
import { AllImageArray } from "../lib/types";
import { Swiper, SwiperSlide,} from "swiper/react";
import { Keyboard } from "swiper/modules";
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

  // Click to swipe function that preserves native Swipe UI
  // const handleSwiperNav = (e: MouseEvent<HTMLElement>) => {
  //   e.preventDefault();

  //   if (window.innerWidth < 768) { return }
  //   const breakPoint = e.currentTarget.offsetWidth / 2;
  //   const clickPoint = e.nativeEvent.offsetX;

  //   if (clickPoint < breakPoint) {
  //     if (swiperRef.current) {swiperRef?.current.slidePrev();};
  //   } else {
  //     if (swiperRef.current) {swiperRef.current.slideNext();};
  //   }
  // }

  // click handler that disables native Swiper UI
  const handleNavClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (window.innerWidth < 768) {return};
    const id = e.currentTarget.id;

    if (id === 'left') {
      swiperRef.current?.slidePrev();
    }
    if (id === 'right') {
      swiperRef.current?.slideNext();
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
      keyboard={{
        enabled: true,
      }}
      modules={[Keyboard]}
      className="w-full h-[45vh] md:h-screen"
    >
      {/* Two divs that overlay .swiper-slide, disabling native Swiper UI, allowing for easier cursor styling */}
      <div
        id="left"
        className="w-1/2 h-full absolute top-0 left-0 z-50 hidden md:block"
        onClick={e => handleNavClick(e)}
      ></div>
      <div
        id='right'
        className=" w-1/2 h-full absolute top-0 right-0 z-50 hidden md:block"
        onClick={e => handleNavClick(e)}
      ></div>
      {allImages?.map((photo) => (
        <SwiperSlide key={photo.asset?._id}>
          <Image
            src={urlFor(photo)
              .width(1000)
              .dpr(2)
              .quality(100)
              .url()
            }
            placeholder="blur"
            // loading="lazy"
            objectFit="cover"
            fill={true}
            sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw"
            alt={`Photo of ${project}`}
            blurDataURL={photo.asset?.metadata?.lqip}
            // synthetic click event handler that maintains native Swiper UI
            // onClick={e => handleSwiperNav(e)}
            quality={100}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default MobileSwiper;