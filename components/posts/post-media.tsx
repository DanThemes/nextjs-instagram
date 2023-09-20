"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { PostType } from "@/models/Post";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

type PostMediaProps = {
  post: Partial<PostType>;
};

export default function PostMedia({ post }: PostMediaProps) {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '"></span>';
    },
  };

  console.log("post-media.tsx", post);

  return (
    <Swiper
      pagination={pagination}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="h-full"
    >
      {post.media?.map((item) => (
        <SwiperSlide key={item.url}>
          <Image
            src={item.url}
            alt={post.caption}
            fill
            className="w-full h-auto object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
