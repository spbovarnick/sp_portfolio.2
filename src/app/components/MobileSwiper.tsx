"use client"
import { ImageObject } from "../lib/types";
import {Swiper, SwiperSlide} from "swiper/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import 'swiper/css';

interface MobileSwiperProps extends ImageObject {
  project: string | null
}


const MobileSwiper = ({ photos, project }: MobileSwiperProps) => {

  console.log(photos)

  return (
    <div>
      <Swiper
        onSlideChange={() => console.log('slide change')}
        slidesPerView={1}
      >
        {photos.map((photo) => (
          <SwiperSlide key={photo.asset?._id}>
            <Image
              className="w-full"
              src={urlFor(photo)
                .width(500)
                .height(500)
                .url()
              }
              width={500}
              height={500}
              alt={`Photo of ${project}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default MobileSwiper;