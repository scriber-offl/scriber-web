import { Suspense } from "react";
import { HeaderClient } from "./header-client";
import { HeaderAuth } from "./header-auth";
import { AuthLoading } from "./auth/auth-loading";

export function Header() {
  return (
    <HeaderClient>
      <Suspense fallback={<AuthLoading />}>
        <HeaderAuth />
      </Suspense>
    </HeaderClient>
  );
}
