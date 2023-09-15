import { Media } from "@/models/Media";
import { Post } from "@/models/Post";
import { User } from "@/models/User";

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

export async function editUser(idOrUsername: string, values: Partial<User>) {
  if (!idOrUsername) {
    throw new Error("Invalid or missing user identifier");
  }

  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error(
      "Please define the 'NEXT_PUBLIC_API_URL' environment variable inside .env"
    );
  }

  console.log(values);

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

export async function addPost(values: Post) {
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
