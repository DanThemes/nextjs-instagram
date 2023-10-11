import { MediaType } from "@/models/Media";
import { PostType } from "@/models/Post";
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
    // console.log("getUser() api.ts data=", data, { idOrUsername });
    return data.user;
  } catch (error) {
    console.log("getUser() api.ts", error);
  }
}

// Get user
export async function getUsers(userIds: string[]) {
  if (!userIds) {
    throw new Error("Invalid or missing user identifier");
  }

  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error(
      "Please define the 'NEXT_PUBLIC_API_URL' environment variable inside .env"
    );
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userIds),
    });
    const data = await response.json();
    return data.user;
  } catch (error) {
    console.log("getUsers() api.ts", error);
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
  onlyPostsOfFollowedUsers = false,
}: {
  userId: string;
  onlyPostsOfFollowedUsers: boolean;
}) {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error(
      "Please define the 'NEXT_PUBLIC_API_URL' environment variable inside .env"
    );
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts?userId=${userId}&onlyPostsOfFollowedUsers=${onlyPostsOfFollowedUsers}`,
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

// Delete post
export async function deletePost(postId: string) {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error(
      "Please define the 'NEXT_PUBLIC_API_URL' environment variable inside .env"
    );
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("deletePost() api.ts", error);
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
export async function addComment(
  postId: string,
  text: string,
  userId: string,
  parentCommentId?: string
) {
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
        body: JSON.stringify({ postId, text, userId, parentCommentId }),
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
export async function deleteComment(commentId: string) {
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

// hide/show like count
export async function handleHideLikes({
  postId,
  hide,
}: {
  postId: string;
  hide: boolean;
}) {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error(
      "Please define the 'NEXT_PUBLIC_API_URL' environment variable inside .env"
    );
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ hideLikes: hide }),
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("disableComments() api.ts", error);
  }
}

// enable/disable post comments
export async function disableComments({
  postId,
  disable,
}: {
  postId: string;
  disable: boolean;
}) {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error(
      "Please define the 'NEXT_PUBLIC_API_URL' environment variable inside .env"
    );
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ commentsDisabled: disable }),
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("disableComments() api.ts", error);
  }
}

// follow a user
export async function followUser({
  followerId,
  followedId,
}: {
  followerId: string;
  followedId: string;
}) {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error(
      "Please define the 'NEXT_PUBLIC_API_URL' environment variable inside .env"
    );
  }

  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${followerId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ following: followedId }),
    });

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${followedId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ followers: followerId }),
    });
  } catch (error) {
    console.log("followUser() api.ts", error);
  }
}
