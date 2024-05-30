"use client";

import Button from "@/components/button";
import useLocalUser from "@/components/hooks/user/useUser";
import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function LandingHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const { user, isSignedIn, isLoaded } = useUser();
  const { isSuccess, data: localUser } = useLocalUser();

  const onDisplayAuthentication = (typeOfModal: "register" | "login") => {
    const newParams = new URLSearchParams(params.toString());
    newParams.append(
      typeOfModal === "register" ? "showSignup" : "showLogin",
      "true"
    );
    router.replace(`${pathname}?${newParams}`);
  };

  return (
    <header className="w-full py-4 px-5 border-b border-slate-100 flex flex-row justify-between items-center">
      <div></div>
      {!isSignedIn || !isLoaded ? (
        <div className="flex flex-row h-5 justify-start space-x-2 items-center">
          <Button
            type="button"
            className="h-7"
            variant={"link"}
            onClick={() => onDisplayAuthentication("login")}
          >
            Log In
          </Button>
          <Button
            type="button"
            className="h-7"
            onClick={() => onDisplayAuthentication("register")}
          >
            Sign Up
          </Button>
        </div>
      ) : (
        <div className="flex flex-row h-5 text-sm justify-start space-x-2 items-center">
          {isSuccess && !localUser.data
            ? user?.emailAddresses[0].emailAddress!
            : `@${localUser?.data.name}`}
        </div>
      )}
    </header>
  );
}
