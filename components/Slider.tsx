'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { BannerImage } from "@/types/typescript.types";

const Slider = ({ bannerImageList }: { bannerImageList: BannerImage[] }) => {
    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 1500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper h-60 sm:h-96"
        >
            {bannerImageList.map((bannerImage, index) => (
                <SwiperSlide key={index}>
                    <img
                        className="object-cover w-full h-full"
                        src={bannerImage.bannerUrl}
                        alt={`image slide ${index + 1}`}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Slider;
