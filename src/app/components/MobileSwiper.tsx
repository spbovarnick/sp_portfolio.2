"use client"
import { AllImageArray } from "../lib/types";
import {Swiper, SwiperSlide} from "swiper/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import 'swiper/css';

interface MobileSwiperProps {
  project: string | null;
  allImages: AllImageArray[];
  next: () => void;
  prev: () => void;
}


const MobileSwiper = ({ allImages, project, next, prev, }: MobileSwiperProps,) => {

  return (
    <Swiper
      onSlideNextTransitionStart={() => next()}
      onSlidePrevTransitionStart={() => prev()}
      slidesPerView={1}
      loop={true}
      className="w-full h-full md:h-screen"
    >
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
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default MobileSwiper;