import { User } from "@/models/User";

export async function getUser(idOrUsername: string) {
  if (!idOrUsername) {
    throw new Error("Invalid or missing user parameters");
  }

  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error(
      "Please define the 'API_URL' environment variable inside .env"
    );
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${idOrUsername}`,
    { cache: "no-store" }
  );
  const data = await response.json();
  return data.user;
}

export async function editUser(idOrUsername: string, values: Partial<User>) {
  if (!idOrUsername) {
    throw new Error("Invalid or missing user parameters");
  }

  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error(
      "Please define the 'API_URL' environment variable inside .env"
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


