import { useSession } from "next-auth/react";

export function useSessionWithUsername() {
  const {data: session } = useSession();
  const username = session?.user?.username || null
}