import Image from "next/image";
import React from "react";

const posts = [
  {
    id: 0,
    images: ["/placeholder.jpeg"],
    content: "test content",
  },
];

const Posts = () => {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <div>
            <div className="relative w-full h-[40dvh] border border-[#dbdbdb]">
              <Image
                src={post.images[0]}
                alt={post.content}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <strong>author</strong> {post.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
