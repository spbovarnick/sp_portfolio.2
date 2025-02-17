"use client"
import { AllImageArray } from "../lib/types";
import {Swiper, SwiperSlide} from "swiper/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import 'swiper/css';
// import NextButton from "./NextButton";
// import PrevButton from "./PrevButton";

interface MobileSwiperProps {
  project: string | null;
  allImages: AllImageArray[];
  next: () => void;
  prev: () => void;
}


const MobileSwiper = ({ allImages, project, next, prev, }: MobileSwiperProps,) => {

  return (
    <div>
      <Swiper
        onSlideNextTransitionStart={() => next()}
        onSlidePrevTransitionStart={() => prev()}
        slidesPerView={1}
        loop={true}
      >
      {/* <NextButton />
      <PrevButton /> */}
        {allImages?.map((photo) => (
          <SwiperSlide key={photo.asset?._id}>
            <Image
              className="w-full"
              src={urlFor(photo)
                .width(500)
                .height(500)
                .url()
              }
              loading="lazy"
              width={500}
              height={500}
              alt={`Photo of ${project}`}
              placeholder="blur"
              blurDataURL={urlFor(photo).blur(58).url()}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default MobileSwiper;