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
    `${process.env.NEXT_PUBLIC_API_URL}/users/${idOrUsername}`
  );
  const data = await response.json();
  return data.user;
}
