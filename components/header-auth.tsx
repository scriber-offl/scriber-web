import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { UserDropdown } from "./auth/user-dropdown";
import { SignInModal } from "./auth/sign-in-modal";

export async function HeaderAuth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return <UserDropdown session={session} />;
  }
  return <SignInModal />;
}
