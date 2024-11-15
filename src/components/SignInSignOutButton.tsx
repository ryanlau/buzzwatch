"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

function SignOutButton() {
  const router = useRouter();

  return (
    <button
      className="rounded-md bg-gray-200 px-2 text-xl font-normal"
      onClick={() => {
        authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.refresh();
            },
          },
        });
        router.refresh();
      }}
    >
      sign out
    </button>
  );
}

function SignInWithGoogleButton() {
  async function signUp() {
    await authClient.signIn.social({
      provider: "google",
    });
  }

  return (
    <button
      className="rounded-md bg-gray-200 px-2 text-xl font-normal"
      onClick={signUp}
    >
      sign in with google
    </button>
  );
}

export { SignOutButton, SignInWithGoogleButton };
