import Modal from "@/components/modal";
import PageNotFound from "@/components/page-not-found";
import Post from "@/components/posts/post";
import { getPost } from "@/utils/api";
import React from "react";

export default async function Page({ params }: any) {
  const post = await getPost(params.id);

  if (!post) {
    return <PageNotFound />;
  }

  return (
    <>
      <Modal>
        <Post post={post} />
      </Modal>
    </>
  );
}
