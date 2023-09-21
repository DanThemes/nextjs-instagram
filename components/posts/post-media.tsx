"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { PostType } from "@/models/Post";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { MediaType } from "@/models/Media";

type PostMediaProps = {
  post: Omit<Partial<PostType>, "media"> & { media: MediaType[] };
};

export default function PostMedia({ post }: PostMediaProps) {
  const pagination = {
    clickable: true,
    renderBullet: function (index: any, className: any) {
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
          {item.type === "image" && (
            <Image
              src={item.url}
              alt={post.caption || "post"}
              fill
              className="w-full h-full object-cover"
            />
          )}
          {item.type === "video" && (
            <video
              src={item.url}
              controls
              className="w-full h-full object-cover"
            />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
