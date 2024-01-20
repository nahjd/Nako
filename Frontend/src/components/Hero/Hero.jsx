import React from 'react'
import "./Hero.scss"
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
const Hero = () => {
    return (

        <Swiper

            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
        >
            <SwiperSlide>  <div>
                <div className="home">
                    <div className="text">
                        <h1>Nahid</h1>
                        <span>Salam</span>
                    </div>
                </div>

            </div></SwiperSlide>
            <SwiperSlide>  <div>
                <div className="home home1">
                    <div className="text">
                        <h1>Zahid</h1>
                        <span>Sagol</span>
                    </div>
                </div>

            </div></SwiperSlide>
            <SwiperSlide>  <div>
                <div className="home home2">
                    <div className="text">
                        <h1>Solmaz</h1>
                        <span>HAHA</span>
                    </div>
                </div>

            </div></SwiperSlide>

            ...
        </Swiper>
    )
}

export default Hero