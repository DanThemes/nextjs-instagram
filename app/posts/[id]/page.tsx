import PostModal from "@/components/modals/post-modal";
import PageNotFound from "@/components/page-not-found";
import Post from "@/components/posts/post";
import { getPost } from "@/utils/api";
import React from "react";

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  if (!post) {
    return <PageNotFound />;
  }

  return (
    <>
      <Post post={post} />
      <PostModal />
    </>
  );
}
