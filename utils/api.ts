import { Media } from "@/models/Media";
import { PostType } from "@/models/Post";
import { User } from "@/models/User";

// Add user
export async function addUser(values: Partial<User>) {
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
export async function editUser(idOrUsername: string, values: Partial<User>) {
  if (!idOrUsername) {
    throw new Error("Invalid or missing user identifier");
  }

  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error(
      "Please define the 'NEXT_PUBLIC_API_URL' environment variable inside .env"
    );
  }

  console.log({ idOrUsername, values });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${idOrUsername}`,
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
    return data;
  } catch (error) {
    console.log("getPosts() api.ts", error);
  }
}

//  Add post media
export async function addPostMedia(values: Media) {
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
