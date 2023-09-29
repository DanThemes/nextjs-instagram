import Comment from "@/models/Comment";
import { MediaType } from "@/models/Media";
import Post, { PostType } from "@/models/Post";
import { UserType } from "@/models/User";

// Add user
export async function addUser(values: Partial<UserType>) {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error(
      "Please define the 'NEXT_PUBLIC_API_URL' environment variable inside .env"
    );
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("addUser() api.ts", error);
  }
}

// Get user
export async function getUser(idOrUsername: string) {
  if (!idOrUsername) {
    throw new Error("Invalid or missing user identifier");
  }

  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error(
      "Please define the 'NEXT_PUBLIC_API_URL' environment variable inside .env"
    );
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${idOrUsername}`,
      { cache: "no-store" }
    );
    const data = await response.json();
    return data.user;
  } catch (error) {
    console.log("getUser() api.ts", error);
  }
}

// Edit user
export async function editUser(id: string, values: Partial<UserType>) {
  if (!id) {
    throw new Error("Invalid or missing user identifier");
  }

  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error(
      "Please define the 'NEXT_PUBLIC_API_URL' environment variable inside .env"
    );
  }

  console.log({ id, values });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );
    const data = await response.json();
    return data.user;
  } catch (error) {
    console.log("editUser() api.ts", error);
  }
}

// Add post
export async function addPost(values: PostType) {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error(
      "Please define the 'NEXT_PUBLIC_API_URL' environment variable inside .env"
    );
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("addPost() api.ts", error);
  }
}

// Get post
export async function getPost(id: string) {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error(
      "Please define the 'NEXT_PUBLIC_API_URL' environment variable inside .env"
    );
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`,
      {
        cache: "no-store",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("getPost() api.ts", error);
  }
}

// Get posts
export async function getPosts({
  userId,
  onlyFollowingUsersPosts = false,
}: {
  userId: string;
  onlyFollowingUsersPosts: boolean;
}) {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error(
      "Please define the 'NEXT_PUBLIC_API_URL' environment variable inside .env"
    );
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts?userId=${userId}&onlyFollowingUsersPosts=${onlyFollowingUsersPosts}`,
      {
        cache: "no-store",
      }
    );
    const data = await response.json();
    // console.log("getPosts", data);
    return data;
  } catch (error) {
    console.log("getPosts() api.ts", error);
  }
}

//  Add post media
export async function addPostMedia(values: MediaType) {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error(
      "Please define the 'NEXT_PUBLIC_API_URL' environment variable inside .env"
    );
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/media`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("addPostMedia() api.ts", error);
  }
}

// Add comment
export async function addComment(postId: string, text: string, userId: string) {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error(
      "Please define the 'NEXT_PUBLIC_API_URL' environment variable inside .env"
    );
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/comments`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ postId, text, userId }),
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("addComment() api.ts", error);
  }
}

// Delete comment
export async function deleteComment({
  userId,
  commentId,
}: {
  userId: string;
  commentId: string;
}) {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error(
      "Please define the 'NEXT_PUBLIC_API_URL' environment variable inside .env"
    );
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/comments/${commentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ userId }),
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("deleteComment() api.ts", error);
  }
}

// toggle post/comment like
export async function toggleLike({
  userId,
  postId,
  commentId,
}: {
  userId: string;
  postId?: string;
  commentId?: string;
}) {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error(
      "Please define the 'NEXT_PUBLIC_API_URL' environment variable inside .env"
    );
  }

  try {
    const path = postId ? "posts" : "comments";
    const id = postId ? postId : commentId;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${path}/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ userId }),
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("toggleLike() api.ts", error);
  }
}
