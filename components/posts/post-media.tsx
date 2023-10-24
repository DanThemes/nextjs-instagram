"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { PopulatedPostType, PostType } from "@/models/Post";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { MediaType } from "@/models/Media";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toggleLike } from "@/utils/api";
import { GoHeartFill } from "react-icons/go";
import { motion } from "framer-motion";

type PostMediaProps = {
  post: Partial<PopulatedPostType>;
};

export default function PostMedia({ post }: PostMediaProps) {
  const pagination = {
    clickable: true,
    renderBullet: function (index: any, className: any) {
      return '<span class="' + className + '"></span>';
    },
  };

  const [isLikeToggling, setIsLikeToggling] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();

  const handleToggleLike = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    console.log("click");
    // Detect only double clicks
    if (e.detail !== 2) return;
    if (!session) return;

    setIsLikeToggling(true);
    await toggleLike({
      userId: session.user.id,
      postId: post._id!.toString(),
    });

    setIsLikeToggling(false);
    router.refresh();
  };

  return (
    <Swiper
      pagination={pagination}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="h-full"
    >
      {post.media?.map((item) => (
        <SwiperSlide key={item.url} onClick={(e) => handleToggleLike(e)}>
          {item.type === "image" && (
            <>
              <Image
                src={item.url}
                alt={post.caption || "post"}
                fill
                className="w-full h-full object-cover"
              />
              {isLikeToggling && (
                <>
                  {/* <motion.div
                  className="absolute inset-0 flex items-center justify-center text-[3rem] text-red-700"
                  animate={{ scale: 1.5 }}
                > */}
                  <div className="absolute inset-0 flex items-center justify-center text-[3rem] text-red-700">
                    <GoHeartFill />
                  </div>
                  {/* </motion.div> */}
                </>
              )}
            </>
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
