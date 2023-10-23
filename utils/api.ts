import { MediaType } from "@/models/Media";
import { PostType } from "@/models/Post";
import { UserType } from "@/models/User";
import { Types } from "mongoose";

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
export async function getUser(idOrUsername: Types.ObjectId | string) {
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

// Get users
export async function getUsers(userIds: Types.ObjectId[]) {
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
export async function editUser(id: Types.ObjectId, values: Partial<UserType>) {
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

// Search for a user or users
export async function searchUsersByUsername(username: string) {
  if (!username) {
    throw new Error("Invalid or missing user identifier");
  }

  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error(
      "Please define the 'NEXT_PUBLIC_API_URL' environment variable inside .env"
    );
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/search?username=${username}`,
      { cache: "no-store" }
    );
    const data = await response.json();
    // console.log("getUser() api.ts data=", data, { username });
    return data.users;
  } catch (error) {
    console.log("searchUsersByUsername() api.ts", error);
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

// Edit post
export async function editPost(values: Partial<PostType>) {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error(
      "Please define the 'NEXT_PUBLIC_API_URL' environment variable inside .env"
    );
  }

  try {
    console.log({ insideAPI: { editPost: values } });
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${values._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ editPost: values }),
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("editPost() api.ts", error);
  }
}

// Edit post
export async function removeMediaFromPost(values: {
  postId: Types.ObjectId;
  media: any[];
}) {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error(
      "Please define the 'NEXT_PUBLIC_API_URL' environment variable inside .env"
    );
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${values.postId}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ removeMediaFromPost: values.media }),
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("removeMediaFromPost() api.ts", error);
  }
}

// Get post
export async function getPost(id: Types.ObjectId) {
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
  userId: Types.ObjectId;
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
export async function deletePost(postId: Types.ObjectId) {
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

//  Get post media
export async function getPostMedia(mediaId: Types.ObjectId) {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error(
      "Please define the 'NEXT_PUBLIC_API_URL' environment variable inside .env"
    );
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/media/${mediaId}`,
      { cache: "no-store" }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("getPostMedia() api.ts", error);
  }
}

// Add comment
export async function addComment(
  postId: Types.ObjectId,
  text: string,
  userId: Types.ObjectId,
  parentCommentId?: Types.ObjectId
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
export async function deleteComment(commentId: Types.ObjectId) {
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
  userId: Types.ObjectId;
  postId?: Types.ObjectId;
  commentId?: Types.ObjectId;
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
  postId: Types.ObjectId;
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
  postId: Types.ObjectId;
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
  followerId: Types.ObjectId;
  followedId: Types.ObjectId;
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

// Add chat message
type ChatMessage = {
  fromUserId: Types.ObjectId;
  toUserId: Types.ObjectId;
  text: string;
  seen: boolean;
};

export async function addChatMessage({
  fromUserId,
  toUserId,
  text,
  seen,
}: ChatMessage) {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error(
      "Please define the 'NEXT_PUBLIC_API_URL' environment variable inside .env"
    );
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/messages`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ fromUserId, toUserId, text, seen }),
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("addChatMessage() api.ts", error);
  }
}

// Get chat info
export async function getChatInfo(userId: Types.ObjectId) {
  if (!userId) {
    console.log({ userId });
    throw new Error("Invalid or missing user identifier");
  }

  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error(
      "Please define the 'NEXT_PUBLIC_API_URL' environment variable inside .env"
    );
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/chat/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userId),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("getChatInfo() api.ts", error);
  }
}
